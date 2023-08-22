import { config } from "..";
import initQuickDB from "./quickdb/start";
import initMySQLDB from "./mysql/start";

export default function startAllDatabases() {
  if (config.lowdb) {
    initQuickDB();
  }
  if (config.MySQL) {
    // initMySQLDB();
  }
  if (config.mongoDB) {
    // mongodb
  }
}
