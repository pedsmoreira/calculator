import { cellContent, calculatedCellContent } from "./cellContent";
import { Spreadsheet } from "./types";

const spreadsheet: Spreadsheet = [
  ["1", "2", "=B2"],
  ["5", "=A1+A2*20/5", "10"],
];

describe("cellContent", () => {
  it("gets cell content", () => {
    expect(cellContent(spreadsheet, "A1")).toEqual("1");
    expect(cellContent(spreadsheet, "A2")).toEqual("2");
    expect(cellContent(spreadsheet, "A3")).toEqual("=B2");
    expect(cellContent(spreadsheet, "B1")).toEqual("5");
    expect(cellContent(spreadsheet, "B2")).toEqual("=A1+A2*20/5");
    expect(cellContent(spreadsheet, "B3")).toEqual("10");
  });
});

describe("calculatedCellContent", () => {
  it("gets calculated cell content", () => {
    expect(calculatedCellContent(spreadsheet, "A1")).toEqual(1);
    expect(calculatedCellContent(spreadsheet, "A2")).toEqual(2);
    expect(calculatedCellContent(spreadsheet, "A3")).toEqual(9);
    expect(calculatedCellContent(spreadsheet, "B1")).toEqual(5);
    expect(calculatedCellContent(spreadsheet, "B2")).toEqual(9);
    expect(calculatedCellContent(spreadsheet, "B3")).toEqual(10);
  });
});
