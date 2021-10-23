import { PrismaClient } from ".prisma/client";

let options = {};
if (process.env.NODE_ENV !== "prod") {
  options = {
    ...options,
    log: ["query", "info", "warn", "error"],
  };
}

const prisma = new PrismaClient({
  ...options,
});

// TODO: Remove this after debugging
// prisma.$connect();

// if (process.env.NODE_ENV !== "prod") {
//   prisma.$on<"query">("query", (e) => {
//     console.log(`Duration: ${e.duration}ms`);
//   });
// }

export default prisma;
