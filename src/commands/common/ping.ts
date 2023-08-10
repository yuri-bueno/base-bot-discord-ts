import { Command } from "./../../structs/types/Command";
import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  Collection,
} from "discord.js";

export default new Command({
  name: "ping",
  description: "informações sobre a latencia do bot",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "cor",
      required: true,
      description: "escolha uma cor",
      type: ApplicationCommandOptionType.String,
      choices: [{ name: "red", value: "vermelho" }],
    },
  ],
  run({ client, interaction, options, config }) {
    let color = options.getString("cor");

    if (!color) return;

    const button1 = new ButtonBuilder({ custom_id: "atualizar", label: "clica aqui", style: ButtonStyle.Success });

    const row = new ActionRowBuilder<ButtonBuilder>({ components: [button1] });

    interaction.reply({ ephemeral: false, content: color.toString(), components: [row] });
  },
  buttons: new Collection([
    [
      "atualizar",
      async (interaction) => {
        interaction.update({ components: [] });
      },
    ],
  ]),
});
