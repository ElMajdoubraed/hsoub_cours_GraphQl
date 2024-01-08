import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { createServer } from "http";
import typeDefs from "./schema/index";
import resolvers from "./resolvers/index";

import dbConnect from "./config/dbConnect";
import jwt from "jsonwebtoken";
import User from "./models/user";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

export async function startApolloServer(port: string) {
  await dbConnect(); // Connect to the database before starting the server

  const app = express();
  const httpServer = createServer(app);

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.APP_URL);
    next();
  });

  app.get("/", (req, res) => {
    res.redirect("/graphql");
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth) {
        const decodedToken = jwt.verify(auth.slice(4), process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        return { user };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port }, resolve as any));

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
}
