import { Field, InputType } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType("CreateUserInput")
export default class CreateUserInput {
  @Field(() => String, { nullable: true })
  @IsEmail()
  public email: string | null;
}
