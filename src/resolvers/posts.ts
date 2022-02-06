import { Query, Resolver } from "type-graphql";
import "reflect-metadata";
import { Post } from "src/entities/Post";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  hello() {
    return "hello tyypegraphql";
  }
}
