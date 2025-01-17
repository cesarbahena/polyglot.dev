import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "@/env";

const conn = postgres(env.DATABASE_URL);
const db = drizzle(conn, { schema, casing: "snake_case" });

async function main() {
  console.log("Seeding database...");

  // Languages with terminal colors
  const langs = await db.insert(schema.languages).values([
    { name: "JavaScript", slug: "javascript", color: "#f7df1e" },
    { name: "Python", slug: "python", color: "#3776ab" },
    { name: "TypeScript", slug: "typescript", color: "#3178c6" },
    { name: "Go", slug: "go", color: "#00add8" },
    { name: "Rust", slug: "rust", color: "#ce422b" },
  ]).returning();

  // Concepts organized by category
  const concepts = await db.insert(schema.concepts).values([
    // IMPERATIVE
    {
      slug: "variables",
      title: "Variables",
      category: "imperative",
      difficulty: "beginner",
      tags: ["storage", "memory", "binding"],
    },
    {
      slug: "for-loops",
      title: "For Loops",
      category: "imperative",
      difficulty: "beginner",
      tags: ["iteration", "control-flow", "loops"],
    },

    // FUNCTIONAL
    {
      slug: "higher-order-functions",
      title: "Higher-Order Functions",
      category: "functional",
      difficulty: "intermediate",
      tags: ["functions", "composition", "abstraction", "callbacks"],
    },
    {
      slug: "map-filter-reduce",
      title: "Map/Filter/Reduce",
      category: "functional",
      difficulty: "intermediate",
      tags: ["iteration", "transformation", "functional"],
    },

    // OOP
    {
      slug: "classes",
      title: "Classes",
      category: "oop",
      difficulty: "intermediate",
      tags: ["objects", "encapsulation", "blueprint"],
    },

    // CONCURRENT
    {
      slug: "async-await",
      title: "Async/Await",
      category: "concurrent",
      difficulty: "intermediate",
      tags: ["asynchronous", "promises", "non-blocking"],
    },

    // ERROR HANDLING
    {
      slug: "try-catch",
      title: "Try/Catch",
      category: "error-handling",
      difficulty: "beginner",
      tags: ["exceptions", "error-handling", "control-flow"],
    },
  ]).returning();

  // Helper to find language/concept by slug
  const lang = (slug: string) => langs.find(l => l.slug === slug)!;
  const concept = (slug: string) => concepts.find(c => c.slug === slug)!;

  // Snippets with comments included in code
  await db.insert(schema.snippets).values([
    // VARIABLES - JavaScript
    {
      conceptId: concept("variables").id,
      languageId: lang("javascript").id,
      code: `// Variables store values that can be referenced and manipulated.
// Use const for immutable bindings, let for mutable ones.

const x = 5;
let y = 10;

y = y + x;
console.log(y); // 15`,
    },

    // VARIABLES - Python
    {
      conceptId: concept("variables").id,
      languageId: lang("python").id,
      code: `# Variables store values that can be referenced and manipulated.
# All variables are dynamically typed and mutable by default.

x = 5
y = 10

y = y + x
print(y)  # 15`,
    },

    // VARIABLES - Go
    {
      conceptId: concept("variables").id,
      languageId: lang("go").id,
      code: `// Variables store values that can be referenced and manipulated.
// Use := for short declaration, var for explicit typing.

package main

import "fmt"

func main() {
    x := 5
    y := 10

    y = y + x
    fmt.Println(y) // 15
}`,
    },

    // FOR LOOPS - JavaScript
    {
      conceptId: concept("for-loops").id,
      languageId: lang("javascript").id,
      code: `// For loops iterate over a sequence of values.
// Use traditional for loop with initialization, condition, increment.

const numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}`,
    },

    // FOR LOOPS - Python
    {
      conceptId: concept("for-loops").id,
      languageId: lang("python").id,
      code: `# For loops iterate over a sequence of values.
# Python's for loop iterates directly over iterables.

numbers = [1, 2, 3, 4, 5]

for num in numbers:
    print(num)`,
    },

    // FOR LOOPS - Go
    {
      conceptId: concept("for-loops").id,
      languageId: lang("go").id,
      code: `// For loops iterate over a sequence of values.
// Go uses range for cleaner iteration over slices.

package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}

    for _, num := range numbers {
        fmt.Println(num)
    }
}`,
    },

    // HIGHER-ORDER FUNCTIONS - JavaScript
    {
      conceptId: concept("higher-order-functions").id,
      languageId: lang("javascript").id,
      code: `// Higher-order functions take functions as arguments or return them.
// They enable powerful abstraction and composition patterns.

function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log);
// 0
// 1
// 2`,
    },

    // HIGHER-ORDER FUNCTIONS - Python
    {
      conceptId: concept("higher-order-functions").id,
      languageId: lang("python").id,
      code: `# Higher-order functions take functions as arguments or return them.
# They enable powerful abstraction and composition patterns.

def repeat(n, action):
    for i in range(n):
        action(i)

repeat(3, print)
# 0
# 1
# 2`,
    },

    // MAP/FILTER/REDUCE - JavaScript
    {
      conceptId: concept("map-filter-reduce").id,
      languageId: lang("javascript").id,
      code: `// Map, filter, and reduce transform collections functionally.
// These operations avoid mutation and enable declarative code.

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((acc, x) => acc + x, 0);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(evens);   // [2, 4]
console.log(sum);     // 15`,
    },

    // MAP/FILTER/REDUCE - Python
    {
      conceptId: concept("map-filter-reduce").id,
      languageId: lang("python").id,
      code: `# Map, filter, and reduce transform collections functionally.
# These operations avoid mutation and enable declarative code.

from functools import reduce

numbers = [1, 2, 3, 4, 5]

doubled = list(map(lambda x: x * 2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
sum_total = reduce(lambda acc, x: acc + x, numbers, 0)

print(doubled)    # [2, 4, 6, 8, 10]
print(evens)      # [2, 4]
print(sum_total)  # 15`,
    },

    // CLASSES - JavaScript
    {
      conceptId: concept("classes").id,
      languageId: lang("javascript").id,
      code: `// Classes define blueprints for creating objects.
// They encapsulate data and behavior together.

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const rect = new Rectangle(5, 3);
console.log(rect.area()); // 15`,
    },

    // CLASSES - Python
    {
      conceptId: concept("classes").id,
      languageId: lang("python").id,
      code: `# Classes define blueprints for creating objects.
# They encapsulate data and behavior together.

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

rect = Rectangle(5, 3)
print(rect.area())  # 15`,
    },

    // ASYNC/AWAIT - JavaScript
    {
      conceptId: concept("async-await").id,
      languageId: lang("javascript").id,
      code: `// Async/await enables non-blocking asynchronous code.
// It makes asynchronous code read like synchronous code.

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

fetchData('/api/users')
  .then(data => console.log(data))
  .catch(err => console.error(err));`,
    },

    // ASYNC/AWAIT - Python
    {
      conceptId: concept("async-await").id,
      languageId: lang("python").id,
      code: `# Async/await enables non-blocking asynchronous code.
# It makes asynchronous code read like synchronous code.

import asyncio
import aiohttp

async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            data = await response.json()
            return data

asyncio.run(fetch_data('/api/users'))`,
    },

    // TRY/CATCH - JavaScript
    {
      conceptId: concept("try-catch").id,
      languageId: lang("javascript").id,
      code: `// Try/catch handles errors gracefully without crashing.
// Use it to catch and recover from runtime errors.

try {
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
} finally {
  cleanup();
}`,
    },

    // TRY/CATCH - Python
    {
      conceptId: concept("try-catch").id,
      languageId: lang("python").id,
      code: `# Try/except handles errors gracefully without crashing.
# Use it to catch and recover from runtime errors.

try:
    result = risky_operation()
    print(result)
except Exception as error:
    print(f'Error: {error}')
finally:
    cleanup()`,
    },
  ]);

  console.log("Database seeded successfully!");
  console.log(`  - ${langs.length} languages`);
  console.log(`  - ${concepts.length} concepts`);

  await conn.end();
}

main().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
