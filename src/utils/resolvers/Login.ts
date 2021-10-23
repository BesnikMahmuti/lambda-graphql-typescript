import { PrismaClient } from ".prisma/client";
import { generateJwtToken } from "@utils/auth/jwt";
import UserLoginInput from "@utils/inputs/Login";
import Login from "@utils/types/Login";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";

@Resolver(() => Login)
export default class LoginResolver {
  @Query(() => Login)
  public async login(
    @Ctx("prisma") prisma: PrismaClient,
    @Arg("input") credentials: UserLoginInput
  ) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    return existingUser;
  }

  @FieldResolver(() => String)
  async token(@Root() userLogin: Login): Promise<string> {
    const token = generateJwtToken({
      email: userLogin.email,
      userId: userLogin.id,
      role: "user",
      createdAt: userLogin?.createdAt?.toISOString(),
      updatedAt: userLogin?.updatedAt?.toISOString(),
    });
    return token;
  }
}
