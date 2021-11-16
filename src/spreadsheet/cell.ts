import { CellLocation, SpreadsheetCell } from ".";
import { Variable } from "../math";
import { cellLocation } from "./cellLocation";
import { Spreadsheet } from "./types";

export function cell(
  spreadsheet: Spreadsheet,
  placement: Variable | CellLocation
): SpreadsheetCell {
  if (typeof placement === "object") {
    return spreadsheet[placement.column][placement.row];
  }

  return cell(spreadsheet, cellLocation(placement));
}
