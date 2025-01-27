import { type PrismaClient } from "@prisma/client";
import { z } from "zod";

export const findFlashcardsByCategoryInput = z.object({
  category: z.string(),
});

export const findFlashcardsByCategory = async (
  input: typeof findFlashcardsByCategoryInput._type,
  prisma: PrismaClient,
) => {
  try {
    return await prisma.flashcard.findMany({
      where: { category: input.category },
      include: { answer: true },
    });
  } catch (error) {
    console.error(error);
  }
};
