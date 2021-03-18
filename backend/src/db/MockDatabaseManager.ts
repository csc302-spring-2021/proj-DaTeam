import { GenericDatabaseManager } from "./DatabaseManager";
import { SearchParam } from "./DBSerializer/DatabaseMetaInterface";
import { GenericJsonSerializer as serializer } from "@dateam/shared";
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

  /**
   * Save an object into the database, return its primary key if defined
   * @param obj object to store
   * @param targetClass object class
   */
  async genericCreate(obj: any, targetClass: new () => any): Promise<string> {
    if (!(obj instanceof targetClass)) {
      throw new Error("Input object is not " + targetClass.name);
    }
    if (!this.db.get(targetClass.name)) {
      this.db.set(targetClass.name, new Map());
    }
    let pk;
    if (obj.uid) {
      pk = obj.uid;
    } else {
      pk = uuid();
    }
    const serialized = serializer.encode(obj, targetClass);
    let innerDB = this.db.get(targetClass.name);
    innerDB.set(pk, serialized);
    this.db.set(targetClass.name, innerDB);
    return pk;
  }

  /**
   * Load an object from the database with the given primary key
   * @param pk key to search with
   * @param targetClass expected object class
   */
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

  /**
   * Load all objects matching the search criteria
   * @param targetClass expected object class
   * @param searchParam seach query (**the queries should be built within the server**)
   * @param partial whether or not the complete object structure should be rebuild
   */
  async genericSearch(
    targetClass: new () => any,
    searchParam: SearchParam,
    partial: boolean
  ): Promise<any> {
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

  /**
   * Delete an object from the database with the given primary key
   * @param pk key to search with
   * @param targetClass object class
   */
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
