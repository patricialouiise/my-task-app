import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from '../tasks/task.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];
}
