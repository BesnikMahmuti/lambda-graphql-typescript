import "reflect-metadata";
import { GraphQLSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";
import UserResolver from "@utils/resolvers/User";
import LoginResolver from "@utils/resolvers/Login";
import authChecker from "@utils/auth/authChecker";

const createSchema = (): GraphQLSchema => {
  const schema = buildSchemaSync({
    resolvers: [UserResolver, LoginResolver],
    authChecker,
    emitSchemaFile: true,
  });

  return schema;
};

export default createSchema;
