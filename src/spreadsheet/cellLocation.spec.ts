import { cellLocation } from "./cellLocation";

describe("cellLocation", () => {
  it("returns cell location", () => {
    expect(cellLocation("A1")).toEqual({ column: 0, row: 0 });
    expect(cellLocation("B3")).toEqual({ column: 1, row: 2 });
  });
});
