import { relations } from "drizzle-orm";
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
  id: serial().primaryKey(),
  slug: varchar({ length: 256 }).notNull().unique(),
  title: varchar({ length: 256 }).notNull(),
  category: varchar({ length: 128 }).notNull(),
  difficulty: varchar({ length: 32 }).notNull(),
  tags: text().array(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }),
});

export const conceptsRelations = relations(concepts, ({ many }) => ({
  snippets: many(snippets),
}));

export const languages = createTable("language", {
  id: serial().primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  slug: varchar({ length: 256 }).notNull().unique(),
  color: varchar({ length: 7 }).notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }),
});

export const languagesRelations = relations(languages, ({ many }) => ({
  snippets: many(snippets),
}));

export const snippets = createTable("snippet", {
  id: serial().primaryKey(),
  conceptId: integer()
    .notNull()
    .references(() => concepts.id, { onDelete: "cascade" }),
  languageId: integer()
    .notNull()
    .references(() => languages.id, { onDelete: "cascade" }),
  code: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }),
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
