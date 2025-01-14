import { relations, sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  text,
  integer,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `polyglot_${name}`);

export const concepts = createTable("concept", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const conceptsRelations = relations(concepts, ({ many }) => ({
  snippets: many(snippets),
}));

export const languages = createTable("language", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const languagesRelations = relations(languages, ({ many }) => ({
  snippets: many(snippets),
}));

export const snippets = createTable("snippet", {
  id: serial("id").primaryKey(),
  conceptId: integer("concept_id")
    .references(() => concepts.id)
    .notNull(),
  languageId: integer("language_id")
    .references(() => languages.id)
    .notNull(),
  code: text("code").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const snippetsRelations = relations(snippets, ({ one }) => ({
  concept: one(concepts, {
    fields: [snippets.conceptId],
    references: [concepts.id],
  }),
  language: one(languages, {
    fields: [snippets.languageId],
    references: [languages.id],
  }),
}));
