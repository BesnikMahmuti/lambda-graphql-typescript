import { Field, ID, ObjectType } from "type-graphql";

@ObjectType("User")
export default class User {
  @Field(() => ID)
  public id: string;

  @Field(() => String, { nullable: true })
  public firstName: string | null;

  @Field(() => String, { nullable: true })
  public lastName: String | null;
}
