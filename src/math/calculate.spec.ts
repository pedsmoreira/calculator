import { calculate } from "./calculate";

describe("calculate", () => {
  it("calculates +- expressions", () => {
    expect(calculate("1+1")).toBe(2);
    expect(calculate("1+2")).toBe(3);
    expect(calculate("2-1")).toBe(1);
    expect(calculate("1-2")).toBe(-1);
    expect(calculate("1-2+4")).toBe(3);
  });

  it("calculates */ expressions", () => {
    expect(calculate("2*2")).toBe(4);
    expect(calculate("10*3")).toBe(30);
    expect(calculate("8/2")).toBe(4);
    expect(calculate("1/2")).toBe(0.5);
    expect(calculate("10*2/4")).toBe(5);
  });
});
