import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User, { name: 'user' })
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findUserById(id);
  }
}
