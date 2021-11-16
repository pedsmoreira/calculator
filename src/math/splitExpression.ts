import { Expression, ExpressionPart, Operator, Variable } from "./types";

export function splitExpression(
  expression: Expression | undefined,
  operators: Operator[]
): ExpressionPart[] {
  if (!expression || expression.length === 0) return [];

  if (operators.length === 0) {
    const value = parseFloat(expression);
    if (isNaN(value)) return [expression as Variable];
    return [value];
  }

  const [operator, ...remainingOperators] = operators;
  const expressionSplit = expression.split(operator.symbol);

  const parts: ExpressionPart[] = [];
  expressionSplit.forEach((expressionPart, index) => {
    if (index > 0) parts.push(operator);

    parts.push(
      ...splitExpression(expressionPart as Expression, remainingOperators)
    );
  });

  return parts;
}
