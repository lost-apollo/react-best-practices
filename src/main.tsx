import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { BrowserRouter } from 'react-router-dom'
import './app/theme.scss'
import './app/styles.scss'
import './features/custom-lint-examples/styles/fluent-showcase.scss'
import './features/items/styles/items.scss'
import './features/practices/styles/practices.scss'
import { App } from './app/App'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <FluentProvider theme={webLightTheme} style={{ backgroundColor: 'transparent' }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FluentProvider>
    </StrictMode>,
  )
}
