import "source-map-support/register";

// import createSchema from "./schema";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventV2,
  Context,
} from "aws-lambda";

import {
  ContextFunction,
  ApolloServerPluginLandingPageGraphQLPlayground,
  gql,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-lambda";

export type ApolloContext = {
  headers: APIGatewayProxyEventHeaders;
  functionName: string;
  event: APIGatewayProxyEvent | APIGatewayProxyEventV2;
};

const graphqlHandler = (event, context, callback) => {
  interface ContextFunctionParams {
    event: APIGatewayProxyEvent | APIGatewayProxyEventV2;
    context: Context;
  }

  const buildApolloContext: ContextFunction<
    ContextFunctionParams,
    ApolloContext
  > = async ({ event: buildEvent, context: buildContext }) => {
    return {
      headers: buildEvent.headers,
      functionName: buildContext.functionName,
      event: buildEvent,
    };
  };

  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      lambda: String
    }
  `;

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      lambda: () => "Hello from graphql lambda!",
    },
  };

  const server = new ApolloServer({
    // schema: createSchema(),
    typeDefs,
    resolvers,
    context: buildApolloContext,
    formatError: (err) => {
      console.log("errooooor", err);
      return err;
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        endpoint: "/dev/graphql",
      }),
    ],
    introspection: process.env.NODE_ENV !== "prod",
  });

  const apolloHandler = server.createHandler({
    expressGetMiddlewareOptions: {
      cors: {
        origin: "*",
        credentials: true,
        allowedHeaders: "*",
      },
    },
  });

  return apolloHandler(event, context, callback);
};

export const main = graphqlHandler;
