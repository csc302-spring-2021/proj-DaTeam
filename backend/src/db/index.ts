import { databaseManager } from "./DatabaseManager";
export function initDB() {
  if (process.env.CI) return; // skip db init for CI test
  databaseManager.testConnection();
  databaseManager.testQuery();
}
