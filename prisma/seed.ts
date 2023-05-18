import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { createSlug } from "src/utils";

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  await prisma.user.deleteMany();

  const password1 = await bcrypt.hash("example", roundsOfHashing);
  const password2 = await bcrypt.hash("example", roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin Example",
      password: password1,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "User Example",
      password: password2,
    },
  });

  console.info([user1.email, user2.email]);

  await prisma.article.deleteMany();

  // create two dummy articles
  const title1 = "The first article";
  const post1 = await prisma.article.create({
    data: {
      title: title1,
      slug: createSlug(title1),
      description: "Excitement and challenges of first-time writing.",
      body: "Explore the excitement and challenges of writing your very first article. From brainstorming ideas to crafting a compelling narrative, the journey of a new writer can be both daunting and rewarding. However, with determination and perseverance, anyone can develop the skills and confidence necessary to create a piece that resonates with readers. So take a deep breath, grab a pen, and start writing - the world is waiting to hear your story.",
      published: true,
      publishedAt: new Date("January 1 2023 01:10:10"),
      authorId: user1.id,
    },
  });

  const title2 = "Another second article";
  const post2 = await prisma.article.create({
    data: {
      title: title2,
      slug: createSlug(title2),
      description: "Challenges of writing a follow-up article.",
      body: "Let's delves into the process of writing a follow-up piece after the success of a first article. While it can be tempting to recreate the same formula that worked previously, it's important to challenge oneself and take risks in order to continue growing as a writer. Whether it's experimenting with a new style or tackling a different topic altogether, the key is to stay authentic and true to your voice. So embrace the journey and keep pushing boundaries - the next great article is just waiting to be written.",
      published: false,
      authorId: user2.id,
    },
  });

  console.info([post1.slug, post2.slug]);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
