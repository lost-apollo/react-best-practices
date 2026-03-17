export interface SurveyResponses {
  overallExperience: number
  taskCompletion: string
  recommendation: string
  bestParts: string[]
  confusionPoints: string[]
  improvementIdeas: string
  improvementReason: string
  delightReason: string
  supportNeeded: string
  supportRating: number
}

export const initialResponses: SurveyResponses = {
  overallExperience: 4,
  taskCompletion: 'yes-minor-friction',
  recommendation: 'somewhat-likely',
  bestParts: ['crud-workflow'],
  confusionPoints: [],
  improvementIdeas: '',
  improvementReason: '',
  delightReason: '',
  supportNeeded: 'no',
  supportRating: 3,
}
