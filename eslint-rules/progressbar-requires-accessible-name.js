function getJsxElementName(node) {
  if (!node) {
    return null
  }

  if (node.type === 'JSXIdentifier') {
    return node.name
  }

  if (node.type === 'JSXMemberExpression') {
    return node.property?.name ?? null
  }

  return null
}

function getAttribute(openingElement, attributeName) {
  for (const attribute of openingElement.attributes) {
    if (attribute.type !== 'JSXAttribute') {
      continue
    }

    if (attribute.name?.name === attributeName) {
      return attribute
    }
  }

  return null
}

function hasNonEmptyAttributeValue(attribute) {
  if (!attribute?.value) {
    return false
  }

  const { value } = attribute

  if (value.type === 'Literal') {
    return typeof value.value === 'string' ? value.value.trim().length > 0 : Boolean(value.value)
  }

  if (value.type !== 'JSXExpressionContainer') {
    return false
  }

  const expression = value.expression

  if (expression.type === 'Literal') {
    return typeof expression.value === 'string'
      ? expression.value.trim().length > 0
      : Boolean(expression.value)
  }

  if (
    expression.type === 'TemplateLiteral' &&
    expression.expressions.length === 0 &&
    expression.quasis.length === 1
  ) {
    return expression.quasis[0].value.cooked?.trim().length > 0
  }

  return true
}

function hasAccessibleName(openingElement) {
  const ariaLabel = getAttribute(openingElement, 'aria-label')
  const ariaLabelledBy = getAttribute(openingElement, 'aria-labelledby')
  const title = getAttribute(openingElement, 'title')

  return (
    hasNonEmptyAttributeValue(ariaLabel) ||
    hasNonEmptyAttributeValue(ariaLabelledBy) ||
    hasNonEmptyAttributeValue(title)
  )
}

function getStaticAttributeText(attribute) {
  if (!attribute?.value) {
    return null
  }

  const { value } = attribute

  if (value.type === 'Literal') {
    return typeof value.value === 'string' ? value.value : null
  }

  if (value.type !== 'JSXExpressionContainer') {
    return null
  }

  const expression = value.expression

  if (expression.type === 'Literal') {
    return typeof expression.value === 'string' ? expression.value : null
  }

  if (
    expression.type === 'TemplateLiteral' &&
    expression.expressions.length === 0 &&
    expression.quasis.length === 1
  ) {
    return expression.quasis[0].value.cooked ?? null
  }

  return null
}

function isStatusLiveRegion(openingElement) {
  const roleAttribute = getAttribute(openingElement, 'role')
  const ariaLiveAttribute = getAttribute(openingElement, 'aria-live')

  if (!hasNonEmptyAttributeValue(ariaLiveAttribute)) {
    return false
  }

  const roleValue = getStaticAttributeText(roleAttribute)

  return typeof roleValue === 'string' && roleValue.trim().toLowerCase() === 'status'
}

function jsxElementHasLiveRegion(node) {
  if (!node || node.type !== 'JSXElement') {
    return false
  }

  if (isStatusLiveRegion(node.openingElement)) {
    return true
  }

  for (const child of node.children) {
    if (child.type === 'JSXElement' && jsxElementHasLiveRegion(child)) {
      return true
    }
  }

  return false
}

function getContainingJsxElement(node) {
  let current = node?.parent ?? null
  let skippedOwnElement = false

  while (current) {
    if (current.type === 'JSXElement') {
      if (!skippedOwnElement) {
        skippedOwnElement = true
      } else {
        return current
      }
    }

    current = current.parent
  }

  return null
}

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require accessible naming and live update semantics for Fluent ProgressBar components.',
    },
    schema: [],
    messages: {
      missingAccessibleName:
        'ProgressBar requires an accessible name. Add aria-label, aria-labelledby, or title with a non-empty value.',
      missingValueText:
        'ProgressBar requires aria-valuetext so screen readers can announce a meaningful current value.',
      missingLiveRegion:
        'ProgressBar requires a nearby live region with role="status" and aria-live to announce value changes.',
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const elementName = getJsxElementName(node.name)

        if (elementName !== 'ProgressBar') {
          return
        }

        if (!hasAccessibleName(node)) {
          context.report({
            node,
            messageId: 'missingAccessibleName',
          })
        }

        const ariaValueText = getAttribute(node, 'aria-valuetext')

        if (!hasNonEmptyAttributeValue(ariaValueText)) {
          context.report({
            node,
            messageId: 'missingValueText',
          })
        }

        const containingJsxElement = getContainingJsxElement(node)

        if (!jsxElementHasLiveRegion(containingJsxElement)) {
          context.report({
            node,
            messageId: 'missingLiveRegion',
          })
        }
      },
    }
  },
}
