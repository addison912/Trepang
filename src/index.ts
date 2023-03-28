import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createClient } from "redis";
import {
  PORT,
  SESSION_SECRET,
  ORIGIN,
  __prod__,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PW,
} from "./config";
import { HelloResolver, PostResolver, UserResolver } from "./resolvers";
import RedisStore from "connect-redis";

const main = async () => {
  const app = express();
  const port = PORT || 4000;

  const redisClient = createClient({
    socket: {
      host: REDIS_HOST,
      port: parseInt(REDIS_PORT!),
    },
    password: REDIS_PW,
  });

  redisClient.on("error", (err) => {
    console.log("Error " + err);
  });

  const redisStore = new (RedisStore as any)({
    client: redisClient,
    disableTouch: true,
    disableTTL: true,
  });

  app.use(
    session({
      name: "qid",
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 90, // 90 days
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
        domain: ORIGIN,
      },
      saveUninitialized: false,
      secret: SESSION_SECRET!,
      resave: false,
    })
  );

  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  app.get("/", (_, res) => {
    res.send("hello world");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em.fork(), req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => console.log(`App listening on port: ${port}`));
};

main().catch((err) => console.error(err));
