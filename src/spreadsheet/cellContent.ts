import { calculate } from "../math/calculate";
import { Expression, Variable } from "../math/types";
import { cellLocation } from "./cellLocation";
import { Spreadsheet } from "./types";

export function cellContent(spreadsheet: Spreadsheet, variable: Variable) {
  const { row, column } = cellLocation(variable);
  return spreadsheet[column][row];
}

export function calculatedCellContent(
  spreadsheet: Spreadsheet,
  cellStr: Variable
): number {
  const content = cellContent(spreadsheet, cellStr);

  if (content.startsWith("=")) {
    return calculate(content.substring(1) as Expression, (variable) =>
      calculatedCellContent(spreadsheet, variable)
    );
  }

  return parseFloat(content);
}
