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

  genPk(): string {
    let newPk = uuid();
    while (this.db.hasOwnProperty(newPk)) {
      newPk = uuid();
    }
    return newPk;
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
    const serialized = serializer.encode(obj, targetClass);
    let new_pk = this.genPk();
    this.db.set(new_pk, serialized);
    return new_pk;
  }

  /**
   * Load an object from the database with the given primary key
   * @param pk key to search with
   * @param targetClass expected object class
   */
  async genericRead(pk: string, targetClass: new () => any): Promise<any> {
    let result = this.db.get(pk);
    if (!result) {
      // If result is undefined
      throw new Error(`PK ${targetClass.name} does not exist in DB`);
    }
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
    throw new Error("genericSearch not implemented yet");
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
