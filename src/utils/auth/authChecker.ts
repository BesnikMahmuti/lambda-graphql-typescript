import { AuthChecker } from "type-graphql";
import { ApolloContext } from "@functions/graphql/handler";

const authChecker: AuthChecker<ApolloContext> = async ({ context }, roles) => {
  const { user } = context;

  // If there is no user, restrict access
  if (!user) {
    return false;
  }

  // if `@Authorized()`, check only if user exists
  if (roles.length === 0) {
    return user !== undefined;
  }

  // grant access if the roles overlap
  if (roles.includes(user["role"])) {
    return true;
  }

  // no roles matched, restrict access
  return false;
};

export default authChecker;
