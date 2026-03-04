import { practiceExamples } from '../model/practice-examples'
import { PracticeCard } from './PracticeCard'

export function PracticesShowcase() {
  return (
    <section className="practices-showcase" aria-labelledby="practices-heading">
      <header className="practices-showcase__header">
        <h2 id="practices-heading">Do / Don&apos;t Best Practices</h2>
        <p>
          Focus areas for modern React teams: accessibility-first UI, predictable performance,
          and sustainable project structure.
        </p>
      </header>

      <div className="practices-showcase__grid">
        {practiceExamples.map((example) => (
          <PracticeCard key={example.id} example={example} />
        ))}
      </div>
    </section>
  )
}
