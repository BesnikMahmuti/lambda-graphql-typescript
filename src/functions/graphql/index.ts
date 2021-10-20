import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "graphql",
      },
    },
    {
      http: {
        method: "get",
        path: "graphql",
      },
    },
  ],
};
