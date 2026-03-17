export interface SurveyChoiceOption {
  value: string
  label: string
}

interface SurveyQuestionBase {
  id: string
  prompt: string
  helpText: string
  required: boolean
}

export interface RatingQuestion extends SurveyQuestionBase {
  type: 'rating'
  min: number
  max: number
  step: number
}

export interface SingleChoiceQuestion extends SurveyQuestionBase {
  type: 'single-choice'
  options: SurveyChoiceOption[]
}

export interface MultiChoiceQuestion extends SurveyQuestionBase {
  type: 'multi-choice'
  options: SurveyChoiceOption[]
}

export interface TextQuestion extends SurveyQuestionBase {
  type: 'text'
  placeholder: string
}

export type SurveyQuestion =
  | RatingQuestion
  | SingleChoiceQuestion
  | MultiChoiceQuestion
  | TextQuestion

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'overall-experience',
    type: 'rating',
    prompt: 'How would you rate your overall experience with this demo?',
    helpText: 'Rate from 1 (poor) to 5 (excellent).',
    required: true,
    min: 1,
    max: 5,
    step: 1,
  },
  {
    id: 'task-completion',
    type: 'single-choice',
    prompt: 'Were you able to complete your primary task?',
    helpText: 'Choose the option that best describes your outcome.',
    required: true,
    options: [
      { value: 'yes-easily', label: 'Yes, very easily' },
      { value: 'yes-minor-friction', label: 'Yes, with minor friction' },
      { value: 'partially', label: 'Partially completed' },
      { value: 'no', label: 'No, I could not complete it' },
    ],
  },
  {
    id: 'recommendation',
    type: 'single-choice',
    prompt: 'How likely are you to recommend this demo to a teammate?',
    helpText: 'Select one option that reflects your recommendation level.',
    required: true,
    options: [
      { value: 'very-likely', label: 'Very likely' },
      { value: 'somewhat-likely', label: 'Somewhat likely' },
      { value: 'not-likely', label: 'Not likely' },
    ],
  },
  {
    id: 'best-parts',
    type: 'multi-choice',
    prompt: 'What parts of the demo did you find most helpful?',
    helpText: 'Select all that apply.',
    required: false,
    options: [
      { value: 'navigation', label: 'Navigation and page layout' },
      { value: 'crud-workflow', label: 'CRUD workflow and interactions' },
      { value: 'best-practice-docs', label: 'Best-practice documentation' },
      { value: 'visual-design', label: 'Visual design and readability' },
    ],
  },
  {
    id: 'confusion-points',
    type: 'multi-choice',
    prompt: 'Where did you experience confusion or friction?',
    helpText: 'Select all areas that felt unclear.',
    required: false,
    options: [
      { value: 'onboarding', label: 'Initial onboarding context' },
      { value: 'form-fields', label: 'Field labels or form validation' },
      { value: 'table-actions', label: 'Table actions and edit flow' },
      { value: 'content-density', label: 'Information density on screen' },
    ],
  },
  {
    id: 'improvement-ideas',
    type: 'text',
    prompt: 'What is one improvement you would prioritize next?',
    helpText: 'A short suggestion helps us improve the next iteration.',
    required: false,
    placeholder: 'Example: simplify filtering and expose primary actions sooner.',
  },
]
