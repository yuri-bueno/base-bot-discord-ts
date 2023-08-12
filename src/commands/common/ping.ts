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
      //   choices: [{ name: "red", value: "vermelho" }],
      autocomplete: true,
    },
  ],
  async autoComplete(interaction) {
    const focused = interaction.options.getFocused(true);

    if (focused.name) {
      let colors = [
        { name: "vermelho", value: "red" },
        { name: "azul", value: "blue" },
        { name: "verde", value: "green" },
        { name: "amarelo", value: "yellow" },
        { name: "roxo", value: "purple" },
        { name: "laranja", value: "orange" },
        { name: "rosa", value: "pink" },
        { name: "preto", value: "black" },
        { name: "branco", value: "white" },
        { name: "cinza", value: "gray" },
      ];

      const dono = interaction.user.id == "1298467016796012544";

      if (!dono) {
        colors = [{ name: "sem acesso", value: "null" }];
      }

      const filtered = colors.filter((color) => color.name.toLowerCase().includes(focused.value.toLowerCase()));

      interaction.respond(filtered.slice(0, 25));
    }
  },
  run({ client, interaction, options, config }) {
    let color = options.getString("cor", true);

    const button1 = new ButtonBuilder({ custom_id: "atualizar", label: "clica aqui", style: ButtonStyle.Success });

    const row = new ActionRowBuilder<ButtonBuilder>({ components: [button1] });

    interaction.reply({ ephemeral: false, content: client.ws.ping + color.toString(), components: [row] });
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
