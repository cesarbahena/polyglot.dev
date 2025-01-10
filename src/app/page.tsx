import { api } from "@/trpc/server";

export default async function Home() {
  const concepts = await api.concept.getAll();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 p-6 text-white">
        <h2 className="mb-4 text-2xl font-bold">Concepts</h2>
        <nav>
          <ul>
            {concepts.map((concept) => (
              <li key={concept.id} className="mb-2">
                <a href="#" className="hover:text-gray-300">
                  {concept.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-4xl font-bold">Welcome to Polyglot.dev</h1>
        </header>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <p>
            Select a concept from the sidebar to get started.
          </p>
        </div>
      </main>

      <aside className="w-64 bg-gray-200 p-6">
        <h2 className="mb-4 text-2xl font-bold">Compare</h2>
        {/* Comparison tools will go here */}
      </aside>
    </div>
  );
}
