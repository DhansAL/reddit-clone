import { User } from "../entities/User";
import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import argon2 from "argon2";
//instead of having multiple args have one input type
@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const hashedPasword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPasword,
    });
    await em.persistAndFlush(user);
    return user;
  }
}
