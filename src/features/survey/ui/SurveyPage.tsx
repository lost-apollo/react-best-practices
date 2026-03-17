import {
  Badge,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Field,
  Radio,
  RadioGroup,
  Slider,
  Text,
  Textarea,
} from '@fluentui/react-components'
import { CheckmarkCircle24Regular, Form24Regular } from '@fluentui/react-icons'
import { useMemo, useState } from 'react'
import { surveyQuestions } from '../model/surveyQuestions'
import { initialResponses, type SurveyResponses } from '../model/surveyResponses'

function toggleValue(currentValues: string[], value: string) {
  return currentValues.includes(value)
    ? currentValues.filter((existingValue) => existingValue !== value)
    : [...currentValues, value]
}

export function SurveyPage() {
  const [responses, setResponses] = useState<SurveyResponses>(initialResponses)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const overallQuestion = surveyQuestions.find((question) => question.id === 'overall-experience')
  const taskCompletionQuestion = surveyQuestions.find((question) => question.id === 'task-completion')
  const recommendationQuestion = surveyQuestions.find((question) => question.id === 'recommendation')
  const bestPartsQuestion = surveyQuestions.find((question) => question.id === 'best-parts')
  const confusionPointsQuestion = surveyQuestions.find((question) => question.id === 'confusion-points')
  const improvementIdeasQuestion = surveyQuestions.find((question) => question.id === 'improvement-ideas')

  const overallRatingQuestion = overallQuestion?.type === 'rating' ? overallQuestion : null
  const taskCompletionSingleChoiceQuestion =
    taskCompletionQuestion?.type === 'single-choice' ? taskCompletionQuestion : null
  const recommendationSingleChoiceQuestion =
    recommendationQuestion?.type === 'single-choice' ? recommendationQuestion : null
  const bestPartsMultiChoiceQuestion =
    bestPartsQuestion?.type === 'multi-choice' ? bestPartsQuestion : null
  const confusionPointsMultiChoiceQuestion =
    confusionPointsQuestion?.type === 'multi-choice' ? confusionPointsQuestion : null
  const improvementIdeasTextQuestion =
    improvementIdeasQuestion?.type === 'text' ? improvementIdeasQuestion : null

  const showImprovementFollowUp = responses.overallExperience <= 2
  const showRecommendationFollowUp = responses.recommendation === 'very-likely'
  const showSupportRating = responses.supportNeeded === 'yes'

  const selectedHighlights = useMemo(() => {
    return surveyQuestions
      .filter((question) => question.type === 'multi-choice')
      .reduce<string[]>((accumulator, question) => {
        if (question.id === 'best-parts') {
          return [...accumulator, ...responses.bestParts]
        }

        if (question.id === 'confusion-points') {
          return [...accumulator, ...responses.confusionPoints]
        }

        return accumulator
      }, [])
  }, [responses.bestParts, responses.confusionPoints])

  return (
    <section className="survey-page" aria-labelledby="survey-title">
      <Card className="survey-page-header">
        <CardHeader
          image={<Form24Regular aria-hidden="true" />}
          header={
            <Text as="h2" id="survey-title" size={700} weight="semibold">
              Demo Feedback Survey
            </Text>
          }
          description={
            <Text>
              Help us improve this React + Fluent UI demo with quick feedback across usability,
              clarity, and feature usefulness.
            </Text>
          }
        />
        <div className="survey-page-meta" aria-label="Survey overview">
          <Badge appearance="filled" color="informative">
            Questions: {surveyQuestions.length}
          </Badge>
          <Badge appearance="filled" color="brand">
            Conditional follow-ups enabled
          </Badge>
        </div>
      </Card>

      <Card className="survey-page-form-card">
        {overallRatingQuestion ? (
          <Field
            label={overallRatingQuestion.prompt}
            hint={overallRatingQuestion.helpText}
            required={overallRatingQuestion.required}
            className="survey-field"
          >
            <div className="survey-slider-row">
              <Slider
                min={overallRatingQuestion.min}
                max={overallRatingQuestion.max}
                step={overallRatingQuestion.step}
                value={responses.overallExperience}
                onChange={(_, data) => {
                  setResponses((previous) => ({
                    ...previous,
                    overallExperience: data.value,
                  }))
                }}
                aria-label="Overall experience score"
              />
              <Text weight="semibold">{responses.overallExperience}/5</Text>
            </div>
          </Field>
        ) : null}

        {taskCompletionSingleChoiceQuestion ? (
          <Field
            label={taskCompletionSingleChoiceQuestion.prompt}
            hint={taskCompletionSingleChoiceQuestion.helpText}
            required={taskCompletionSingleChoiceQuestion.required}
            className="survey-field"
          >
            <RadioGroup
              value={responses.taskCompletion}
              onChange={(_, data) => {
                setResponses((previous) => ({
                  ...previous,
                  taskCompletion: data.value,
                }))
              }}
            >
              {taskCompletionSingleChoiceQuestion.options.map((option) => (
                <Radio key={option.value} value={option.value} label={option.label} />
              ))}
            </RadioGroup>
          </Field>
        ) : null}

        {recommendationSingleChoiceQuestion ? (
          <Field
            label={recommendationSingleChoiceQuestion.prompt}
            hint={recommendationSingleChoiceQuestion.helpText}
            required={recommendationSingleChoiceQuestion.required}
            className="survey-field"
          >
            <RadioGroup
              value={responses.recommendation}
              onChange={(_, data) => {
                setResponses((previous) => ({
                  ...previous,
                  recommendation: data.value,
                }))
              }}
            >
              {recommendationSingleChoiceQuestion.options.map((option) => (
                <Radio key={option.value} value={option.value} label={option.label} />
              ))}
            </RadioGroup>
          </Field>
        ) : null}

        {bestPartsMultiChoiceQuestion ? (
          <Field
            label={bestPartsMultiChoiceQuestion.prompt}
            hint={bestPartsMultiChoiceQuestion.helpText}
            className="survey-field"
          >
            <div
              className="survey-checkbox-grid"
              role="group"
              aria-label={bestPartsMultiChoiceQuestion.prompt}
            >
              {bestPartsMultiChoiceQuestion.options.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  checked={responses.bestParts.includes(option.value)}
                  onChange={(_, data) => {
                    setResponses((previous) => ({
                      ...previous,
                      bestParts: data.checked
                        ? [...previous.bestParts, option.value]
                        : previous.bestParts.filter((value) => value !== option.value),
                    }))
                  }}
                />
              ))}
            </div>
          </Field>
        ) : null}

        {confusionPointsMultiChoiceQuestion ? (
          <Field
            label={confusionPointsMultiChoiceQuestion.prompt}
            hint={confusionPointsMultiChoiceQuestion.helpText}
            className="survey-field"
          >
            <div
              className="survey-checkbox-grid"
              role="group"
              aria-label={confusionPointsMultiChoiceQuestion.prompt}
            >
              {confusionPointsMultiChoiceQuestion.options.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  checked={responses.confusionPoints.includes(option.value)}
                  onChange={() => {
                    setResponses((previous) => ({
                      ...previous,
                      confusionPoints: toggleValue(previous.confusionPoints, option.value),
                    }))
                  }}
                />
              ))}
            </div>
          </Field>
        ) : null}

        {improvementIdeasTextQuestion ? (
          <Field
            label={improvementIdeasTextQuestion.prompt}
            hint={improvementIdeasTextQuestion.helpText}
            className="survey-field"
          >
            <Textarea
              value={responses.improvementIdeas}
              onChange={(_, data) => {
                setResponses((previous) => ({
                  ...previous,
                  improvementIdeas: data.value,
                }))
              }}
              placeholder={improvementIdeasTextQuestion.placeholder}
              resize="vertical"
              rows={3}
            />
          </Field>
        ) : null}

        {showImprovementFollowUp ? (
          <Field
            label="You gave a low score. What was the main blocker?"
            hint="This follow-up appears when the overall score is 1 or 2."
            required
            className="survey-field"
          >
            <Textarea
              value={responses.improvementReason}
              onChange={(_, data) => {
                setResponses((previous) => ({
                  ...previous,
                  improvementReason: data.value,
                }))
              }}
              placeholder="Tell us the main issue that reduced your score."
              rows={2}
            />
          </Field>
        ) : null}

        {showRecommendationFollowUp ? (
          <Field
            label="What made you confident enough to recommend this demo?"
            hint="This follow-up appears when recommendation is Very likely."
            className="survey-field"
          >
            <Textarea
              value={responses.delightReason}
              onChange={(_, data) => {
                setResponses((previous) => ({
                  ...previous,
                  delightReason: data.value,
                }))
              }}
              placeholder="Share what stood out positively."
              rows={2}
            />
          </Field>
        ) : null}

        <Field
          label="Did you need support while navigating the demo?"
          hint="This controls whether an additional support rating question is shown."
          className="survey-field"
        >
          <RadioGroup
            value={responses.supportNeeded}
            onChange={(_, data) => {
              setResponses((previous) => ({
                ...previous,
                supportNeeded: data.value,
              }))
            }}
          >
            <Radio value="yes" label="Yes, I needed support" />
            <Radio value="no" label="No, I completed it independently" />
          </RadioGroup>
        </Field>

        {showSupportRating ? (
          <Field
            label="How helpful was the support you received?"
            hint="Rate support quality from 1 to 5."
            className="survey-field"
          >
            <div className="survey-slider-row">
              <Slider
                min={1}
                max={5}
                step={1}
                value={responses.supportRating}
                onChange={(_, data) => {
                  setResponses((previous) => ({
                    ...previous,
                    supportRating: data.value,
                  }))
                }}
                aria-label="Support quality score"
              />
              <Text weight="semibold">{responses.supportRating}/5</Text>
            </div>
          </Field>
        ) : null}

        <div className="survey-actions">
          <Button
            appearance="primary"
            onClick={() => {
              setIsSubmitted(true)
            }}
          >
            Submit Feedback
          </Button>
          <Button
            appearance="secondary"
            onClick={() => {
              setResponses(initialResponses)
              setIsSubmitted(false)
            }}
          >
            Reset
          </Button>
        </div>
      </Card>

      {isSubmitted ? (
        <Card className="survey-result" aria-live="polite">
          <CardHeader
            image={<CheckmarkCircle24Regular aria-hidden="true" />}
            header={
              <Text as="h3" size={500} weight="semibold">
                Thanks for your feedback
              </Text>
            }
            description={<Text>Your responses were captured in this local demo state.</Text>}
          />

          <div className="survey-result-grid">
            <Text>Overall score: {responses.overallExperience}/5</Text>
            <Text>Task completion: {responses.taskCompletion}</Text>
            <Text>Recommendation: {responses.recommendation}</Text>
            <Text>Selected highlights: {selectedHighlights.length}</Text>
          </div>
        </Card>
      ) : null}
    </section>
  )
}