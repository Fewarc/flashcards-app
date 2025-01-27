import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { HydrateClient } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <h1 className="text-6xl font-semibold">Flashcards</h1>
        <div className="mt-8 flex items-center justify-center gap-x-4">
          <Link href={config.routes.CREATE_NEW_FLASHCARD}>
            <Button variant="secondary">Create new Flashcard</Button>
          </Link>
          <Link href={config.routes.LEARN}>
            <Button>Learn</Button>
          </Link>
        </div>
      </main>
    </HydrateClient>
  );
}
