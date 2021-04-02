import { GenericDatabaseManager } from "./DatabaseManager";
import { GenericJsonSerializer as serializer, Query } from "@dateam/shared";
import { v4 as uuid } from "uuid";

/**
 * Mock Implementation of the Database Manager to be used by tests
 */
class MockDatabaseManager extends GenericDatabaseManager {
  protected db: Map<any, any>;

  constructor() {
    super();
    this.db = new Map();
  }

  async genericCreate(obj: any, targetClass: new () => any): Promise<string> {
    if (!(obj instanceof targetClass)) {
      throw new Error("Input object is not " + targetClass.name);
    }
    if (!this.db.get(targetClass.name)) {
      this.db.set(targetClass.name, new Map());
    }
    if (!obj.uid) obj.uid = uuid();
    const pk = obj.uid;
    const serialized = serializer.encode(obj, targetClass);
    let innerDB = this.db.get(targetClass.name);
    innerDB.set(pk, serialized);
    this.db.set(targetClass.name, innerDB);
    return pk;
  }

  async genericRead(pk: string, targetClass: new () => any): Promise<any> {
    let innerDB = this.db.get(targetClass.name);
    if (!innerDB) {
      // If result is undefined
      throw new Error(`PK ${targetClass.name} does not exist in DB`);
    }
    if (!innerDB.has(pk)) {
      throw new Error(
        `Specified PK for ${targetClass.name} does not exist in DB`
      );
    }
    let result = innerDB.get(pk);
    result = serializer.decode(result, targetClass);
    if (!(result instanceof targetClass)) {
      throw new Error("Output object is not " + targetClass.name);
    }
    return result;
  }

  async genericSearch(
    targetClass: new () => any,
    queryObject: Query.Query | null,
    partial: boolean
  ): Promise<any[]> {
    let ret: any = [];
    if (this.db.has(targetClass.name)) {
      this.db
        .get(targetClass.name)
        .forEach((value: any, key: any, map: Map<any, any>) => {
          ret.push(serializer.decode(value, targetClass));
        });
    }
    return ret;
  }

  async genericDelete(
    pk: string,
    targetClass: new () => any
  ): Promise<string | undefined> {
    throw new Error("genericDelete not implemented yet");
  }

  testConnection() {
    console.log("MockDatabaseManager is connected");
  }
}

export const databaseManager = new MockDatabaseManager();
