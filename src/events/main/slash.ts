import { Command } from "./../../structs/types/Command";
import { CommandInteractionOptionResolver } from "discord.js";

import { Event } from "../../structs/types/Events";
import { client, config } from "../..";

export default new Event({
  name: "interactionCreate",
  once: false,
  run(interaction) {
    if (interaction.isAutocomplete()) {
      const command = client.commands.get(interaction.commandName);
      if (!command || !command.autoComplete) return;

      command.autoComplete(interaction);
    }

    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      const options = interaction.options as CommandInteractionOptionResolver;

      command.run({ client, interaction, options, config });
      return;
    }
  },
});
