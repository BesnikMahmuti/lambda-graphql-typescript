import prisma from "./client";

const main = async (): Promise<void> => {
  await prisma.user.create({
    data: {
      email: "testUser@gmail.com",
      password: "test123",
      profile: {
        create: {
          firstName: "User",
          lastName: "test",
          title: "Frontend Developer",
        },
      },
    },
  });
  console.log("User has been added successfully");
};

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Connection closed successfully");
  });
