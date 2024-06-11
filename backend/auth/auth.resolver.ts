import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { accessToken } = await this.authService.login(user);

    return accessToken;
  }

  @Mutation(() => String)
  async signUp(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.signUp(email, password);
    const { accessToken } = await this.authService.login(user);

    return accessToken;
  }
}
