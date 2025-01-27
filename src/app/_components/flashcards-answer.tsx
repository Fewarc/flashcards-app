import { type FlashcardAnswerContent } from "@prisma/client";

interface FlashcardAnswerProps {
  answer: FlashcardAnswerContent[];
  revealed?: boolean;
  className?: string;
}

const FlashcardsAnswer: React.FC<FlashcardAnswerProps> = ({
  answer,
  revealed = false,
  className,
}) => {
  return (
    <div className="flex flex-col">
      {answer.map((answerPart) =>
        answerPart.type === "TEXT" ? (
          <p key={answerPart.id} className="my-1">
            {answerPart.content}
          </p>
        ) : (
          <pre key={answerPart.id} className="my-2">
            {answerPart.content}
          </pre>
        ),
      )}
    </div>
  );
};

export default FlashcardsAnswer;
