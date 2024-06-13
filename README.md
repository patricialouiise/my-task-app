This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Let's run the application!

## Setup and create the database

Create and run the database through docker:

1. From the root folder, run:

```bash
docker-compose up -d
```

## Run the backend

1. From `app/`, go to backend folder:

```bash
cd backend/
```

2. Install dependencies

```bash
npm install
```

3. Run prisma generate

```bash
npm run prisma:generate
```

4. Run prisma migrate to run migrations

```bash
npm run migrate:dev
```

5. Run seeder

```bash
npm run seed
```

6. Run server

```bash
npm start
```

## Run the App

1. Fronm the root folder, install the dependencies:

```bash
npm install
```

2. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3002/graphql](http://localhost:3002/graphql) to see the GraphQL Playground

Existing user:

- email - user@example.com
- password - securepassword

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
