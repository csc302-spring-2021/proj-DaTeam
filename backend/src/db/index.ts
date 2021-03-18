import { GenericDatabaseManager } from "./DatabaseManager";
import { databaseManager as db } from "./DatabaseManager";
import { databaseManager as mockDb } from "./MockDatabaseManager";

let databaseManager: GenericDatabaseManager;
if (process.env.NODE_ENV === "test") {
  databaseManager = mockDb;
} else {
  databaseManager = db;
}
export { databaseManager };
