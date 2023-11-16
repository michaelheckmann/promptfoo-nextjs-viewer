import path from "path"

export const getProjectPath = () => {
  const dirSegments = __dirname.split(path.sep)
  const projectFolder = dirSegments.indexOf("dashboard")
  if (projectFolder === -1) {
    throw new Error("Could not find project folder.")
  }
  return dirSegments.slice(0, projectFolder + 1).join(path.sep)
}
