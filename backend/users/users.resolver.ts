import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User, { name: 'user' })
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findUserById(id);
  }

  @Mutation(() => User)
  createUser(@Args('email') email: string, @Args('password') password: string) {
    return this.usersService.createUser({ email, password });
  }
}
