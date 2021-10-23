import { Field, InputType } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType("UserLoginInput")
export default class UserLoginInput {
  @Field(() => String)
  @IsEmail()
  public email: string;

  @Field(() => String)
  public password: string;
}
