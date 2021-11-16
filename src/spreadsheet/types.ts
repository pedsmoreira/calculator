import { TypedString } from "../types/utils";

export type SpreadsheetCell = TypedString<"SpreadsheetCell">;

export type Spreadsheet = SpreadsheetCell[][];
