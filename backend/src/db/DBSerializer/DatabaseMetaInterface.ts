import { ITask } from "pg-promise";

/**
 * Map from class name to query conditions
 * where conditions are related to the attributes of that class
 */
export type SearchParam = { [className: string]: string[] };

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
  /**
   * Determine if database operation should advance into children \
   * Recursion into super/sub class is not effected
   */
  recursion: boolean;

  constructor(task: ITask<{}>, recursion?: boolean) {
    this.tx = task;
    this.recursion = recursion == null ? true : recursion;
  }

  /**
   * Recursively save the obj into the database
   * @param obj Object to save
   * @param className Save as the given class
   */
  async create(obj: any, parent?: any, className?: string): Promise<any> {}

  /**
   * Recursively load the objects from the database
   * @param className Class of the object trying to load
   * @param seachParam Search criteria
   */
  async read(className: string, seachParam: SearchParam): Promise<any[]> {
    return [];
  }

  /**
   * Given the database intermediate object (partial result),
   * reconstruct the object with the correct class.
   * The initial call should be called with `className`
   * being the root class where `classDatabaseMeta` is not null
   * @param obj
   * @param className
   * @param queriedClasses
   */
  async build(
    obj: any,
    className: string,
    queriedClasses: string[]
  ): Promise<any> {}

  /**
   * Given the base object and the partial
   * database intermediate object,
   * populate all attributes on the object.
   * The initial call should be called with `className`
   * being the leave class
   * @param baseObj
   * @param dbObj
   * @param className
   * @param queriedClasses
   */
  async buildUp(
    baseObj: any,
    dbObj: any,
    className: string,
    queriedClasses: string[]
  ): Promise<any> {}
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
  /**
   * Dabase is not case sensitive, so all the attributes are lowercase\
   * Restore the correct case for the attribute
   * @param dbObj
   */
  restoreCase(id: string, dbObj: any) {
    const idLower = id.toLocaleLowerCase();
    if (idLower !== id && dbObj[idLower] !== undefined) {
      dbObj[id] = dbObj[idLower];
      delete dbObj[idLower];
    }
  }
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
  restoreCase(id: string, dbObj: any) {
    super.restoreCase(this.ref, dbObj);
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
  refClass: Function;
  from: string;
  to: string;
  restoreCase(id: string, dbObj: any) {
    super.restoreCase(this.from, dbObj);
  }
  constructor(from: string, refClass: Function, to: string) {
    super();
    this.from = from;
    this.refClass = refClass;
    this.to = to;
  }
}

/**
 * This field stores a child where
 * the `from` column on this object
 * references the `to` column on the child
 */
export class ChildRef extends Ref {
  toSQL(id: string, from: any, to: any) {
    if (from && from[id] != null && from[id][this.to] != null) {
      to[this.from] = from[id][this.to];
    }
  }
}
/**
 * This field stores a child where
 * the `from` column on this object
 * references the `to` column on the child
 */
export function childRef(
  from: string,
  refClass: Function,
  to: string
): RefForChild {
  return new ChildRef(from, refClass, to);
}

/**
 * This field stores a child or a list of children where
 * the `to` column on the children
 * references the `from` column on this object
 */
export class RefForChild extends Ref {
  toSQL(id: string, from: any, to: any) {
    if (from && from[id] != null) {
      [from[id]].flat(1).map((o) => {
        o[this.to] = from[this.from];
      });
    }
  }
}
/**
 * This field stores a child or a list of children where
 * the `to` column on the children
 * references the `from` column on this object
 */
export function refForChild(
  from: string,
  refClass: Function,
  to: string
): RefForChild {
  return new RefForChild(from, refClass, to);
}
