import "source-map-support/register";

import createSchema from "./schema";
import logger from "@libs/logger";
import prisma from "../../../prisma/client";

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
import { PrismaClient } from ".prisma/client";
import { verifyAndDecode } from "@utils/auth/jwt";
import { JwtPayload } from "jsonwebtoken";

export type ApolloContext = {
  headers: APIGatewayProxyEventHeaders;
  functionName: string;
  prisma: PrismaClient;
  event: APIGatewayProxyEvent | APIGatewayProxyEventV2;
  user?: string | JwtPayload;
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
    const user = verifyAndDecode(
      buildEvent.headers.Authorization?.split(" ")[1] ||
        buildEvent.headers.authorization?.split(" ")[1]
    );

    return {
      headers: buildEvent.headers,
      functionName: buildContext.functionName,
      prisma,
      event: buildEvent,
      user,
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
