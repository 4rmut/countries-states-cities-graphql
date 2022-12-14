import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { GraphQLError } from 'graphql';

import { typeDefs } from './typeDefs.js';
import Resolvers from './resolvers.js';
import * as Scalar from './Scalar.js';

const app = express();
const httpServer = createServer(app);

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
      ...Resolvers,
      ...Scalar
    },
    context: ({ req }) => {
      const token = req.headers['souurce-token'];
      if (token !== process.env.MY_SECRET_TOKEN) {
        throw new GraphQLError('Is not authenticated!', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 }
          }
        });
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
    cache: 'bounded'
  });
  await server.start();
  server.applyMiddleware({ app, cors: true });
};

app.use(cors());
app.use(express.json());
startApolloServer(app, httpServer);

export default httpServer;
