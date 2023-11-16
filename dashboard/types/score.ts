export type ManualGrading = {
  user: string
  pass: boolean
  score: number
  reason: string
}

export type ManualScore = {
  data: {
    text: string
    prompt: string
    provider: string
    vars: string[]
    manualGrading: ManualGrading
  }[]
}
