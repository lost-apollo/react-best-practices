function isJsxLike(node) {
  return node?.type === 'JSXElement' || node?.type === 'JSXFragment'
}

function hasShortCircuitLogical(node) {
  if (!node) {
    return false
  }

  if (node.type === 'LogicalExpression') {
    return (
      node.operator === '&&' ||
      node.operator === '||' ||
      hasShortCircuitLogical(node.left) ||
      hasShortCircuitLogical(node.right)
    )
  }

  if (node.type === 'UnaryExpression') {
    return hasShortCircuitLogical(node.argument)
  }

  if (node.type === 'BinaryExpression') {
    return hasShortCircuitLogical(node.left) || hasShortCircuitLogical(node.right)
  }

  if (node.type === 'CallExpression') {
    return (
      hasShortCircuitLogical(node.callee) ||
      node.arguments.some((argument) => hasShortCircuitLogical(argument))
    )
  }

  if (node.type === 'MemberExpression') {
    return hasShortCircuitLogical(node.object) || hasShortCircuitLogical(node.property)
  }

  if (node.type === 'ChainExpression') {
    return hasShortCircuitLogical(node.expression)
  }

  if (node.type === 'ConditionalExpression') {
    return hasShortCircuitLogical(node.test)
  }

  return false
}

function inspectJsxNode(node, report) {
  if (!node) {
    return
  }

  if (node.type === 'JSXExpressionContainer') {
    const expression = node.expression

    if (
      expression?.type === 'LogicalExpression' &&
      (expression.operator === '&&' || expression.operator === '||')
    ) {
      if (isJsxLike(expression.left) || isJsxLike(expression.right)) {
        report(expression)
      }
    }

    if (expression?.type === 'ConditionalExpression' && hasShortCircuitLogical(expression.test)) {
      if (isJsxLike(expression.consequent) || isJsxLike(expression.alternate)) {
        report(expression.test)
      }
    }
  }

  if (node.type === 'JSXElement' || node.type === 'JSXFragment') {
    for (const child of node.children) {
      inspectJsxNode(child, report)
    }
  }
}

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require explicit render branches instead of short-circuit condition chains in JSX rendering paths.',
    },
    schema: [],
    messages: {
      avoidShortCircuit:
        'Use explicit render branches instead of short-circuit render condition chains.',
    },
  },
  create(context) {
    function report(node) {
      context.report({
        node,
        messageId: 'avoidShortCircuit',
      })
    }

    return {
      ReturnStatement(node) {
        const argument = node.argument

        if (!argument) {
          return
        }

        if (argument.type === 'ConditionalExpression') {
          if (
            (isJsxLike(argument.consequent) || isJsxLike(argument.alternate)) &&
            hasShortCircuitLogical(argument.test)
          ) {
            report(argument.test)
          }

          return
        }

        if (
          argument.type === 'LogicalExpression' &&
          (argument.operator === '&&' || argument.operator === '||')
        ) {
          if (isJsxLike(argument.left) || isJsxLike(argument.right)) {
            report(argument)
          }

          return
        }

        if (isJsxLike(argument)) {
          inspectJsxNode(argument, report)
        }
      },
    }
  },
}
