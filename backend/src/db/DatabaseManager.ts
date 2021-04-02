import pgPromise from "pg-promise";
import * as promise from "bluebird";
import { GenericDatabaseSerializer } from "./DBSerializer";
import { SearchParam, QueryObjectCompiler } from "./DBSerializer";
import { Query } from "@dateam/shared";

export class GenericDatabaseManager {
  constructor() {}
  /**
   * Save an object into the database, return its primary key if defined
   * @param obj object to store
   * @param targetClass object class
   */
  async genericCreate(obj: any, targetClass: new () => any): Promise<string> {
    throw new Error("genericCreate should be invoked by subclasses");
  }

  /**
   * Load an object from the database with the given primary key
   * @param pk key to search with
   * @param targetClass expected object class
   */
  async genericRead(pk: string, targetClass: new () => any): Promise<any> {
    throw new Error("genericRead should be invoked by subclasses");
  }

  /**
   * Load all objects matching the search criteria
   * @param targetClass expected object class
   * @param searchParam seach query (**the queries should be built within the server**)
   * @param partial whether or not the complete object structure should be rebuild
   */
  async genericSearch(
    targetClass: new () => any,
    queryObject: Query.Query | null,
    partial: boolean
  ): Promise<any[]> {
    throw new Error("genericSearch should be invoked by subclasses");
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
    throw new Error("genericDelete should be invoked by subclasses");
  }

  /**
   * Test to see if the dabase is correctly setup.
   * Exit the program with code 1 if failed
   */
  testConnection() {
    throw new Error("testConnection should be invoked by subclasses");
  }

  /**
   * Terminate the database connection immediately
   */
  endConnection() {}
}

/**
 * Connects with database and handle query requests
 */
class DatabaseManager extends GenericDatabaseManager {
  protected db: pgPromise.IDatabase<{}>;

  constructor() {
    super();
    const initOptions = {
      promiseLib: promise,
    };

    const pgp = pgPromise(initOptions);

    const cn = {
      host: process.env.DB_HOST || "",
      port: parseInt(process.env.DB_PORT || "") || 0,
      database: process.env.DB_DATABASE || "",
      user: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      connectionString: process.env.DATABASE_URL || "",
      ssl: process.env.DB_SSL == "true" ? { rejectUnauthorized: false } : false,
    };

    if (process.env.NODE_ENV === "development") {
      console.log(cn);
      const monitor = require("pg-monitor");
      monitor.attach(initOptions);
    }

    this.db = pgp(cn);
  }

  testConnection() {
    this.db
      .one("SELECT count(*) FROM " + process.env.DB_TEST_TABLE)
      .then(() => {
        console.log("Dabase is setup");
      })
      .catch((e) => {
        console.log(e);
        process.exit(1);
      });
  }

  endConnection() {
    this.db.$pool.end();
  }

  async genericCreate(obj: any, targetClass: new () => any): Promise<string> {
    if (!(obj instanceof targetClass)) {
      throw new Error("Input object is not " + targetClass.name);
    }
    return await this.db.tx((tx) => GenericDatabaseSerializer.create(obj, tx));
  }

  async genericRead(pk: string, targetClass: new () => any): Promise<any> {
    const result = await this.db.tx((tx) =>
      GenericDatabaseSerializer.read(pk, targetClass.name, tx)
    );
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
    const results = await this.db.tx((tx) =>
      GenericDatabaseSerializer.search(
        targetClass.name,
        queryObject
          ? QueryObjectCompiler.compile(queryObject)
          : new SearchParam(),
        partial,
        tx
      )
    );
    if (!results.every((o) => o instanceof targetClass)) {
      throw new Error("Output object is not " + targetClass.name);
    }
    return results;
  }

  async genericDelete(
    pk: string,
    targetClass: new () => any
  ): Promise<string | undefined> {
    return {} as any;
  }
}

export const databaseManager = new DatabaseManager();
