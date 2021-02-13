import * as promise from "bluebird"; // best promise library today
import * as dbConfig from "./db-config.json"; // db connection details
import pgPromise from "pg-promise"; // pg-promise core library
import { IInitOptions, IDatabase, IMain } from "pg-promise";
import { IExtensionsDB, SDCFormDAL } from "../services";

type ExtendedProtocol = IDatabase<IExtensionsDB> & IExtensionsDB;

// pg-promise initialization options:
const initOptions: IInitOptions<IExtensionsDB> = {
  // Using a custom promise library, instead of the default ES6 Promise:
  promiseLib: promise,

  // Extending the database protocol with our custom repositories;
  // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
  extend(obj: ExtendedProtocol, dc: any) {
    // Database Context (dc) is mainly needed for extending multiple databases with different access API.

    // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
    // which should be as fast as possible.
    obj.sdcForm = new SDCFormDAL(obj, pgp);
  },
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

// Creating the database instance with extensions:
const db: ExtendedProtocol = pgp(dbConfig);

// Alternatively, you can get access to pgp via db.$config.pgp
// See: https://vitaly-t.github.io/pg-promise/Database.html#$config
export { db, pgp };
