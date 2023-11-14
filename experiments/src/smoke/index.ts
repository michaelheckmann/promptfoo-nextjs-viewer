import { evaluate } from "promptfoo";
import { setDefaultOptions } from "../utils/setDefaultOptions";
import { setDefaultTestSuite } from "./../utils/setDefaultTestSuite";
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
