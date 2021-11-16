import { calculatedCell } from "./calculate";
import { Spreadsheet } from "./types";

const spreadsheet: Spreadsheet = [
  ["1", "2", "=B2"],
  ["5", "=A1+A2*20/5", "10"],
];

describe("calculatedCell", () => {
  it("gets calculated cell content", () => {
    expect(calculatedCell(spreadsheet, "A1")).toEqual(1);
    expect(calculatedCell(spreadsheet, "A2")).toEqual(2);
    expect(calculatedCell(spreadsheet, "A3")).toEqual(9);
    expect(calculatedCell(spreadsheet, "B1")).toEqual(5);
    expect(calculatedCell(spreadsheet, "B2")).toEqual(9);
    expect(calculatedCell(spreadsheet, "B3")).toEqual(10);
  });
});
