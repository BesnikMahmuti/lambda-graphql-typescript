import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType("Login")
export default class Login {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  @IsEmail()
  public email: string;

  @Field(() => Date)
  public createdAt: Date | null;

  @Field(() => Date)
  public updatedAt: Date | null;
}
