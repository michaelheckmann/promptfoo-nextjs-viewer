import { evaluate } from "promptfoo";
import { setDefaultOptions } from "../utils/set-default-options";
import { setDefaultTestSuite } from "../utils/set-default-test-tuite";
import { prompts } from "./prompts";
import { tests } from "./tests";

export const smoke = async () => {
  const results = await evaluate(
    {
      ...setDefaultTestSuite("smoke"),
      prompts,
      tests,
    },
    setDefaultOptions()
  );
  return results;
};
