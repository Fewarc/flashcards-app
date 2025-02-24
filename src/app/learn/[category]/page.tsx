"use client";

import Flashcard from "@/app/_components/flashcard";
import FlashcardsAnswer from "@/app/_components/flashcards-answer";
import ScreenContainer from "@/app/_components/screen-container";
import SpinnerLoader from "@/app/_components/spinner-loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { type FlashcardCategory } from "@/types";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { useEffect, useState } from "react";

interface LearnProps {
  params: Promise<{ category: FlashcardCategory }>;
}

const Learn: React.FC<LearnProps> = ({ params }) => {
  const [category, setCategory] = useState<FlashcardCategory | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [flashcards, setFlashcards] = useState<typeof savedFlashcards>();
  const [cursor, setCursor] = useState(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const { data: savedFlashcards, isPending: loading } =
    api.flashcard.findByCategory.useQuery(
      {
        category: category!,
      },
      {
        enabled: !!category && isStarted,
        refetchOnWindowFocus: false,
      },
    );

  useEffect(() => {
    void (async function () {
      const category = (await params).category;
      setCategory(category);
    })();
  }, [params]);

  useEffect(() => {
    setFlashcards(savedFlashcards);
  }, [savedFlashcards]);

  const shuffleFlashcards = () => {
    if (flashcards) {
      const shuffledFlashcards = [
        ...flashcards.sort(() => 0.5 - Math.random()),
      ];
      setAnswerRevealed(false);
      setFlashcards(shuffledFlashcards);
      setCursor(0);
    }
  };

  const incrementCursor = () => {
    setAnswerRevealed(false);
    setCursor(cursor + 1);
  };

  const decrementCursor = () => {
    setAnswerRevealed(false);
    setCursor(cursor - 1);
  };

  return (
    <ScreenContainer>
      <div className="flex w-full flex-row gap-x-4">
        {isStarted ? (
          loading || !flashcards ? (
            <SpinnerLoader className="absolute left-1/2 top-1/2" />
          ) : (
            <div className="flex w-fit flex-col items-center justify-center">
              <div className="flex flex-col gap-y-10">
                <div className="flex flex-row items-center gap-x-4">
                  <Button
                    onClick={decrementCursor}
                    disabled={!flashcards.length || cursor === 0}
                    variant="ghost"
                  >
                    <ChevronLeft size={32} />
                  </Button>
                  {!!flashcards[cursor] && (
                    <Flashcard
                      isFlipped={answerRevealed}
                      onClick={() => setAnswerRevealed(!answerRevealed)}
                      category={
                        flashcards[cursor]?.category as FlashcardCategory
                      }
                      className="cursor-pointer"
                    >
                      <div className="px-4 text-justify font-semibold">
                        {flashcards[cursor]?.question}
                      </div>
                    </Flashcard>
                  )}
                  <Button
                    onClick={incrementCursor}
                    disabled={
                      !flashcards.length || cursor === flashcards.length - 1
                    }
                    variant="ghost"
                  >
                    <ChevronRight size={32} />
                  </Button>
                </div>
                <div className="flex w-full items-center justify-center gap-x-10">
                  <p className="text-center">
                    {cursor + 1} of {flashcards.length}
                  </p>
                  <Button onClick={shuffleFlashcards}>
                    <Shuffle />
                  </Button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="flex w-full justify-center">
            <Button onClick={() => setIsStarted(true)}>Start</Button>
          </div>
        )}
        {isStarted && !loading && (
          <Separator orientation="vertical" className="my-auto h-[800px]" />
        )}
        {isStarted && (
          <div className="flex max-h-screen w-full flex-grow flex-col gap-y-4 overflow-visible overflow-y-auto px-8 py-4">
            {flashcards && flashcards[cursor] && (
              <FlashcardsAnswer
                answer={flashcards[cursor]?.answer}
                question={flashcards[cursor].question}
                onReveal={() => isStarted && setAnswerRevealed(true)}
                revealed={answerRevealed}
              />
            )}
          </div>
        )}
      </div>
    </ScreenContainer>
  );
};

export default Learn;
