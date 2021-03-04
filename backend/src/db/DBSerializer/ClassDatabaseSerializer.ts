import { classMeta, Model } from "@dateam/shared";
import { classDatabaseMeta } from "./ClassDatabaseMeta";
import { Promise } from "bluebird";
import {
  SearchParam,
  IClassDatabaseSerializer,
  FieldDatabaseMetaType,
  just,
  Ref,
  ChildRef,
  RefForChild,
} from "./DatabaseMetaInterface";
import { ITask, as } from "pg-promise";

/** A generic that can serialize most classes based on `ClassDatabaseMeta` */
export class GenericDatabaseSerializer extends IClassDatabaseSerializer {
  /**
   * Entry point to serialize **any** Domain Object
   * @param obj object to serialize
   * @param tx Database transaction task object
   */
  static create(obj: any, tx: ITask<{}>): Promise<string> {
    return new GenericDatabaseSerializer(tx).findSerializer(obj).create(obj);
  }

  /**
   * Load any domain object given primary key
   * @param pk primary key
   * @param className class of the object
   * @param tx database transaction task object
   */
  static async read(
    pk: string,
    className: string,
    tx: ITask<{}>
  ): Promise<any> {
    const dm = classDatabaseMeta[className];
    if (dm == null) {
      const cm = classMeta[className];
      if (cm && cm.super) {
        return GenericDatabaseSerializer.read(pk, cm.super.name, tx);
      } else {
        throw new Error(`${className} cannot be serialized`);
      }
    }
    if (!dm.pk) {
      throw new Error(
        `Read by pk is not supported for class ${className}`
      );
    }
    const seachParam: SearchParam = {};
    seachParam[className] = [as.format(`${dm.table}.${dm.pk} = $1`, pk)];
    const result = await new GenericDatabaseSerializer(tx)
      .findSerializer(className)
      .read(className, seachParam);
    if (result.length !== 1) {
      throw new Error(`Expecting 1 result for read but got ${result.length}`);
    }
    return result[0];
  }

  /**
   * Load all objects matching the search criteria
   * @param className class of the object
   * @param seachParam seach criteria
   * @param partial whether or not the complete object structure should be rebuild
   * @param tx database transaction task object
   */
  static async search(className: string, seachParam: SearchParam, partial: boolean, tx: ITask<{}>): Promise<any[]>{
    return await new GenericDatabaseSerializer(tx, !partial)
    .findSerializer(className)
    .read(className, seachParam)
  }

  /**
   * Find the appropriate serializer for the given class or object\
   * Default is `GenericDatabaseSerializer`
   * @param targetClass name of the class or the object
   */
  protected findSerializer(
    targetClass: string | Object
  ): IClassDatabaseSerializer {
    const className =
      typeof targetClass === "string"
        ? targetClass
        : targetClass.constructor.name;
    const dm = classDatabaseMeta[className];
    const serializer =
      dm && dm.serializer
        ? new dm.serializer(this.tx)
        : new GenericDatabaseSerializer(this.tx, this.recursion);
    return serializer;
  }

  /**
   * Return a tuple of id to FieldDatabaseMetaType for all
   * attributes and database columns on the object
   * @param className name of the class to be serialized
   */
  protected dmFields(className: string): [string, FieldDatabaseMetaType][] {
    const cm = classMeta[className];
    const dm = classDatabaseMeta[className];
    if (dm == null) return [];
    const fields = Object.keys(cm.fields);
    Object.keys(dm.fields).forEach((k) => {
      if (!fields.includes(k)) fields.push(k);
    });
    return fields.map((id) =>
      dm.fields[id] == null ? [id, just] : [id, dm.fields[id]]
    );
  }

