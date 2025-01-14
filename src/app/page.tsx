import { api } from "@/trpc/server";
import { PolyglotApp } from "./_components/polyglot-app";

export default async function Home() {
  const concepts = await api.concept.getAll();

  return <PolyglotApp initialConcepts={concepts} />;
}
