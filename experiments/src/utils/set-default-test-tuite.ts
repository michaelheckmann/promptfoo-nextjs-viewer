import { EvaluateTestSuite } from "promptfoo";
import { getOutPath } from "./get-out-path";

type RequiredKeys = "providers" | "outputPath";
type DefaultTestSuite = Required<
  Pick<Partial<EvaluateTestSuite>, RequiredKeys>
> &
  Omit<Partial<EvaluateTestSuite>, RequiredKeys>;

type NoPathString<T extends string> = string extends T
  ? never
  : T extends `${infer _}${"/" | "."}${infer _}`
  ? never
  : T;

// We're only supporting one level of nesting for now
type Name<T extends string> =
  | NoPathString<T>
  | `${NoPathString<T>}/${NoPathString<T>}`;

export const setDefaultTestSuite = <S extends string>(
  name: Name<S>
): DefaultTestSuite => {
  return {
    providers: "openai:gpt-3.5-turbo",
    outputPath: getOutPath(name),
  };
};
