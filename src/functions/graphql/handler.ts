import "source-map-support/register";

import createSchema from "./schema";
import logger from "@libs/logger";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventV2,
  Context,
} from "aws-lambda";

import {
  ContextFunction,
  ApolloServerPluginLandingPageGraphQLPlayground,
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

  const server = new ApolloServer({
    schema: createSchema(),
    context: buildApolloContext,
    formatError: (err) => {
      logger.error({
        message: err.message,
        stack: err.extensions.exception.stacktrace,
      });
      return err;
    },
    formatResponse: (response, context) => {
      if (context.operationName !== "IntrospectionQuery") {
        logger.info(JSON.stringify(response.data));
      }
      return response;
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
