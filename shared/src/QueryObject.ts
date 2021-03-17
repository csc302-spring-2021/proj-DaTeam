/**
 * Wrapper object for a search query\
 * Please use the builder function to generate a new object
 */
export class Query {
  targetClass: string;
  condition: Condition;
  constructor(data?: any) {
    Object.assign(this, data);
  }
}

/**
 * Represents a search condition (where clause)\
 * Please use the builder function to generate a new object
 */
export abstract class Condition {
  /** join with another clause using and */
  and(rhs: Condition): Condition {
    return new BinaryOpt({
      opt: "and",
      lhs: this,
      rhs: rhs,
    });
  }
  /** join with another clause using or */
  or(rhs: Condition): Condition {
    return new BinaryOpt({
      opt: "or",
      lhs: this,
      rhs: rhs,
    });
  }
  /** return the negation of the current clause */
  not(): Condition {
    return new Not({ condition: this });
  }
  constructor(data?: any) {
    Object.assign(this, data);
  }
}

/**
 * A condition that operates on a column\
 * Please use the builder function to generate a new object
 */
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

/**
 * Negation of a clause\
 * Please use the builder function to generate a new object
 */
export class Not extends Condition {
  condition: Condition;
}

/**
 * Joint of two clauses\
 * Please use the builder function to generate a new object
 */
export class BinaryOpt extends Condition {
  static readonly validOpts = ["and", "or"];
  opt: string;
  lhs: Condition;
  rhs: Condition;
}

/** Creates builder of ColumnCondition given opt code */
function conditionBuilder(opt: string) {
  return (column: string, value: string) =>
    new ColumnCondition({
      opt: opt,
      column: column,
      value: value,
    });
}

/**
 * Create a new query
 * @param targetClass class of the object to query
 * @param condition search query
 */
export function query(targetClass: Function, condition: Condition): Query {
  return new Query({
    targetClass: targetClass.name,
    condition: condition,
  });
}
/** Create negation of a condition */
export const not = (c: Condition) => new Not(c);
/** Column equals a value (number, string) */
export const equals = conditionBuilder("==");
/** Column does not equal to a value (number, string) */
export const notEquals = conditionBuilder("!=");
/** Column starts with a string (string) */
export const startsWith = conditionBuilder("startsWith");
/** Column ends with a string (string) */
export const endsWith = conditionBuilder("endsWith");
/** Column contains a string (string) */
export const contains = conditionBuilder("contains");
/** Column greater than a value (number) */
export const greaterThan = conditionBuilder(">");
/** Column less than a value (number) */
export const lessThan = conditionBuilder("<");
/** Column greater than or equal to a value (number) */
export const greaterOrEq = conditionBuilder(">=");
/** Column less than or equal to a value (number) */
export const lessOrEq = conditionBuilder("<=");
