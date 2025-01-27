import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { type FlashcardAnswerType } from "@prisma/client";
import { ChevronDown, Trash } from "lucide-react";

interface AnswerPartProps {
  onContentChange: (content: string) => void;
  content: string;
  onTypeChange: (type: FlashcardAnswerType) => void;
  type: FlashcardAnswerType;
  index: number;
  onDelete: () => void;
  className?: string;
}

const AnswerPart: React.FC<AnswerPartProps> = ({
  content,
  onContentChange,
  onTypeChange,
  type,
  index,
  onDelete,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex items-center gap-x-2 text-lg font-semibold text-slate-300">
          <p>#{++index}</p>
          <Button
            className="p-0 text-red-600"
            variant="link"
            onClick={onDelete}
          >
            <Trash />
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="py mb-2 flex w-full gap-x-4 rounded-lg pl-4 pr-1">
              <p>{type}</p>
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => onTypeChange("TEXT")}
                className="cursor-pointer"
              >
                Text
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onTypeChange("LISTING")}
                className="cursor-pointer"
              >
                Listing
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Textarea
        value={content}
        onChange={(event) => onContentChange(event.target.value)}
      />
    </div>
  );
};

export default AnswerPart;
