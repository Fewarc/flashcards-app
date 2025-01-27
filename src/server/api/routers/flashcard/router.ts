import { createTRPCRouter, publicProcedure } from "../../trpc";
import { createFlashcard, createFlashcardInput } from "./actions/create";
import {
  findFlashcardsByCategory,
  findFlashcardsByCategoryInput,
} from "./actions/findByCategory";

export const flashcardRouter = createTRPCRouter({
  create: publicProcedure
    .input(createFlashcardInput)
    .mutation(({ input, ctx }) => {
      return createFlashcard(input, ctx.db);
    }),
  findByCategory: publicProcedure
    .input(findFlashcardsByCategoryInput)
    .query(({ input, ctx }) => {
      return findFlashcardsByCategory(input, ctx.db);
    }),
});
