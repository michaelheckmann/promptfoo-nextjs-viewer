import { EvaluateOptions } from "promptfoo";

export const setDefaultOptions = (): EvaluateOptions => ({
  progressCallback: (progress, total) => {
    console.log(`PROGRESS: ${progress} / ${total}`);
  },
});
