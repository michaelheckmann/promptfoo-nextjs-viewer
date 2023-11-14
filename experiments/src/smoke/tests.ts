import { Tests } from "../utils/types";

export const tests: Tests = [
  {
    vars: {
      var1: "Any sufficiently advanced technology is indistinguishable from magic.",
    },
  },
  {
    vars: {
      var1: "Machine intelligence is the last invention that humanity will ever need to make",
    },
    assert: [
      {
        type: "javascript",
        value: (output) => {
          const pass = output.toString().includes("Technologie");
          return {
            pass,
            score: pass ? 1.0 : 0.0,
            reason: pass
              ? "Output contained 'Technologie'"
              : "Output did not contain 'Technologie'",
          };
        },
      },
    ],
  },
];
