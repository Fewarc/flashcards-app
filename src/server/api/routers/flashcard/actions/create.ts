import { FlashcardAnswerType, type PrismaClient } from "@prisma/client";
import { z } from "zod";

export const createFlashcardInput = z.object({
  question: z.string(),
  catagory: z.string(),
  answer: z.array(
    z.object({
      content: z.string(),
      type: z.nativeEnum(FlashcardAnswerType),
    }),
  ),
  markdown: z.string().optional(),
});

export const createFlashcard = async (
  input: typeof createFlashcardInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.flashcard.create({
      data: {
        question: input.question,
        category: input.catagory,
        answer: { createMany: { data: !!input.markdown ? [] : input.answer } },
        markdown: input.markdown,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
