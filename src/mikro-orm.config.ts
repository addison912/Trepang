import { Options } from "@mikro-orm/core";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  __prod__,
} from "./config";
import { Post, User } from "./entities";
import path from "path";

const mikroOrmConfig: Options = {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    disableForeignKeys: false,
  },
  entities: [Post, User],
  dbName: DB_NAME,
  clientUrl: `postgresql://${DB_HOST}`,
  user: DB_USER,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT!),
  type: "postgresql",
  debug: !__prod__,
};

export default mikroOrmConfig;
