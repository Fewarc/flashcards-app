import { createTRPCRouter, publicProcedure } from "../../trpc";
import { createFlashcard, createFlashcardInput } from "./actions/create";

export const flashcardRouter = createTRPCRouter({
  create: publicProcedure
    .input(createFlashcardInput)
    .mutation(({ input, ctx }) => {
      return createFlashcard(input, ctx.db);
    }),
});
