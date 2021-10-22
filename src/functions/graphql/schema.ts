import "reflect-metadata";
import { GraphQLSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";
import TestResolver from "@utils/resolvers/Test";

const createSchema = (): GraphQLSchema => {
  const schema = buildSchemaSync({
    resolvers: [TestResolver],
    emitSchemaFile: true,
  });

  return schema;
};

export default createSchema;
