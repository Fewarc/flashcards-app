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
import { ChevronDown, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { flashcard_categories_data } from "@/lib/config";
import { type FlashcardCategory } from "@/types";
import { api } from "@/trpc/react";
import MDEditor from "@uiw/react-md-editor";
import { Toggle } from "@/components/ui/toggle";

type NewFlashcardAnswerPart = Omit<
  FlashcardAnswerContent,
  "id" | "flashcardId"
>;

type NewFlashCardCategory = Exclude<FlashcardCategory, "all">;

type AnswerType = "markdown" | "defualt";

const DEFAULT_NEW_ANSWER_PART: NewFlashcardAnswerPart = {
  content: "",
  type: "TEXT",
};

export default function CreateNewFlashcard() {
  const [flashcardCategory, setFlashcardCategory] =
    useState<NewFlashCardCategory>("javascript");
  const [answersFocused, setAnswersFocused] = useState(false);
  const [questionContent, setQuestionContent] = useState("");
  const [answerParts, setAnswerParts] = useState<NewFlashcardAnswerPart[]>([
    DEFAULT_NEW_ANSWER_PART,
  ]);
  const [markdown, setMarkdown] = useState<string | undefined>();
  const [answerType, setAnswerType] = useState<AnswerType>("markdown");

  // eslint-disable-next-line @typescript-eslint/unbound-method
  // const { push } = useRouter();

  // TODO: fix - strategy
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

  const reset = () => {
    setAnswerParts([DEFAULT_NEW_ANSWER_PART]);
    setQuestionContent("");
    setMarkdown(undefined);
  };

  const { mutate: createFlashcard, isPending: loading } =
    api.flashcard.create.useMutation({
      onSuccess: () => {
        // push(`${config.routes.LEARN}/${flashcardCategory}`);
        reset();
      },
    });

  return (
    <ScreenContainer>
      <div className="flex w-full flex-row gap-x-4">
        <div
          className="flex w-full flex-grow flex-col items-center justify-center"
          onClick={() => setAnswersFocused(false)}
        >
          <Input
            value={questionContent}
            onChange={(event) => setQuestionContent(event.target.value)}
            placeholder="Question"
            className="mb-8 font-semibold"
          />
          <Flashcard isFlipped={answersFocused}>
            <div className="w-full px-4 text-justify font-semibold">
              {questionContent}
            </div>
          </Flashcard>
          <div className="mt-8 flex flex-row items-center gap-x-4">
            <Button
              onClick={() =>
                createFlashcard({
                  question: questionContent,
                  catagory: flashcardCategory,
                  answer:
                    answerType === "markdown"
                      ? [
                          {
                            content: markdown ?? "",
                            type: "MARKDDOWN",
                          },
                        ]
                      : answerParts,
                })
              }
              loading={loading}
              disabled={
                !questionContent.length ||
                (answerType === "defualt" &&
                  (answerParts.some(
                    (answerPart) => !answerPart.content.length,
                  ) ||
                    !answerParts.length)) ||
                (answerType === "markdown" && !markdown?.length)
              }
            >
              Save
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex flex-row gap-x-4">
                  <p>{flashcard_categories_data[flashcardCategory].name}</p>
                  <ChevronDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  {Object.entries(flashcard_categories_data).map(
                    ([key, category]) => (
                      <DropdownMenuItem
                        key={key}
                        onClick={() =>
                          setFlashcardCategory(key as NewFlashCardCategory)
                        }
                        className="cursor-pointer"
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator orientation="vertical" className="my-auto h-[800px]" />
        <div
          className="flex max-h-screen w-full flex-grow flex-col gap-y-4 overflow-y-auto px-2 py-4"
          onFocus={() => setAnswersFocused(true)}
        >
          <div className="flex flex-row gap-x-4">
            <Toggle
              pressed={answerType === "defualt"}
              variant="outline"
              onClick={() => setAnswerType("defualt")}
            >
              Default
            </Toggle>
            <Toggle
              pressed={answerType === "markdown"}
              variant="outline"
              onClick={() => setAnswerType("markdown")}
            >
              Markdown
            </Toggle>
          </div>
          {answerType === "defualt" ? (
            <>
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
            </>
          ) : (
            <div data-color-mode="light">
              <MDEditor
                height={700}
                value={markdown}
                onChange={setMarkdown}
                preview="edit"
              />
            </div>
          )}
        </div>
      </div>
    </ScreenContainer>
  );
}
