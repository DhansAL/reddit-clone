import { Field, InputType } from "type-graphql";

//instead of having multiple args have one input type
@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
  @Field()
  email: string;
}
