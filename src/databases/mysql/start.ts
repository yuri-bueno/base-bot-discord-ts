// // import { Sequelize, DataTypes, Model } from "sequelize";

// export default async () => {
//   const database = process.env.DATABASE_SQL;
//   const username = process.env.DATABASE_USERNAME_SQL;
//   const password = process.env.DATABASE_PASSWORD_SQL;
//   const host = process.env.DATABASE_HOST_SQL;
//   let port = 3306;

//   if (!database || !username || !password || !host || port === undefined) {
//     throw new Error(`${"[ERROR]".red.bold} variavel de ambiente mariadb ausente!`);
//   }

//   const sequelize = new Sequelize(database, username, password, {
//     dialect: "mariadb",
//     host: host,
//     port,

//     logging: false,

//     define: {
//       timestamps: true,
//       underscored: true,
//       createdAt: "created_at",
//       updatedAt: "updated_at",
//     },
//     dialectOptions: {
//       timezone: "America/Sao_Paulo",
//     },
//     timezone: "America/Sao_Paulo",
//   });

//   //   const sequelize = new Sequelize("sql_bot_discord", "discord_bot", "my_password", {
//   //     dialect: "mariadb",
//   //     host: "localhost",
//   //     port: 3306,
//   //     logging: false,
//   //   });

//   class User extends Model {
//     public id!: number;
//     public firstName!: string;
//     public lastName!: string;
//     public email!: string;
//   }

//   const Produto = sequelize.define("produto", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//     },
//   });

//   await sequelize
//     .sync()
//     .then(() => console.log(`${"[ON]".green.bold} SQL_Database MariaDB iniciado com sucesso`))
//     .catch((e) => console.log(e));
// };

export default 2;
