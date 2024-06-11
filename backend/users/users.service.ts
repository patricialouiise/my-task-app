// TODO: Remove, already using auth
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
