import { Command } from "./../../structs/types/Command";
import { ApplicationCommandType } from "discord.js";

export default new Command({
  name: "ping",
  description: "informações sobre a latencia do bot",
  type: ApplicationCommandType.ChatInput,
  run({ client, interaction }) {
    interaction.reply({ ephemeral: true, content: "pong" });
  },
});
