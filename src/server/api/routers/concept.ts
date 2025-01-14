import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { concepts, languages, snippets } from "@/server/db/schema";
import { eq, asc } from "drizzle-orm";

export const conceptRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(concepts).orderBy(asc(concepts.name));
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const concept = await ctx.db
        .select()
        .from(concepts)
        .where(eq(concepts.id, input.id))
        .limit(1);

      if (!concept[0]) return null;

      const conceptSnippets = await ctx.db
        .select({
          id: snippets.id,
          conceptId: snippets.conceptId,
          languageId: snippets.languageId,
          code: snippets.code,
          createdAt: snippets.createdAt,
          updatedAt: snippets.updatedAt,
          language: languages,
        })
        .from(snippets)
        .leftJoin(languages, eq(snippets.languageId, languages.id))
        .where(eq(snippets.conceptId, input.id));

      return {
        ...concept[0],
        snippets: conceptSnippets,
      };
    }),

  getAllLanguages: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(languages).orderBy(asc(languages.name));
  }),
});
