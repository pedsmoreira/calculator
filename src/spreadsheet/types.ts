import { TypedString } from "../types/utils";

export type CellLocation = { column: number; row: number };

export type SpreadsheetCell = TypedString<"SpreadsheetCell">;

export type Spreadsheet = SpreadsheetCell[][];
