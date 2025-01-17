import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { concepts, languages, snippets } from "@/server/db/schema";
import { eq, asc } from "drizzle-orm";

export const conceptRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allConcepts = await ctx.db.query.concepts.findMany({
      orderBy: asc(concepts.title),
      with: {
        snippets: {
          with: {
            language: true,
          },
        },
      },
    });
    return allConcepts;
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const concept = await ctx.db.query.concepts.findFirst({
        where: eq(concepts.slug, input.slug),
        with: {
          snippets: {
            with: {
              language: true,
            },
          },
        },
      });

      return concept ?? null;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const concept = await ctx.db.query.concepts.findFirst({
        where: eq(concepts.id, input.id),
        with: {
          snippets: {
            with: {
              language: true,
            },
          },
        },
      });

      return concept ?? null;
    }),

  getAllLanguages: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(languages).orderBy(asc(languages.name));
  }),
});
