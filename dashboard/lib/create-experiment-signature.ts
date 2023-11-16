const shortenStringToHash = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash &= hash // Convert to 32bit integer
  }
  return hash.toString(36)
}

export const createExperimentSignature = (result: {
  text: string
  prompt: string
  provider: string
  vars: string[]
}) => {
  const { text, prompt, provider, vars } = result
  const resultString = JSON.stringify({
    text,
    prompt,
    provider,
    vars,
  })
  return shortenStringToHash(resultString)
}
