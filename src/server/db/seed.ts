import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";
import { env } from "@/env";

const { Pool } = pg;
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  console.log("Seeding database...");

  await pool.connect();

  await db.insert(schema.languages).values([
    { name: "JavaScript" },
    { name: "Python" },
    { name: "TypeScript" },
  ]);

  await db.insert(schema.concepts).values([
    { name: "Variables" },
    { name: "Functions" },
    { name: "Loops" },
  ]);

  const languages = await db.query.languages.findMany();
  const concepts = await db.query.concepts.findMany();

  await db.insert(schema.snippets).values([
    {
      conceptId: concepts.find((c) => c.name === "Variables")!.id,
      languageId: languages.find((l) => l.name === "JavaScript")!.id,
      code: "var x = 5;",
    },
    {
      conceptId: concepts.find((c) => c.name === "Variables")!.id,
      languageId: languages.find((l) => l.name === "Python")!.id,
      code: "x = 5",
    },
    {
      conceptId: concepts.find((c) => c.name === "Variables")!.id,
      languageId: languages.find((l) => l.name === "TypeScript")!.id,
      code: "let x: number = 5;",
    },
    {
        conceptId: concepts.find((c) => c.name === "Functions")!.id,
        languageId: languages.find((l) => l.name === "JavaScript")!.id,
        code: "function myFunction(p1, p2) {\n  return p1 * p2;\n}",
    },
    {
        conceptId: concepts.find((c) => c.name === "Functions")!.id,
        languageId: languages.find((l) => l.name === "Python")!.id,
        code: "def my_function(p1, p2):\n  return p1 * p2",
    },
    {
        conceptId: concepts.find((c) => c.name === "Functions")!.id,
        languageId: languages.find((l) => l.name === "TypeScript")!.id,
        code: "function myFunction(p1: number, p2: number): number {\n  return p1 * p2;\n}",
    },
  ]);

  console.log("Database seeded successfully!");
  await pool.end();
}

main();
