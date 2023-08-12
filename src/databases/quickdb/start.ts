import config from "..";
import { join } from "node:path";
import { QuickDB } from "quick.db";

const db = {
  users: new QuickDB<any>({ table: "users", filePath: join(__dirname, "database/users.sqlite") }),
  config: new QuickDB<any>({ table: "users", filePath: join(__dirname, "database/config.sqlite") }),
};

export default async function initQuickDB() {
  db.config.push("arroz", 2);
}
