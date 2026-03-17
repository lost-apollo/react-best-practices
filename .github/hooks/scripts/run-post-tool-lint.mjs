#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const MUTATING_TOOLS = new Set([
  'apply_patch',
  'create_file',
  'edit_notebook_file',
  'vscode_renameSymbol',
  'vscode_renameFile',
])

function readStdin() {
  try {
    return readFileSync(0, 'utf8')
  } catch {
    return ''
  }
}

function parsePayload(raw) {
  if (!raw || !raw.trim()) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function findToolName(payload) {
  if (!payload || typeof payload !== 'object') {
    return ''
  }

  return (
    payload.tool_name ||
    payload.toolName ||
    payload.tool?.name ||
    payload.hookSpecificInput?.toolName ||
    ''
  )
}

function shouldRunLint(toolName) {
  return MUTATING_TOOLS.has(toolName)
}

function normalizePathLike(value) {
  if (!value || typeof value !== 'string') {
    return ''
  }

  return value.replace(/\\/g, '/').toLowerCase()
}

function pathIsUnderSrc(pathLike) {
  const normalized = normalizePathLike(pathLike)

  return (
    normalized.startsWith('src/') || normalized.includes('/src/') || normalized.includes(':/src/')
  )
}

function collectPaths(value, paths) {
  if (value == null) {
    return
  }

  if (typeof value === 'string') {
    const filePathMatch = value.match(/^[A-Za-z]:\\|^\/|^src[\\/]/)
    if (filePathMatch) {
      paths.push(value)
    }

    const patchPathRegex = /^\*\*\* (?:Add|Update|Delete) File: (.+)$/gm
    let match
    while ((match = patchPathRegex.exec(value)) !== null) {
      if (match[1]) {
        paths.push(match[1].trim())
      }
    }

    return
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectPaths(item, paths)
    }
    return
  }

  if (typeof value === 'object') {
    for (const [key, nestedValue] of Object.entries(value)) {
      if (key === 'filePath' || key === 'path' || key === 'uri') {
        if (typeof nestedValue === 'string') {
          paths.push(nestedValue)
        }
      }
      collectPaths(nestedValue, paths)
    }
  }
}

function payloadTouchesSrc(payload) {
  const candidatePaths = []
  collectPaths(payload, candidatePaths)
  return candidatePaths.some(pathIsUnderSrc)
}

function runCommand(command) {
  const result = spawnSync(command, {
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: process.env,
  })

  if (result.stdout?.length) {
    process.stderr.write(result.stdout)
  }

  if (result.stderr?.length) {
    process.stderr.write(result.stderr)
  }

  return result.status ?? 1
}

function emitMessage(message) {
  process.stdout.write(`${JSON.stringify({ continue: true, systemMessage: message })}\n`)
}

function main() {
  const payload = parsePayload(readStdin())
  const toolName = findToolName(payload)

  if (!shouldRunLint(toolName)) {
    emitMessage(`Skipped lint hooks after ${toolName}.`)
    return
  }

  if (!payloadTouchesSrc(payload)) {
    emitMessage('Skipped lint hooks because no changes under src were detected.')
    return
  }

  const root = resolve(process.cwd())
  const packageJsonPath = resolve(root, 'package.json')

  if (!existsSync(packageJsonPath)) {
    emitMessage('Skipped lint hooks because package.json was not found.')
    return
  }

  const lintStatus = runCommand('npm run lint --silent')
  const stylelintStatus = runCommand('npm run lint:styles --silent')

  if (lintStatus === 0 && stylelintStatus === 0) {
    emitMessage('Lint checks passed after tool execution.')
    return
  }

  emitMessage(
    'Lint checks reported issues. Continuing without blocking so you can address them in the next step.',
  )
}

main()
