import { HydrateClient } from "@/trpc/server";

export default async function Learn() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        learn
      </main>
    </HydrateClient>
  );
}
