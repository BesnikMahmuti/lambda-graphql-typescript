import "reflect-metadata";
import { GraphQLSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";

const createSchema = (): GraphQLSchema => {
  const schema = buildSchemaSync({
    resolvers: [() => Promise.resolve()],
    emitSchemaFile: true,
  });

  return schema;
};

export default createSchema;
