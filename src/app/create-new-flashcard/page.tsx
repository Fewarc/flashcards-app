"use client";

import ScreenContainer from "../_components/screen-container";
import Flashcard from "../_components/flashcard";
import { Separator } from "@/components/ui/separator";
import {
  type FlashcardAnswerType,
  type FlashcardAnswerContent,
} from "@prisma/client";
import AnswerPart from "../_components/answer-part";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

type NewFlashcardAnswerPart = Omit<
  FlashcardAnswerContent,
  "id" | "flashcardId"
>;

const DEFAULT_NEW_ANSWER_PART: NewFlashcardAnswerPart = {
  content: "",
  type: "TEXT",
};

export default function CreateNewFlashcard() {
  const [answersFocused, setAnswersFocused] = useState(false);
  const [questionContent, setQuestionContent] = useState("");
  const [answerParts, setAnswerParts] = useState<NewFlashcardAnswerPart[]>([
    DEFAULT_NEW_ANSWER_PART,
  ]);

  const findAndUpdateType = useCallback(
    (index: number) => (type: FlashcardAnswerType) => {
      const answers = [...answerParts];

      if (!!answers[index]) {
        answers[index] = { ...answers[index], type };
        setAnswerParts(answers);
      }
    },
    [answerParts],
  );

  const findAndUpdateContent = useCallback(
    (index: number) => (content: string) => {
      const answers = [...answerParts];

      if (!!answers[index]) {
        answers[index] = { ...answers[index], content };
        setAnswerParts(answers);
      }
    },
    [answerParts],
  );

  const findAndDelete = useCallback(
    (index: number) => {
      const answers = [...answerParts];

      if (!!answers[index]) {
        answers.splice(index, 1);
        setAnswerParts(answers);
      }
    },
    [answerParts],
  );

  return (
    <ScreenContainer>
      <div className="flex w-full flex-row gap-x-4">
        <div
          className="flex w-full flex-grow items-center justify-center"
          onClick={() => setAnswersFocused(false)}
        >
          <Flashcard isFlipped={answersFocused}>
            <div className="w-full px-6">
              <Input
                value={questionContent}
                onChange={(event) => setQuestionContent(event.target.value)}
                placeholder="Question"
                className="font-semibold"
              />
            </div>
          </Flashcard>
        </div>
        <Separator orientation="vertical" className="h-[800px]" />
        <div
          className="flex max-h-screen w-full flex-grow flex-col gap-y-4 overflow-y-auto px-2 py-4"
          onFocus={() => setAnswersFocused(true)}
        >
          {answerParts.map((answerPart, index) => (
            <AnswerPart
              key={index}
              index={index}
              onContentChange={findAndUpdateContent(index)}
              content={answerPart.content}
              onTypeChange={findAndUpdateType(index)}
              onDelete={() => findAndDelete(index)}
              type={answerPart.type}
            />
          ))}
          <div
            className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-200 py-2 text-slate-200 hover:border-slate-400 hover:text-slate-400"
            onClick={() =>
              setAnswerParts((answerParts) => [
                ...answerParts,
                DEFAULT_NEW_ANSWER_PART,
              ])
            }
          >
            <PlusCircle />
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}
