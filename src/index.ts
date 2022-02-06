// import { MikroORM } from "@mikro-orm/core";
// import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { __prod__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
// import "reflect-metadata";

const main = async () => {
  // const orm = MikroORM.init(mikroOrmConfig);
  // (await orm).getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });
  //This is a known bug with an open issue and a merged PR to fix it. For now, you can downgrade to apollo-server-express@^2
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(2000, () => {
    console.log("server started at localhost:2000");
  });
};

main().catch((err) => {
  console.log(err);
});
