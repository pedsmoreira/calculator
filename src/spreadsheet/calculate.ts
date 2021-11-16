import { cell } from "./cell";
import { Spreadsheet, SpreadsheetCell } from "./types";
import { calculate, Expression, Variable } from "../math";

export function calculateInSpreadsheet(
  spreadsheet: Spreadsheet,
  content: SpreadsheetCell
) {
  if (content.startsWith("=")) {
    return calculate(content.substring(1) as Expression, (resolverVariable) =>
      calculatedCell(spreadsheet, resolverVariable)
    );
  }

  return parseFloat(content);
}

export function calculatedCell(
  spreadsheet: Spreadsheet,
  variable: Variable
): number {
  const content = cell(spreadsheet, variable);
  return calculateInSpreadsheet(spreadsheet, content);
}
