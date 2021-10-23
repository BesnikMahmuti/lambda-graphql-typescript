import { Field, ID, ObjectType } from "type-graphql";
import { IsEmail } from "class-validator";

@ObjectType("User")
export default class User {
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
