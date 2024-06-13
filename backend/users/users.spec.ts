import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../prisma/prisma.service';
import sinon, { SinonStub } from 'sinon';

const mockUserData = {
  id: 1,
  email: 'test@example.com',
  password: 'password',
};

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;
  let findUserByIdStub: SinonStub;

  beforeEach(() => {
    prismaService = new PrismaService();
    usersService = new UsersService(prismaService);
  });

  afterEach(() => {
    if (findUserByIdStub) {
      findUserByIdStub.restore();
    }
  });

  it('should find a user by ID', async () => {
    findUserByIdStub = sinon
      .stub(prismaService.user, 'findUnique')
      .resolves(mockUserData);

    const user = await usersService.findUserById(1);

    expect(findUserByIdStub.calledOnceWith(1)).to.be.true;
    expect(user).to.deep.equal(mockUserData);
  });
});

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  let usersService: UsersService;
  let findUserByIdStub: SinonStub;

  beforeEach(() => {
    usersService = new UsersService(new PrismaService());
    usersResolver = new UsersResolver(usersService);
  });

  afterEach(() => {
    if (findUserByIdStub) {
      findUserByIdStub.restore();
    }
  });

  it('should return a user by ID', async () => {
    findUserByIdStub = sinon
      .stub(usersService, 'findUserById')
      .resolves(mockUserData);

    const user = await usersResolver.getUser(mockUserData.id);

    expect(findUserByIdStub.calledOnceWith(mockUserData.id)).to.be.true;
    expect(user).to.deep.equal(mockUserData);
  });
});
