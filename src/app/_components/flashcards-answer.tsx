import { type FlashcardAnswerContent } from "@prisma/client";
import MDEditor from "@uiw/react-md-editor";

interface FlashcardAnswerProps {
  answer: FlashcardAnswerContent[];
  revealed?: boolean;
}

const FlashcardsAnswer: React.FC<FlashcardAnswerProps> = ({
  answer,
  revealed = false,
}) => {
  return (
    <div className="flex flex-col">
      {answer.map((answerPart) =>
        answerPart.type === "TEXT" ? (
          <p key={answerPart.id} className="my-1">
            {answerPart.content}
          </p>
        ) : answerPart.type === "LISTING" ? (
          <pre key={answerPart.id} className="my-2">
            {answerPart.content}
          </pre>
        ) : (
          <div data-color-mode="light" key={answerPart.id}>
            <MDEditor
              height={700}
              value={answerPart.content}
              preview="preview"
              hideToolbar
            />
          </div>
        ),
      )}
      {!revealed && (
        <div className="absolute left-0 top-0 h-full w-full rounded-lg backdrop-blur-md"></div>
      )}
    </div>
  );
};

export default FlashcardsAnswer;
