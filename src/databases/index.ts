import { config } from "..";
import initQuickDB from "./quickdb/start";

export default function startAllDatabases() {
  if (config.lowdb) {
    initQuickDB();
  }
  if (config.MySQL) {
    // mysql
  }
  if (config.mongoDB) {
    // mongodb
  }
}
