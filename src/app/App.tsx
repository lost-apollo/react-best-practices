import type { NavLinkRenderProps } from 'react-router-dom'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { ItemsCrudPage } from '../features/items/ui/ItemsCrudPage'
import { DocumentsPage } from '../features/practices/ui/DocumentsPage'
import { FluentComponentsShowcase } from '../features/custom-lint-examples/ui/FluentComponentsShowcase'

function getNavLinkClassName({ isActive }: NavLinkRenderProps) {
  return isActive ? 'app-shell-nav-link app-shell-nav-link-active' : 'app-shell-nav-link'
}

export function App() {
  return (
    <main className="app-shell">
      <header className="app-shell-hero">
        <p className="app-shell-kicker">React + Vite + TypeScript + Fluent UI</p>
        <h1 className="app-shell-title">Best Practices CRUD Scaffold</h1>
        <p className="app-shell-subtitle">
          Complete client-side CRUD with feature-first architecture, accessibility-first UI, and
          performance-aware React patterns.
        </p>
      </header>

      <nav className="app-shell-nav" aria-label="Primary">
        <NavLink to="/" end className={getNavLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/documents" className={getNavLinkClassName}>
          Documents
        </NavLink>
        <NavLink to="/fluent-examples" className={getNavLinkClassName}>
          Fluent Examples
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<ItemsCrudPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/fluent-examples" element={<FluentComponentsShowcase />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  )
}
