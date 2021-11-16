import { TypedString } from "../types/utils";

export type Symbol = TypedString<"Symbol">;

export type SingleNumberProcessor = (a: number) => number;

export type TwoNumbersProcessor = (a: number, b: number) => number;

type BaseOperator<TProcessor extends Function> = {
  symbol: Symbol;
  priority: number;
  processor: TProcessor;
};

export type SingleNumberOperator = BaseOperator<SingleNumberProcessor> & {
  singleNumber: true;
};
export type TwoNumbersOperator = BaseOperator<TwoNumbersProcessor> & {
  singleNumber?: undefined;
};

export type Operator = SingleNumberOperator | TwoNumbersOperator;

export type Expression = TypedString<"Expression">;

export type Variable = TypedString<"Variable">;

export type VariableResolver = (variable: Variable) => number;

export type ExpressionPart = Operator | Variable | number;
