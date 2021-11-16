import { ExpressionPart, Operator, VariableResolver } from "./types";
import { groupBy } from "lodash";

function isOperator(part: ExpressionPart): part is Operator {
  return typeof part === "object" && part.symbol !== undefined;
}

function partToNumber(
  name: string,
  part: ExpressionPart,
  variableResolver: VariableResolver
): number {
  if (typeof part === "number") return part;
  if (typeof part === "string") return variableResolver(part);
  throw new Error(`Invalid ${name} part "${part}" for calculation`);
}

function processExpressionPartsWithOperators(
  parts: ExpressionPart[],
  operators: Operator[],
  variableResolver: VariableResolver
): ExpressionPart[] {
  let newParts: ExpressionPart[] = parts;

  let index = 0;
  while (true) {
    if (index >= newParts.length) break;

    const part = parts[index];
    if (!isOperator(part) || !operators.includes(part)) {
      index++;
      continue;
    }

    const operator = part;

    const leftPart = partToNumber(
      "left",
      newParts[index - 1],
      variableResolver
    );

    if (operator.singleNumber) {
      const value = operator.processor(leftPart);
      newParts.splice(index - 1, 2, value);
    } else {
      const rightPart = partToNumber(
        "right",
        newParts[index + 1],
        variableResolver
      );

      const value = operator.processor(leftPart, rightPart);
      newParts.splice(index - 1, 3, value);
    }
  }

  return newParts;
}

export function processExpressionParts(
  parts: ExpressionPart[],
  variableResolver: VariableResolver
): number {
  const uniqueOperators = Array.from(new Set(parts.filter(isOperator)));
  const operatorsByPriority = groupBy(uniqueOperators, (op) => op.priority);

  let newParts: ExpressionPart[] = [...parts];
  Object.keys(operatorsByPriority)
    .reverse()
    .forEach((priority) => {
      const operators = operatorsByPriority[priority];
      newParts = processExpressionPartsWithOperators(
        parts,
        operators,
        variableResolver
      );
    });

  const leftoverPart = newParts[0];
  return partToNumber("leftover", leftoverPart, variableResolver);
}
