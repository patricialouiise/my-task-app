import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { PrismaService } from '../prisma/prisma.service';
import sinon, { SinonStub } from 'sinon';
import { Task } from './task.model';
import { User } from '../users/user.model';
import { Prisma } from '@prisma/client';

describe('TasksService', () => {
  let tasksService: TasksService;
  let prismaService: PrismaService;
  let createTaskStub: SinonStub;

  beforeEach(() => {
    prismaService = new PrismaService();
    tasksService = new TasksService(prismaService);
  });

  afterEach(() => {
    if (createTaskStub) {
      createTaskStub.restore();
    }
  });

  it('should create a task', async () => {
    const taskData = {
      id: 1,
      datetime: new Date(),
      note: 'Test note',
      userId: 1,
    };

    createTaskStub = sinon
      .stub(prismaService.task, 'create')
      .resolves(taskData);

    const createTaskData: Prisma.TaskCreateInput = {
      datetime: new Date(),
      note: 'Test note',
      user: { connect: { id: 1 } },
    };

    const createdTask = await tasksService.createTask(createTaskData);

    expect(createTaskStub.calledOnce).to.be.true;
    expect(createdTask).to.deep.equal(taskData);
  });
});

describe('TasksResolver', () => {
  let tasksResolver: TasksResolver;
  let tasksService: TasksService;
  let getTasksByUserIdStub: SinonStub;

  beforeEach(() => {
    tasksService = new TasksService(new PrismaService());
    tasksResolver = new TasksResolver(tasksService);
  });

  afterEach(() => {
    if (getTasksByUserIdStub) {
      getTasksByUserIdStub.restore();
    }
  });

  it('should return tasks for a specific user', async () => {
    const userId = 1;
    const tasksData: Task[] = [
      {
        id: 1,
        datetime: new Date(),
        note: 'Test note 1',
        userId,
        user: {} as User,
      },
      {
        id: 2,
        datetime: new Date(),
        note: 'Test note 2',
        userId,
        user: {} as User,
      },
    ];

    getTasksByUserIdStub = sinon
      .stub(tasksService, 'getTasksByUserId')
      .resolves(tasksData);

    const tasks = await tasksResolver.getTasks(userId);

    expect(getTasksByUserIdStub.calledOnceWith(userId)).to.be.true;
    expect(tasks).to.deep.equal(tasksData);
  });
});
