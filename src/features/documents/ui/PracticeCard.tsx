import type { PracticeExample } from '../../../shared/types/practice-example'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { getPracticeCodeExamples } from '../model/practice-code-examples'

interface PracticeCardProps {
  example: PracticeExample
}

export function PracticeCard({ example }: PracticeCardProps) {
  const codeExamples = getPracticeCodeExamples(example)

  return (
    <article className="practice-card" aria-labelledby={`${example.id}-title`}>
      <header className="practice-card-header">
        <p className="practice-card-category">{example.category}</p>
        <p className="practice-card-priority">{example.priority} priority</p>
        <h3 className="practice-card-title" id={`${example.id}-title`}>
          {example.title}
        </h3>
      </header>

      <div className="practice-card-examples" role="group" aria-label="Do and don't examples">
        <section className="practice-card-example practice-card-example-do" aria-label="Do">
          <h4>Do</h4>
          <p>{example.doExample}</p>
          <SyntaxHighlighter
            className="practice-card-code"
            style={oneLight}
            language={codeExamples.language}
            customStyle={{ margin: 0 }}
          >
            {codeExamples.doCode}
          </SyntaxHighlighter>
        </section>

        <section className="practice-card-example practice-card-example-dont" aria-label="Don't">
          <h4>Don&apos;t</h4>
          <p>{example.dontExample}</p>
          <SyntaxHighlighter
            className="practice-card-code"
            style={oneLight}
            language={codeExamples.language}
            customStyle={{ margin: 0 }}
          >
            {codeExamples.dontCode}
          </SyntaxHighlighter>
        </section>
      </div>

      <p className="practice-card-rationale">{example.rationale}</p>

      <ul className="practice-card-checklist" aria-label="Validation checklist">
        {example.checklist.map((checkItem) => (
          <li key={checkItem}>{checkItem}</li>
        ))}
      </ul>
    </article>
  )
}
