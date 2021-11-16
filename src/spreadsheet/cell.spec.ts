import { cell } from "./cell";
import { Spreadsheet } from "./types";

const spreadsheet: Spreadsheet = [
  ["1", "2", "=B2"],
  ["5", "=A1+A2*20/5", "10"],
];

describe("cell", () => {
  it("gets cell content", () => {
    expect(cell(spreadsheet, "A1")).toEqual("1");
    expect(cell(spreadsheet, "A2")).toEqual("2");
    expect(cell(spreadsheet, "A3")).toEqual("=B2");
    expect(cell(spreadsheet, "B1")).toEqual("5");
    expect(cell(spreadsheet, "B2")).toEqual("=A1+A2*20/5");
    expect(cell(spreadsheet, "B3")).toEqual("10");
  });
});
