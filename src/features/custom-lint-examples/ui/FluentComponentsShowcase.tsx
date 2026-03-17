import { useState } from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Combobox,
  Field,
  Input,
  Option,
  ProgressBar,
  Slider,
  Switch,
} from '@fluentui/react-components'

const categoryOptions = ['Design', 'Engineering', 'Research', 'Operations']

export function FluentComponentsShowcase() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Design')
  const [isEnabled, setIsEnabled] = useState(true)
  const [isPinned, setIsPinned] = useState(false)
  const [completion, setCompletion] = useState(40)

  return (
    <section className="fluent-showcase" aria-labelledby="fluent-showcase-title">
      <header className="fluent-showcase-header">
        <p className="fluent-showcase-kicker">Custom Lint Example</p>
        <h2 id="fluent-showcase-title">Fluent UI 10-Component Showcase</h2>
        <p>
          This example intentionally renders 10 distinct Fluent UI component categories in one
          feature screen.
        </p>
      </header>

      <Card className="fluent-showcase-card">
        <CardHeader
          header={<h3>Interactive Form Surface</h3>}
          description="Try these controls to explore how the components feel together."
        />

        <div className="fluent-showcase-grid">
          <Field label="Document name">
            <Input
              value={name}
              onChange={(_event, data) => {
                setName(data.value)
              }}
              placeholder="Quarterly architecture update"
            />
          </Field>

          <Field label="Category">
            <Combobox
              value={category}
              selectedOptions={[category]}
              onOptionSelect={(_event, data) => {
                if (data.optionValue) {
                  setCategory(data.optionValue)
                }
              }}
            >
              {categoryOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Combobox>
          </Field>

          <Field label="Completion target">
            <Slider
              min={0}
              max={100}
              value={completion}
              onChange={(_event, data) => {
                setCompletion(data.value)
              }}
            />
          </Field>

          <div className="fluent-showcase-inline-controls">
            <Checkbox
              checked={isPinned}
              onChange={(_event, data) => {
                setIsPinned(typeof data.checked === 'boolean' ? data.checked : false)
              }}
              label="Pin to dashboard"
            />
            <Switch
              checked={isEnabled}
              onChange={(_event, data) => {
                setIsEnabled(typeof data.checked === 'boolean' ? data.checked : false)
              }}
              label="Enable notifications"
            />
          </div>

          <div className="fluent-showcase-progress-row">
            <ProgressBar value={completion / 100} thickness="large" />
            <Badge appearance="filled" color="informative" size="large">
              {completion}%
            </Badge>
          </div>

          <Accordion collapsible>
            <AccordionItem value="components-list">
              <AccordionHeader>10 Fluent component types included</AccordionHeader>
              <AccordionPanel>
                Accordion, Badge, Button, Card, Checkbox, Combobox, Input, ProgressBar, Slider,
                Switch
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <div className="fluent-showcase-actions">
            <Button appearance="primary">Save Draft</Button>
            <Button appearance="secondary">Run Validation</Button>
          </div>
        </div>
      </Card>
    </section>
  )
}
