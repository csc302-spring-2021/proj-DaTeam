import pgPromise from "pg-promise";
import * as promise from "bluebird";

class DatabaseManager {
  protected db: pgPromise.IDatabase<{}>;

  constructor() {
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
      .connect()
      .then((obj) => obj.done())
      .catch((e) => {
        console.log(e);
        process.exit(1);
      });
  }

  testQuery() {
    this.db
      .one("select count(*) from item")
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  }
}

export const databaseManager = new DatabaseManager();
