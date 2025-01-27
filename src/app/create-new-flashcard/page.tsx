import { HydrateClient } from "@/trpc/server";

export default async function CreateNewFlashcard() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        new
      </main>
    </HydrateClient>
  );
}
