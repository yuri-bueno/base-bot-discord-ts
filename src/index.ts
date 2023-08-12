import { ExtendedClient } from "./structs/ExtendedClient";
export * from "colors";
import config from "./config.json";
import startAllDatabases from "./databases";

const client = new ExtendedClient();

client.start();

export { client, config };

client.on("ready", () => {
  startAllDatabases();
});
