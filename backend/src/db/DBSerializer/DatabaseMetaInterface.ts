import { ITask, as } from "pg-promise";

/**
 * An interface for Database Serializer.
 * Created so that the ClassDatabaseMeta does not
 * rely on ClassDatabaseSerializer
 */
export abstract class IClassDatabaseSerializer {

  /**
   * A database Task object to support doing multiple
   * queries in one transaction.
   * Automatically roll back if failed
   */
  tx: ITask<{}>;

  constructor(task: ITask<{}>) {
    this.tx = task;
  }

  async create(obj: any, parent?: any, className?: string): Promise<any> {}

  async read() {}

  async delete() {}
}

/** Meta information about how a class is stored in the database */
export class ClassDatabaseMetaType {

  /** Table that stores the class */
  table: string;

  /**
   * Meta information of how each field is stored.
   * All fields in ClassMeta are by default handled by `just`
   */
  fields: { [id: string]: FieldDatabaseMetaType };

  /**
   * Serializer override for this class.
   * Default serializer is GenericDatabaseSerializer
   */
  serializer?: new (tx: ITask<{}>) => IClassDatabaseSerializer;

  /** An id on the object that can uniquely identify it */
  pk?: string;

  /**
   * If the class has subclasses then the real class
   * info is stored in this class
   */
  classColumn?: string;

  /** Map from the value of the `classColumn` to the real class */
  classMapper?: { [id: string]: new () => any };
}

/**
 * Contains information of how an attribute is serialized
 */
export abstract class FieldDatabaseMetaType {
  /**
   * Serialize to database
   * @param id normally the attribute name on the object
   * @param from the object to serialize
   * @param to the database serialization intermidiate object
   */
  toSQL(id: string, from: any, to: any) {}
  /***
   * Serialize from database
   * @param id normally the attribute name on the object
   * @param from the database serialization intermidiate object
   * @param to the resulting object
   */
  fromSQL(id: string, from: any, to: any) {}
}

/** The attribute is transitent, do not save or load from database */
export class Nothing extends FieldDatabaseMetaType {}
/** The attribute is transitent, do not save or load from database */
export const nothing = new Nothing();

/** Serialize the attribute as is */
export class Just extends FieldDatabaseMetaType {
  toSQL(id: string, from: any, to: any) {
    if (from && from[id] != null) to[id] = from[id];
  }
  fromSQL(id: string, from: any, to: any) {
    if (from && from[id] != null) to[id] = from[id];
  }
}
/** Serialize the attribute as is */
export const just = new Just();

/** Serilize the attribute to another field */
export class Remap extends FieldDatabaseMetaType {
  ref: string;
  toSQL(id: string, from: any, to: any) {
    if (from && from[id] != null) to[this.ref] = from[id];
  }
  fromSQL(id: string, from: any, to: any) {
    if (from && from[this.ref] != null) to[id] = from[this.ref];
  }
  constructor(column: string) {
    super();
    this.ref = column;
  }
}
/** Serilize the attribute to another field */
export function remap(ref: string): Remap {
  return new Remap(ref);
}

/** The attribute references another object */
export abstract class Ref extends FieldDatabaseMetaType {
  /** generate the condition to query the */
  genCondition(id: string, parent: any): string {
    return "1 = 1";
  }
}

/** This field references a field on the child of this field */
export class ChildRef extends Ref {
  ref: string;
  genCondition(id: string, parent: any): string {
    return as.format(`${this.ref} = $(${id})`, parent);
  }
  // In the case of ChildRef, from is the child
  toSQL(id: string, from: any, to: any) {
    if (from && from[this.ref] != null) to[id] = from[this.ref];
  }
  fromSQL(id: string, from: any, to: any) {}
  constructor(column: string) {
    super();
    this.ref = column;
  }
}
/** This field references a field on the child of this field */
export function childRef(ref: string): ChildRef {
  return new ChildRef(ref);
}

/** Child of this field references a field on this object */
export class RefForChild extends Ref {
  from: string;
  to: string;
  genCondition(id: string, parent: any): string {
    return as.format(`${this.to} = $(${this.from})`, parent);
  }
  toSQL(id: string, from: any, to: any) {
    if (from && from[id] != null) {
      [from[id]].flat(1).map((o) => {
        o[this.to] = from[this.from];
      });
    }
  }
  fromSQL(id: string, from: any, to: any) {}
  constructor(from: string, to: string) {
    super();
    this.from = from;
    this.to = to;
  }
}
/** Child of this field references a field on this object */
export function refForChild(from: string, to: string): RefForChild {
  return new RefForChild(from, to);
}
