import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import typeDefs from "./schema/index";
import resolvers from "./resolvers/index";
import dbConnect from "./config/dbConnect";
import jwt from "jsonwebtoken";
import User from "./models/user";

export async function startApolloServer(port: string) {
  await dbConnect(); // Connect to the database before starting the server

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth) {
        const decodedToken = jwt.verify(auth.slice(4), process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        return { user };
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port }, resolve as any));

  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
}