  async create(obj: any, className?: string): Promise<string> {
    if (className == null) className = obj.constructor.name;
    const cm = classMeta[className!];
    if (cm == null) throw new Error(`${className} cannot be serialized`);
    const dm = classDatabaseMeta[className!];

    if (cm.super) {
      // save the super class table first
      await this.findSerializer(cm.super.name).create(obj, cm.super.name);
    }
    if (!dm) return ""; // transient abstract class that has no table

    const childNodes: any[] = []; // children that needs to be serialized next
    const dbObj: any = {}; // serialization intermediate object

    // populate the class information if the table needs it
    if (dm.classColumn) {
      for (let id in dm.classMapper) {
        if (dm.classMapper[id] === obj.constructor) {
          dbObj[dm.classColumn] = id;
          break;
        }
      }
    }

    for (let [id, dmField] of this.dmFields(className!)) {
      if (dmField instanceof ChildRef && this.recursion && obj[id]) {
        await this.findSerializer(obj[id]).create(obj[id]);
      }
      dmField.toSQL(id, obj, dbObj);
      if (dmField instanceof RefForChild) {
        childNodes.push(obj[id]); // call save recursively later
      }
    }

    // save the intermediate object into the database
    // with the attributes as columns
    const keys = Object.keys(dbObj);
    let query = `INSERT INTO  ${dm.table}(${keys.join()}) VALUES(${keys
      .map((k) => `$(${k})`)
      .join()}) RETURNING ${dm.pk || null}`;
    const pk = await this.tx.one(query, dbObj);

    // if pk is defined, set it on the object so that the children can reference it
    if (dm.pk) {
      let dmField = dm.fields[dm.pk];
      if (dmField == null) dmField = just;
      dmField.fromSQL(dm.pk, pk, obj);
    }

    // an attribute needed by the child may be just generated by the database
    for (let [id, dmField] of this.dmFields(className!)) {
      if (dmField instanceof RefForChild) {
        dmField.toSQL(id, obj, dbObj);
      }
    }

    if (this.recursion) {
      await Promise.all(
        childNodes.flat(1).map((o) => this.findSerializer(o).create(o))
      );
    }
    return pk[dm.pk!];
  }

  async read(className: string, seachParam: SearchParam): Promise<any[]> {
    const result = await this._read(className, seachParam);
    if (result == null)
      throw new Error(`${className} not defined in classDatabaseMeta`);
    return result;
  }

  /**
   * Run the search query
   */
  protected async _read(
    className: string,
    seachParam: SearchParam
  ): Promise<any[] | null> {
    const dm = classDatabaseMeta[className];
    const cm = classMeta[className];
    if (cm == null) throw new Error(`${className} not defined in classMeta`);
    // add the current class into tables to join
    if (dm && seachParam[className] == null) seachParam[className] = [];
    // The search and building process must start
    // from the top level where dm is not null
    if (cm.super) {
      const result = await this.findSerializer(cm.super.name).read(
        cm.super.name,
        seachParam
      );
      if (result != null) return result;
    }
    if (dm == null) return null;

    const tables: string[] = [];
    let conditions: string[] = [];

    for (let id of Object.keys(seachParam)) {
      let dmi = classDatabaseMeta[id];
      conditions = conditions.concat(seachParam[id]);
      if (dmi.pk && dmi != dm) {
        // dm must be a super class, dm.pk is not null
        conditions.push(`${dmi.table}.${dmi.pk} = ${dm.table}.${dm.pk}`);
      }
      tables.push(dmi.table);
    }

    const query = `SELECT * FROM ${tables.join()}${
      conditions.length
        ? ` WHERE ${conditions.map((o) => `(${o})`).join(" AND ")}`
        : ""
    }`;
    const results = await this.tx.any(query);

    return await Promise.all(
      results.map((o) =>
        this.findSerializer(className).build(
          o,
          className,
          Object.keys(seachParam)
        )
      )
    );
  }

  /**
   * the build process is broken up into two parts
   * recurse down: given the query result, find the actual class of the object
   * recurse up  : with the right class, fill in all parameters
   * e.g. child extends middle extends super:
   *     super (enter)    super (return)
   *        \              /
   *         \          middle (fill in)
   *          \          /
   *        child (construct)
   * (recurse down) (recurse up)
   */

