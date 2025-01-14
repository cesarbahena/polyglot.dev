import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { concepts, languages, snippets } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const conceptRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.concepts.findMany({
      orderBy: (concepts, { asc }) => [asc(concepts.name)],
    });
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const concept = await ctx.db.query.concepts.findFirst({
        where: eq(concepts.id, input.id),
      });

      if (!concept) return null;

      const conceptSnippets = await ctx.db.query.snippets.findMany({
        where: eq(snippets.conceptId, input.id),
        with: {
          language: true,
        },
      });

      return {
        ...concept,
        snippets: conceptSnippets,
      };
    }),

  getAllLanguages: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.languages.findMany({
      orderBy: (languages, { asc }) => [asc(languages.name)],
    });
  }),
});
