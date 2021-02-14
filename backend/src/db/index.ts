import { databaseManager } from "./DatabaseManager";
export function initDB() {
  databaseManager.testConnection();
  databaseManager.testQuery();
}
