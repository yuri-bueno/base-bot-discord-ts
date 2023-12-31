import {
  Client,
  Partials,
  IntentsBitField,
  BitFieldResolvable,
  GatewayIntentsString,
  Collection,
  ApplicationCommandDataResolvable,
  ClientEvents,
  REST,
  Routes,
} from "discord.js";

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { CommandType, ComponentsButton, ComponentsModal, ComponentsSelect } from "./types/Command";
import { EventType } from "./types/Events";
import { client, config } from "..";
import AnimationLoading from "../util/loading";
dotenv.config();

const fileCondition = (fileName: string) => fileName.endsWith(".ts") || fileName.endsWith(".js");

export class ExtendedClient extends Client {
  public commands: Collection<string, CommandType> = new Collection();
  public buttons: ComponentsButton = new Collection();
  public selects: ComponentsSelect = new Collection();
  public modals: ComponentsModal = new Collection();

  constructor() {
    super({
      intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
      ],
    });
  }

  public start() {
    this.registeModules();
    this.RegisterEvents();
    this.login(process.env.BOT_TOKEN);
  }
  private registerCommands(commands: Array<ApplicationCommandDataResolvable>) {
    this.application?.commands
      .set(commands)
      .then(() => {
        console.log(`${"[ON]".green.bold} SlashCommands definidos`);
      })
      .catch((error) => {
        console.log(`${"[error]".bgRed} um erro foi encontrado enquanto definia os SlashCommands ${error}`.red);
      });
  }

  private registeModules() {
    const SlashCommands: Array<ApplicationCommandDataResolvable> = new Array();

    const CommandPath = path.join(__dirname, "..", "commands");

    fs.readdirSync(CommandPath).forEach((local) => {
      fs.readdirSync(CommandPath + `/${local}/`)
        .filter(fileCondition)
        .forEach(async (fileName) => {
          const command: CommandType = (await import(`../commands/${local}/${fileName}`))?.default;
          const { name, buttons, selects, modals } = command;

          if (name) {
            this.commands.set(name, command);

            //TODO VER ESSE GUILDS
            if (config.guild.only) command.guild_ids = config.guild.id;

            SlashCommands.push(command);

            if (buttons) buttons.forEach((run, key) => this.buttons.set(key, run));
            if (selects) selects.forEach((run, key) => this.selects.set(key, run));
            if (modals) modals.forEach((run, key) => this.modals.set(key, run));
          }
        });
    });

    this.on("ready", async () => {
      if (!config.isDeploy) return this.registerCommands(SlashCommands); // TODO LEMBRAR DE ATIVAR ISSO

      if (!client.user?.id) return;
      if (!process.env.BOT_TOKEN) return;

      const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

      const animator = new AnimationLoading();
      animator.startAnimation("Deletando...");
      await rest
        .put(Routes.applicationCommands(client.user.id), { body: [] })
        .then(() => {
          animator.stopAnimation();
          console.log("[UPDATE]".green, "Comandos de barra excluídos com sucesso!");
        })
        .catch(console.error);

      animator.startAnimation("atualizando...");
      await rest
        .put(Routes.applicationCommands(client.user.id), {
          body: SlashCommands,
        })
        .then(() => {
          animator.stopAnimation();
          console.log("[UPDATE]".green, `Comandos de barra registrados com sucesso!`);
        })
        .catch((e) => console.log(e));
    });
  }
  private RegisterEvents() {
    const eventsPath = path.join(__dirname, "..", "events");

    fs.readdirSync(eventsPath).forEach((local) => {
      fs.readdirSync(`${eventsPath}/${local}`)
        .filter(fileCondition)
        .forEach(async (fileName) => {
          const { name, once, run }: EventType<keyof ClientEvents> = (await import(`../events/${local}/${fileName}`))
            ?.default;

          try {
            if (name) once ? this.once(name, run) : this.on(name, run);
          } catch (error) {
            console.log(`${"[ERROR]".bgRed} erro ao carregar o evento: ${name} \n${error}`.red);
          }
        });
    });
  }
}
