import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../users/user.model';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field()
  datetime: Date;

  @Field()
  note: string;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  user: User;
}
