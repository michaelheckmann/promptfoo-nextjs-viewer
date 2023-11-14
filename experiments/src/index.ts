import dotenv from "dotenv";

import path from "path";
import { smoke } from "./smoke";
import { getProjectPath } from "./utils/getProjectPath";

const EXPERIMENT_MAP: Record<string, Function> = {
  smoke,
};

const main = async (experiment: string) => {
  const experimentFn = EXPERIMENT_MAP[experiment];
  if (!experimentFn) {
    console.error(`Experiment ${experiment} not found.`);
    process.exit(1);
  }
  await experimentFn();
};

dotenv.populate(process.env as any, {
  PROMPTFOO_CACHE_PATH: path.join(getProjectPath(), ".cache"),
});
dotenv.config();

const experiment = process.argv[2];

if (!experiment) {
  console.error("Please provide an experiment name as an argument.");
  process.exit(1);
}

if (!process.env.OPENAI_API_KEY) {
  console.error("Please provide an OPENAI_API_KEY environment variable.");
  process.exit(1);
}

main(experiment);
