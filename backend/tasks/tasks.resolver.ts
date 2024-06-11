import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query(() => [Task], { name: 'tasks' })
  getTasks(@Args('userId', { type: () => Int }) userId: number) {
    return this.tasksService.getTasksByUserId(userId);
  }

  @Mutation(() => Task)
  createTask(
    @Args('datetime') datetime: Date,
    @Args('note') note: string,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.tasksService.createTask({
      datetime,
      note,
      user: { connect: { id: userId } },
    });
  }

  @Mutation(() => Task)
  deleteTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
