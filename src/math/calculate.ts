import { splitExpression } from "./splitExpression";
import { Expression, VariableResolver } from "./types";
import * as operators from "./operators";
import { processExpressionParts } from "./processExpressionParts";

export function calculate(
  expression: Expression,
  variableResolver: VariableResolver
) {
  const parts = splitExpression(expression, Object.values(operators));
  return processExpressionParts(parts, variableResolver);
}
