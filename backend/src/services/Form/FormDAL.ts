import { IDatabase, IMain } from "pg-promise";

import { Form } from "./Form";
import sql from "./sql";

export class FormDAL {
  /**
   * @param db
   * Automated database connection context/interface.
   *
   * If you ever need to access other repositories from this one,
   * you will have to replace type 'IDatabase<any>' with 'any'.
   *
   * @param pgp
   * Library's root, if ever needed, like to access 'helpers'
   * or other namespaces available from the root.
   */
  constructor(private db: IDatabase<any>, private pgp: IMain) {
    /*
          If your repository needs to use helpers like ColumnSet,
          you should create it conditionally, inside the constructor,
          i.e. only once, as a singleton.
        */
  }

  // Creates the table;
  /* TODO Replace with create table */
  async create(): Promise<null> {
    return this.db.none(sql.create);
  }

  /* TODO: replace with actual add */
  // Adds a new record and returns the full object;
  // It is also an example of mapping HTTP requests into query parameters;
  async add(values: { userId: number; name: string }): Promise<Form> {
    return this.db.one(sql.add, {
      userId: +values.userId,
      productName: values.name,
    });
  }

}
