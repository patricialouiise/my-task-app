import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('securepassword', 10);

  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: hashedPassword,
      tasks: {
        create: [
          {
            datetime: new Date(),
            note: 'This is the first task note.',
          },
          {
            datetime: new Date(),
            note: 'This is the second task note.',
          },
        ],
      },
    },
  });

  console.log(`Created user with email: ${user.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
