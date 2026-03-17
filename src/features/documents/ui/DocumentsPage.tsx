import { practiceExamples } from '../model/practice-examples'
import { categoryMetaList, type CategorySection } from '../model/category-sections'
import { PracticeCard } from './PracticeCard'
import type { PracticeCategory } from '../../../shared/types/practice-example'

function toSectionId(category: string) {
  return `docs-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

function buildCategorySections(): CategorySection[] {
  const examplesByCategory = new Map<PracticeCategory, typeof practiceExamples>()

  for (const example of practiceExamples) {
    const existingExamples = examplesByCategory.get(example.category)

    if (existingExamples) {
      existingExamples.push(example)
      continue
    }

    examplesByCategory.set(example.category, [example])
  }

  return categoryMetaList
    .filter((meta) => examplesByCategory.has(meta.category))
    .map((meta) => ({
      category: meta.category,
      categoryPriority: meta.priority,
      summary: meta.summary,
      sectionId: toSectionId(meta.category),
      examples: examplesByCategory.get(meta.category) ?? [],
    }))
}

const categorySections = buildCategorySections()

export function DocumentsPage() {
  return (
    <section className="documents-page" aria-labelledby="documents-title">
      <header className="documents-page-header">
        <h2 id="documents-title">Best Practices Documents</h2>
        <p>
          Wiki-style guidance for this Vite SPA: accessibility-first, predictable performance, and
          clear feature ownership.
        </p>

        <ul className="documents-page-priority-model" aria-label="Priority model">
          <li>1. Eliminating waterfalls (Critical)</li>
          <li>2. Bundle size optimization (Critical)</li>
          <li>3. Client-side data fetching (High)</li>
          <li>4. Re-render optimization (Medium)</li>
          <li>5. Rendering performance (Medium)</li>
          <li>6. JavaScript performance (Low-Medium)</li>
          <li>7. Advanced patterns (Low)</li>
        </ul>
      </header>

      <div className="documents-page-layout">
        <nav className="documents-page-nav" aria-label="Best practices topics">
          <h3>Topics</h3>
          <ul>
            {categorySections.map((section) => (
              <li key={section.sectionId}>
                <a href={`#${section.sectionId}`}>
                  {section.category}
                  <span>{section.examples.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="documents-page-content" aria-label="Best practices content">
          {categorySections.map((section) => (
            <section
              key={section.sectionId}
              id={section.sectionId}
              aria-labelledby={`${section.sectionId}-title`}
            >
              <header className="documents-page-section-header">
                <h3 id={`${section.sectionId}-title`}>{section.category}</h3>
                <p>{section.summary}</p>
                <span className="documents-page-section-priority">
                  {section.categoryPriority} priority
                </span>
              </header>

              <div className="documents-page-cards">
                {section.examples.map((example) => (
                  <PracticeCard key={example.id} example={example} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
