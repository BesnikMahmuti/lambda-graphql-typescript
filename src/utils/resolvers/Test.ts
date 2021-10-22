import logger from "@libs/logger";
import Profile from "@utils/types/Profile";
import faker from "faker";
import { Resolver, Query, FieldResolver, Root } from "type-graphql";
import User from "../types/User";

@Resolver(() => User)
export default class TestResolver {
  @Query(() => [User])
  public async users(): Promise<[User]> {
    const usersResult: [User] = [
      {
        id: "random_id123",
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
    ];
    return usersResult;
  }

  @FieldResolver(() => Profile, { nullable: true })
  async profile(@Root() user: User): Promise<Profile | null> {
    const userProfile: Profile = {
      id: "random_id321",
      userId: user.id,
      job: "Software Engineer",
    };

    if (userProfile) {
      logger.info({
        message: `User with id ${user.id} not found`,
      });
    }

    return userProfile;
  }
}
