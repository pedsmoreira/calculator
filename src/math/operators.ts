import { Operator } from "./types";

export const sum: Operator = {
  symbol: "+",
  processor: (a, b) => a + b,
  priority: 1,
};

export const subtraction: Operator = {
  symbol: "-",
  processor: (a, b) => a - b,
  priority: 1,
};

export const mulitplication: Operator = {
  symbol: "*",
  processor: (a, b) => a * b,
  priority: 2,
};

export const division: Operator = {
  symbol: "/",
  processor: (a, b) => a / b,
  priority: 2,
};
