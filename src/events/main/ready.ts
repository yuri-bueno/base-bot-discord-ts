import { Event } from "../../structs/types/Events";
import { client } from "../..";

export default new Event({
  name: "ready",
  once: true,
  run() {
    const { commands, buttons, selects, modals, user } = client;
    process.stdout.write("\x1Bc");
    console.log(`Bot ${`${user?.username}`.bold} online`.green);
    console.log(`Commands loaded: ${commands.size}`.cyan);
    console.log(`Buttons loaded: ${buttons.size}`.cyan);
    console.log(`Select Menus loaded: ${selects.size}`.cyan);
    console.log(`Modals loaded: ${modals.size}`.cyan);
  },
});
