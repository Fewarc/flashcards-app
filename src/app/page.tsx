import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <h1 className="text-6xl font-semibold">Flashcards</h1>
      </main>
    </HydrateClient>
  );
}
