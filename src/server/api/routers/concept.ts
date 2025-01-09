import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { concepts } from "@/server/db/schema";

export const conceptRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.concepts.findMany();
  }),
});
