import { MikroORM } from "@mikro-orm/core";
import "reflect-metadata";
import mikroOrmConfig from "./mikro-orm.config";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import cors from "cors";

//redis
import session from "express-session";
import { MyContext } from "./types";
import { User } from "./entities/User";
const { createClient } = require("redis");

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  // redis@v4
  let RedisStore = require("connect-redis")(session);
  let redisClient = createClient({ legacyMode: true });
  redisClient.connect().catch(console.error);

  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  //redis should be used before middleware
  // session middleware should be running before apollo middleware
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10years
        httpOnly: true,
        secure: __prod__,
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: "344433",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    //what obj is req from?
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(2000, () => {
    console.log("listening on port 2000");
  });
};

main().catch((err) => {
  console.log(err);
});
