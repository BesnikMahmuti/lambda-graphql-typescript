import { Field, ID, ObjectType } from "type-graphql";

@ObjectType("Profile")
export default class Profile {
  @Field(() => ID)
  public id: string;

  @Field(() => String)
  public firstName: string;

  @Field(() => String)
  public lastName: string;

  @Field(() => String)
  public userId: string;

  @Field(() => String, { nullable: true })
  public title: string | null;
}
