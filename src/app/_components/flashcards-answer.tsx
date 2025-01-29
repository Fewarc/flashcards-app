import { type FlashcardAnswerContent } from "@prisma/client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MarkdownPreview from "@uiw/react-markdown-preview";
const rehypeHighlight = require("rehype-highlight").default;

interface FlashcardAnswerProps {
  answer: FlashcardAnswerContent[];
  question: string;
  onReveal: () => void;
  revealed?: boolean;
}

const FlashcardsAnswer: React.FC<FlashcardAnswerProps> = ({
  answer,
  question,
  onReveal,
  revealed = false,
}) => {
  return (
    <div className="relative flex flex-col">
      <p className="mb-4 text-justify text-2xl font-semibold">{question}</p>
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
            <MarkdownPreview
              source={answerPart.content}
              rehypePlugins={[rehypeHighlight]}
            />
          </div>
        ),
      )}
      {!revealed && (
        <div
          className="absolute left-0 top-0 h-full w-full cursor-pointer rounded-lg backdrop-blur-md"
          onClick={onReveal}
        ></div>
      )}
    </div>
  );
};

export default FlashcardsAnswer;
