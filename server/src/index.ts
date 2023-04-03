import { MikroORM } from "@mikro-orm/core";
import mikroOrmConfig from "./mikro-orm.config";
import cors from "cors";
import express from "express";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createClient } from "redis";
import { COOKIE_NAME, PORT, SESSION_SECRET, __prod__ } from "./config";
import { HelloResolver, PostResolver, UserResolver } from "./resolvers";
import RedisStore from "connect-redis";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

const main = async () => {
  const app = express();
  const port = PORT || 4000;

  const redisClient = createClient();
  redisClient
    .connect()
    .then(() => console.log("------- connected to redis -------"))
    .catch(console.error);
  redisClient.on("error", (err) => {
    console.log("Error: " + err);
  });

  const redisStore = new (RedisStore as any)({
    client: redisClient,
    disableTouch: true,
    disableTTL: true,
  });

  app.set("trust proxy", !__prod__);

  app.use(
    cors({
      credentials: true,
      origin: [
        "http://localhost:3000",
        "http://localhost:4000",
        "https://studio.apollographql.com",
      ],
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 90, // 90 days
        httpOnly: true,
        // secure: true,
        // sameSite: "none",
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
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({
        embed: true,
        includeCookies: true,
      }),
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port, () => console.log(`App listening on port: ${port}`));
};

main().catch((err) => console.error(err));
