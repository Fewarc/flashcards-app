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
      setFlashcards(shuffledFlashcards);
      setCursor(0);
    }
  };

  console.log(savedFlashcards);

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
        <div className="flex w-full flex-grow flex-col items-center justify-center">
          {isStarted ? (
            loading || !flashcards ? (
              <SpinnerLoader />
            ) : (
              <div className="flex flex-col gap-y-10">
                <div className="flex flex-row items-center gap-x-4">
                  <Button
                    onClick={decrementCursor}
                    disabled={cursor === 0}
                    variant="ghost"
                  >
                    <ChevronLeft size={32} />
                  </Button>
                  <Flashcard
                    isFlipped={answerRevealed}
                    onClick={() => setAnswerRevealed(!answerRevealed)}
                    className="cursor-pointer"
                  >
                    {flashcards[cursor]?.question}
                  </Flashcard>
                  <Button
                    onClick={incrementCursor}
                    disabled={cursor === flashcards.length - 1}
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
            )
          ) : (
            <Button onClick={() => setIsStarted(true)}>Start</Button>
          )}
        </div>
        <Separator orientation="vertical" className="my-auto h-[800px]" />
        <div className="relative flex max-h-screen w-full flex-grow flex-col gap-y-4 overflow-visible overflow-y-auto px-2 py-4">
          {flashcards && flashcards[cursor] && (
            <FlashcardsAnswer
              answer={flashcards[cursor]?.answer}
              revealed={answerRevealed}
            />
          )}
        </div>
      </div>
    </ScreenContainer>
  );
};

export default Learn;
