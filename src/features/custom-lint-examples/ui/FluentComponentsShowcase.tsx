import { useId, useState } from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Combobox,
  Divider,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Option,
  ProgressBar,
  Radio,
  RadioGroup,
  Slider,
  Tag,
  TagGroup,
  Textarea,
  Tooltip,
} from '@fluentui/react-components'

const categoryOptions = ['Design', 'Engineering', 'Research', 'Operations']

export function FluentComponentsShowcase() {
  const progressLabelId = useId()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Design')
  const [completion, setCompletion] = useState(40)
  const [summary, setSummary] = useState('Proposed updates for dashboard navigation and onboarding docs.')
  const [publishTarget, setPublishTarget] = useState('team')

  return (
    <section className="fluent-showcase" aria-labelledby="fluent-showcase-title">
      <header className="fluent-showcase-header">
        <p className="fluent-showcase-kicker">Custom Lint Example</p>
        <h2 id="fluent-showcase-title">Fluent UI Extended Component Showcase</h2>
        <p>
          This example intentionally renders a larger set of Fluent UI component categories in one
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


          <div className="fluent-showcase-progress-row">
            <span id={progressLabelId} className="fluent-showcase-visually-hidden">
              Completion progress
            </span>
            <span
              className="fluent-showcase-visually-hidden"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              Completion target is now {String(completion)} percent complete.
            </span>
            <ProgressBar
              value={completion / 100}
              thickness="large"
              aria-labelledby={progressLabelId}
              aria-valuetext={`${String(completion)} percent complete`}
            />
            <Badge appearance="filled" color="informative" size="large" aria-hidden="true">
              {completion}%
            </Badge>
          </div>

          <Divider>Additional Fluent Components</Divider>

          <div className="fluent-showcase-identity-row">
            <Avatar name="Jordan Reeves" color="colorful" size={36} />
            <div>
              <p className="fluent-showcase-inline-title">Jordan Reeves</p>
              <p className="fluent-showcase-inline-subtitle">Product Design Lead</p>
            </div>
            <TagGroup aria-label="Document status tags">
              <Tag appearance="filled" size="medium">Draft</Tag>
              <Tag appearance="outline" size="medium">Review</Tag>
              <Tag appearance="outline" size="medium">Client-facing</Tag>
            </TagGroup>
          </div>

          <Field label="Summary notes">
            <Textarea
              resize="vertical"
              value={summary}
              onChange={(_event, data) => {
                setSummary(data.value)
              }}
            />
          </Field>

          <Field label="Publish target">
            <RadioGroup
              value={publishTarget}
              onChange={(_event, data) => {
                setPublishTarget(data.value)
              }}
              layout="horizontal"
            >
              <Radio value="team" label="Team" />
              <Radio value="organization" label="Organization" />
              <Radio value="public" label="Public" />
            </RadioGroup>
          </Field>

          <Tooltip content="This action publishes a read-only preview" relationship="label">
            <Button appearance="subtle">Open Share Preview</Button>
          </Tooltip>

          <MessageBar intent="info" layout="multiline">
            <MessageBarBody>
              <MessageBarTitle>Accessibility reminder</MessageBarTitle>
              Keep control labels descriptive, especially when you use icon-only actions.
            </MessageBarBody>
          </MessageBar>

          <Accordion collapsible>
            <AccordionItem value="components-list">
              <AccordionHeader>17 Fluent component types included</AccordionHeader>
              <AccordionPanel>
                Accordion, Avatar, Badge, Button, Card, Checkbox, Combobox, Divider, Input,
                MessageBar, ProgressBar, RadioGroup, Slider, Switch, TagGroup, Textarea, Tooltip
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
