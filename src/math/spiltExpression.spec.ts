import { splitExpression } from "./splitExpression";
import * as operators from "./operators";

describe("splitExpression", () => {
  it("splits operators and numbers", () => {
    const parts = splitExpression("1+1+2-2", Object.values(operators));
    expect(parts).toEqual([
      1,
      operators.sum,
      1,
      operators.sum,
      2,
      operators.subtraction,
      2,
    ]);
  });

  it("splits operators, numbers and variables", () => {
    const parts = splitExpression("1+A1-2", Object.values(operators));
    expect(parts).toEqual([1, operators.sum, "A1", operators.subtraction, 2]);
  });
});
