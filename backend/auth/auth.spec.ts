import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service';
import sinon, { SinonStub } from 'sinon';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let bcryptCompareStub: SinonStub;

  beforeEach(() => {
    prismaService = new PrismaService();
    authService = new AuthService(prismaService, {
      sign: () => 'mocked_token',
    } as any);
  });

  afterEach(() => {
    if (bcryptCompareStub) {
      bcryptCompareStub.restore();
    }
  });

  it('should validate user credentials', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { id: 1, email: email, password: hashedPassword };

    bcryptCompareStub = sinon.stub(bcrypt, 'compare').resolves(true);
    sinon.stub(prismaService.user, 'findUnique').resolves(userData);

    const user = await authService.validateUser(email, password);

    expect(user).to.deep.equal({ email });
  });
});

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  let authService: AuthService;
  let validateUserStub: SinonStub;

  beforeEach(() => {
    authService = new AuthService(new PrismaService(), {
      sign: () => 'mocked_token',
    } as any);
    authResolver = new AuthResolver(authService);
  });

  afterEach(() => {
    if (validateUserStub) {
      validateUserStub.restore();
    }
  });

  it('should return token on login with valid credentials', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const user = { email };

    validateUserStub = sinon.stub(authService, 'validateUser').resolves(user);

    const token = await authResolver.login(email, password);

    expect(token).to.equal('mocked_token');
  });
});
