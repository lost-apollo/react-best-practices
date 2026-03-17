const DISALLOWED_NATIVE_CONTROLS = {
  button: 'Button',
  input: 'Input, Checkbox, Radio, or Switch (inside Field when labeling is needed)',
  select: 'Select, Combobox, or Dropdown',
  textarea: 'Textarea',
  progress: 'ProgressBar',
  meter: 'ProgressBar',
  dialog: 'Dialog',
  table: 'Table',
  thead: 'TableHeader',
  tbody: 'TableBody',
  tfoot: 'TableBody',
  tr: 'TableRow',
  td: 'TableCell',
  th: 'TableHeaderCell',
  label: 'Field with label, or Label tied to Fluent form controls',
}

function getJsxIdentifierName(nameNode) {
  if (!nameNode) {
    return null
  }

  if (nameNode.type === 'JSXIdentifier') {
    return nameNode.name
  }

  return null
}

function isLowerCaseHtmlTag(tagName) {
  return tagName.toLowerCase() === tagName
}

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer Fluent UI primitives over native control elements for consistency, accessibility, and theming.',
    },
    schema: [],
    messages: {
      preferFluentPrimitive:
        'Prefer Fluent UI primitives. Replace native <{{tag}}> with {{fluentAlternative}}.',
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const tagName = getJsxIdentifierName(node.name)

        if (!tagName || !isLowerCaseHtmlTag(tagName)) {
          return
        }

        const fluentAlternative = DISALLOWED_NATIVE_CONTROLS[tagName]

        if (!fluentAlternative) {
          return
        }

        context.report({
          node,
          messageId: 'preferFluentPrimitive',
          data: {
            tag: tagName,
            fluentAlternative,
          },
        })
      },
    }
  },
}
