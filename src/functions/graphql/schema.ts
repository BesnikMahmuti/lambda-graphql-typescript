import "reflect-metadata";
import { GraphQLSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";
import User from "@utils/resolvers/User";

const createSchema = (): GraphQLSchema => {
  const schema = buildSchemaSync({
    resolvers: [User],
    emitSchemaFile: true,
  });

  return schema;
};

export default createSchema;
