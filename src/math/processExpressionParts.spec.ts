import { processExpressionParts } from "./processExpressionParts";
import * as operators from "./operators";

describe("processExpressionParts", () => {
  it("processes the parts", () => {
    const parts = [
      1,
      operators.sum,
      1,
      operators.sum,
      2,
      operators.subtraction,
      2,
    ];

    const result = processExpressionParts(parts, () => 0);
    expect(result).toBe(2);
  });
});
