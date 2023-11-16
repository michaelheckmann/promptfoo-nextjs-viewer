export const makeGetRequest = async <T>(url: string): Promise<T | null> => {
  try {
    const res = await fetch(url)
    const { data } = await res.json()
    return data as T
  } catch (error) {
    console.error(error)
    return null
  }
}
