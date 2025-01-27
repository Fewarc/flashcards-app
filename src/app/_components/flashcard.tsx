import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  children?: React.ReactNode;
  isFlipped?: boolean;
  flipOnHover?: boolean;
  answer?: string;
  className?: string;
}

const Flashcard: React.FC<FlashcardProps> = ({
  children = "Question",
  isFlipped = false,
  flipOnHover = false,
  answer = "Answer",
  className,
}) => {
  return (
    <Card
      className={cn(
        "group h-96 min-h-44 w-96 rounded-3xl border-none shadow-none [perspective:1000px]",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d]",
          {
            "[transform:rotateY(180deg)]": isFlipped,
            "group-hover:[transform:rotateY(180deg)]": flipOnHover,
          },
        )}
      >
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
          <div className="flex h-full items-center justify-center">
            {children}
          </div>
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-xl bg-slate-100 px-12 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-full items-center justify-center">
            <p className="text-xl font-semibold">{answer}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Flashcard;
