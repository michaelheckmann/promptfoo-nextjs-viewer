import path from "path";
import { EvaluateTestSuite } from "promptfoo";
import { getProjectPath } from "./getProjectPath";

type RequiredKeys = "providers" | "outputPath";
type DefaultTestSuite = Required<
  Pick<Partial<EvaluateTestSuite>, RequiredKeys>
> &
  Omit<Partial<EvaluateTestSuite>, RequiredKeys>;

export const setDefaultTestSuite = (name: string): DefaultTestSuite => ({
  providers: "openai:gpt-3.5-turbo",
  outputPath: path.join(getProjectPath(), "results", `${name}.json`),
});
