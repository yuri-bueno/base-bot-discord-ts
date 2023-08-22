declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN: string;
    DATABASE_HOST_SQL: string;
    DATABASE_PORT_SQL: number;
    DATABASE_USERNAME_SQL: string;
    DATABASE_PASSWORD_SQL: string;
    DATABASE_SQL: string;
  }
}
