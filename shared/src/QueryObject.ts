export class Query {
  targetClass: string;
  condition: Condition;
  constructor(data?: any) {
    Object.assign(this, data);
  }
}

export abstract class Condition {
  and(rhs: Condition): Condition {
    return new BinaryOpt({
      opt: "and",
      lhs: this,
      rhs: rhs,
    });
  }
  or(rhs: Condition): Condition {
    return new BinaryOpt({
      opt: "or",
      lhs: this,
      rhs: rhs,
    });
  }
  not(): Condition {
    return new Not({ condition: this });
  }
  constructor(data?: any) {
    Object.assign(this, data);
  }
}

export class ColumnCondition extends Condition {
  static readonly validOpts = [
    "==",
    "!=",
    ">",
    "<",
    ">=",
    "<=",
    "startsWith",
    "endsWith",
    "contains",
  ];
  opt: string;
  column: string;
  value: string;
}

export class Not extends Condition {
  condition: Condition;
}

export class BinaryOpt extends Condition {
  static readonly validOpts = ["and", "or"];
  opt: string;
  lhs: Condition;
  rhs: Condition;
}

function conditionBuilder(opt: string) {
  return (column: string, value: string) =>
    new ColumnCondition({
      opt: opt,
      column: column,
      value: value,
    });
}

export function query(targetClass: Function, condition: Condition): Query {
  return new Query({
    targetClass: targetClass.name,
    condition: condition,
  });
}
export const not = (c: Condition) => new Not(c);
export const equals = conditionBuilder("==");
export const notEquals = conditionBuilder("!=");
export const startsWith = conditionBuilder("startsWith");
export const endsWith = conditionBuilder("endsWith");
export const contains = conditionBuilder("contains");
export const greaterThan = conditionBuilder(">");
export const lessThan = conditionBuilder("<");
export const greaterOrEq = conditionBuilder(">=");
export const lessOrEq = conditionBuilder("<=");
