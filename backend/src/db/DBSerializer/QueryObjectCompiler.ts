import { Query, classMeta } from "@dateam/shared";
import { classDatabaseMeta } from "./ClassDatabaseMeta";
import { SearchParam, Just, Remap } from "./DatabaseMetaInterface";
import { as } from "pg-promise";

export class QueryObjectCompiler {
  protected readonly className: string;

  /** className to list of used columns */
  protected readonly usedColumns: { [className: string]: string[] } = {};

  /** if raw is true, assume input search param already has correct column mapping */
  protected readonly raw;

  /** operators that can be used directly */
  protected static directOpt = ["=", "<>", ">", "<", ">=", "<="];

  /** operators for `like` */
  protected static likeOpt = ["startsWith", "endsWith", "contains"];

  constructor(className: string, raw: boolean) {
    this.className = className;
    this.raw = raw;
  }

  static compile(queryObject: Query.Query, raw: boolean = false): SearchParam {
    const compiler = new QueryObjectCompiler(queryObject.targetClass, raw);
    const result = new SearchParam();
    result.query = compiler.compile(queryObject.condition);
    result.usedColumns = compiler.usedColumns;
    return result;
  }

  protected compile(condition: Query.Condition): string {
    if (condition instanceof Query.Not) {
      return `not (${this.compile(condition.condition)})`;
    } else if (condition instanceof Query.BinaryOpt) {
      return `(${this.compile(condition.lhs)}) ${condition.opt} (${this.compile(
        condition.rhs
      )})`;
    } else if (condition instanceof Query.ColumnCondition) {
      const [column, value] = this.parseColumn(
        condition.column,
        this.className,
        condition.value
      );
      if (QueryObjectCompiler.directOpt.indexOf(condition.opt) != -1) {
        return as.format(`${column} ${condition.opt} $1`, value);
      }
      if (QueryObjectCompiler.likeOpt.indexOf(condition.opt) != -1) {
        if (typeof value != "string") {
          throw new Error(condition.opt + " must be used on string");
        }
        let escapedValue = value.split("%").join("\\%").split("_").join("\\_");
        switch (condition.opt) {
          case "startsWith":
            escapedValue += "%";
            break;
          case "endsWith":
            escapedValue = "%" + escapedValue;
            break;
          case "contains":
            escapedValue = "%" + escapedValue + "%";
            break;
        }
        return as.format(column + " like $1", escapedValue);
      }
      throw new Error("Compiler does not support " + condition.opt);
    } else {
      throw new Error(
        "Compiler does not support " + condition.constructor.name
      );
    }
  }

  protected parseColumn(
    attribute: string,
    className: string,
    value: string
  ): [string, any] {
    const dm = classDatabaseMeta[className];
    const cm = classMeta[className];
    if (this.raw) {
      if (!dm) throw new Error("Cannot compile " + className);
      if (!this.usedColumns[className]) this.usedColumns[className] = [];
      if (this.usedColumns[className].indexOf(attribute) == -1) {
        this.usedColumns[className].push(attribute);
      }
      return [`${dm.table}.${attribute}`, value];
    }
    if (!dm || !cm.fields[attribute]) {
      if (cm.super) return this.parseColumn(attribute, cm.super.name, value);
      throw new Error("Cannot compile " + className);
    }
    let column = attribute;
    const mapper = dm.fields[attribute];
    if (mapper) {
      if (mapper instanceof Remap) {
        column = mapper.ref;
      } else if (!(mapper instanceof Just)) {
        throw new Error(`Cannot compile ${className}.${attribute}`);
      }
    }
    if (!this.usedColumns[className]) this.usedColumns[className] = [];
    if (this.usedColumns[className].indexOf(column) == -1) {
      this.usedColumns[className].push(column);
    }
    let parsed: any;
    switch (cm.fields[attribute].type) {
      case String:
        parsed = value;
        break;
      case Number:
        if (!/^[+-]?([0-9]*[.])?[0-9]+$/.test(value)) {
          throw new Error(value + " is not a valid number");
        }
        parsed = parseFloat(value);
        break;
      case Boolean:
        parsed = value === "true";
        if (!parsed && value !== "false") {
          throw new Error(value + " is not a valid bool");
        }
        break;
    }
    return [`${dm.table}.${column}`, parsed];
  }
}
