import { classMeta, Model, GenericJsonSerializer, Mocks } from "@dateam/shared";
import { classDatabaseMeta } from "./ClassDatabaseMeta";
import { Promise } from "bluebird";
import {
  IClassDatabaseSerializer,
  just,
  ChildRef,
  RefToChild,
} from "./DatabaseMetaInterface";
import { ITask } from "pg-promise";

/**
 * Basic serializer that assumes the database schema is the same as the object schema
 */
export class GenericDatabaseSerializer extends IClassDatabaseSerializer {
  static create(obj: any, tx: ITask<{}>): Promise<string> {
    return new GenericDatabaseSerializer(tx).findSerializer(obj).create(obj);
  }

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
        : new GenericDatabaseSerializer(this.tx);
    return serializer;
  }

  async create(obj: any, className?: string): Promise<string> {
    if (className == null) className = obj.constructor.name;
    const cm = classMeta[className!];
    if (cm == null) throw new Error(`${className} cannot be serialized`);
    const dm = classDatabaseMeta[className!];

    if (cm.super) {
      await this.findSerializer(cm.super.name).create(obj, cm.super.name);
    }
    if (!dm) return ""; // transient abstract class

    const childNodes: any[] = [];
    const dbObj: any = {};

    if (dm.classColumn) {
      for (let id in dm.classMapper) {
        if (dm.classMapper[id] === obj.constructor) {
          dbObj[dm.classColumn] = id;
          break;
        }
      }
    }

    for (let id of Object.keys(dm.fields)) {
      let dmField = dm.fields[id];
      if (dmField instanceof ChildRef) {
        const child = obj[id];
        if (child) await this.findSerializer(child).create(child);
        dmField.toSQL(id, child, dbObj);
      } else {
        dmField.toSQL(id, obj, dbObj);
      }
      if (dmField instanceof RefToChild) {
        childNodes.push(obj[id]);
      }
    }

    // Copy regular fields with just
    for (let id of Object.keys(cm.fields)) {
      if (dm.fields[id] == null) {
        just.toSQL(id, obj, dbObj);
      }
    }

    const keys = Object.keys(dbObj);
    let query = `INSERT INTO  ${dm.table}(${keys.join()}) VALUES(${keys
      .map((k) => `$(${k})`)
      .join()}) RETURNING ${dm.pk || null}`;
    const pk = await this.tx.one(query, dbObj);

    if (dm.pk) {
      let dmField = dm.fields[dm.pk];
      if (dmField == null) dmField = just;
      dmField.fromSQL(dm.pk, pk, obj);
    }

    await Promise.all(
      childNodes.flat(1).map((o) => this.findSerializer(o).create(o))
    );
    return pk[dm.pk!];
  }

  // async dbRead(pk: any): Promise<any> {
  //   let query = `SELECT * FROM ${this.table} WHERE ${this.pk} = $1`;
  //   return this.t.many(query, pk).then((r) => r.map(this.reconstruct));
  // }

  // async dbDelete(pk: any): Promise<any> {
  //   let query = `DELETE FROM ${this.table} WHERE ${this.pk} = $1`;
  //   return this.t.none(query, pk);
  // }
}

class AnswerDatabaseSerializer extends GenericDatabaseSerializer {
  async create(obj: any, className?: string): Promise<string> {
    await Promise.all(
      (obj as Model.SDCAnswer).responses.map((r) => {
        super.create(Object.assign({ response: r }, obj), "SDCAnswer");
      })
    );
    return "";
  }
}
classDatabaseMeta["SDCAnswer"].serializer = AnswerDatabaseSerializer;
