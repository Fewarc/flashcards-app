import { flashcard_categories } from "@/lib/config";
import { type PrismaClient } from "@prisma/client";
import { number, z } from "zod";

export const findFlashcardsByCategoryInput = z.object({
  category: z.string(),
});

export const findFlashcardsByCategory = async (
  input: typeof findFlashcardsByCategoryInput._type,
  prisma: PrismaClient,
) => {
  try {
    // flashcard_categories[0] = 'all'
    if (input.category === flashcard_categories[0]) {
      return await prisma.flashcard.findMany({
        include: { answer: true },
      });
    } else {
      return await prisma.flashcard.findMany({
        where: { category: input.category },
        include: { answer: true },
      });
    }
  } catch (error) {
    console.error(error);
  }
};
