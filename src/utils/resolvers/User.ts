import { PrismaClient } from ".prisma/client";
import logger from "@libs/logger";
import { generateJwtToken } from "@utils/auth/jwt";
import CreateUserInput from "@utils/inputs/User";
import Role from "@utils/interfaces";
import Profile from "@utils/types/Profile";
import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Ctx,
  Mutation,
  Arg,
  Authorized,
} from "type-graphql";
import User from "../types/User";

@Resolver(() => User)
export default class UserResolver {
  @Authorized([Role.User])
  @Query(() => [User])
  public async users(@Ctx("prisma") prisma: PrismaClient): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  @Authorized([Role.Admin])
  @Mutation(() => User)
  public async createUser(
    @Arg("input") input: CreateUserInput,
    @Ctx("prisma") prisma: PrismaClient
  ) {
    const createdUser = await prisma.user.create({
      data: {
        email: input.email,
        password: "testbesnik",
      },
    });
    return createdUser;
  }

  @FieldResolver(() => Profile, { nullable: true })
  async profile(
    @Ctx("prisma") prisma: PrismaClient,
    @Root() user: User
  ): Promise<Profile | null> {
    const profile = prisma.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .profile();

    if (!profile) {
      logger.info({
        message: `User with id ${user.id} not found`,
      });
    }
    return profile;
  }
}