  async build(
    dbObj: any,
    className: string,
    queriedClasses: string[]
  ): Promise<any> {
    const dm = classDatabaseMeta[className];
    const cm = classMeta[className];

    // do the query necessary for this class level
    if (dm){
      if (!queriedClasses.includes(className)) {
        const sdm = classDatabaseMeta[queriedClasses[0]];
        const query = `SELECT * FROM ${dm.table} WHERE ${dm.pk} = $(${sdm.pk})`;
        Object.assign(dbObj, await this.tx.one(query, dbObj));
        queriedClasses.push(className);
      }
      for (let [id, dmField] of this.dmFields(className)){
        dmField.restoreCase(id, dbObj)
      }
    }

    // reconstruct the class
    if (dm && dm.classMapper) {
      for (let id of Object.keys(dm.classMapper)) {
        const subclassName = dm.classMapper[id].name;
        // database is not case sensitive
        if (id === dbObj[dm.classColumn!.toLocaleLowerCase()]) {
          return await this.findSerializer(subclassName).build(
            dbObj,
            subclassName,
            queriedClasses
          );
        }
      }
      throw new Error(`Cannot find class for type ${dbObj[dm.classColumn!]}`);
    } else if (cm.construct != null) {
      const result = new cm.construct();
      await this.buildUp(result, dbObj, className, queriedClasses);
      return result;
    } else {
      throw new Error(`${className} cannot be constructed`);
    }
  }

  async buildUp(
    baseObj: any,
    dbObj: any,
    className: string,
    queriedClasses: string[]
  ): Promise<void> {
    const dm = classDatabaseMeta[className];
    const cm = classMeta[className];

    if (dm) {
      // do the query necessary for this class level
      if (!queriedClasses.includes(className)) {
        const sdm = classDatabaseMeta[queriedClasses[0]];
        const query = `SELECT * FROM ${dm.table} WHERE ${dm.pk} = $(${sdm.pk})`;
        Object.assign(dbObj, await this.tx.one(query, dbObj));
        queriedClasses.push(className);
      }
      for (let [id, dmField] of this.dmFields(className)){
        dmField.restoreCase(id, dbObj)
      }

      for (let [id, dmField] of this.dmFields(className)) {
        const cmField = cm.fields[id];
        dmField.fromSQL(id, dbObj, baseObj);
        // reconstruct children
        if (this.recursion && dmField instanceof Ref) {
          // cmField.generic!.name is the actual class of the child
          // dmField.childClass is the class where the `to` attribute is defined
          const childClass = cmField.generic!.name;
          const searchParam: SearchParam = {};
          searchParam[dmField.refClass.name] = [
            as.format(
              `${classDatabaseMeta[dmField.refClass.name].table}.${
                dmField.to
              } = $(${dmField.from})`,
              dbObj
            ),
          ];
          const result = await this.findSerializer(childClass).read(
            childClass,
            searchParam
          );
          if (dmField instanceof ChildRef) {
            if (result.length > 1) {
              throw new Error(
                `Expecting 1 or 0 result for ${className}.${id} but got ${result.length}`
              );
            }
            baseObj[id] = result[0];
          } else {
            baseObj[id] = result;
          }
        }
      }
    }

    if (cm.super) {
      await this.findSerializer(cm.super.name).buildUp(
        baseObj,
        dbObj,
        cm.super.name,
        queriedClasses
      );
    }
  }
}

/**
 * Override serialization for SDCAnswer
 * This is because an SDCAnswer may be broken down into multiple rows
 */
class AnswerDatabaseSerializer extends GenericDatabaseSerializer {
  async create(obj: any, className?: string): Promise<string> {
    await Promise.all(
      (obj as Model.SDCAnswer).responses.map((r) => {
        super.create(Object.assign({ response: r }, obj), "SDCAnswer");
      })
    );
    return "";
  }

  /**
   * Merge multiple records into one
   * if they have the same questionID and responseId
   */
  async read(className: string, seachParam: SearchParam): Promise<any[]> {
    const result = await super.read(className, seachParam);
    const map: { [id: string]: Model.SDCAnswer } = {};
    result.forEach((o) => {
      if (o.responseId == null || o.questionID == null || o.response == null) {
        throw new Error("Output object is not SDCAnswer");
      }
      const key = o.responseId + o.questionID;
      if (map[key] == null) map[key] = new Model.SDCAnswer({ questionID: o.questionID });
      map[key].responses.push(o.response);
    });
    return Object.values(map);
  }
}
classDatabaseMeta["SDCAnswer"].serializer = AnswerDatabaseSerializer;
