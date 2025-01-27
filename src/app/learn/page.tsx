import { config, flashcard_categories_data } from "@/lib/config";
import ScreenContainer from "../_components/screen-container";
import { Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FlashcardCategory } from "@/types";

const ICON_SIZE = 64;

export default async function Learn() {
  return (
    <ScreenContainer>
      <h1 className="text-6xl font-semibold">Learn</h1>
      <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {Object.entries(flashcard_categories_data).map(([key, category]) => (
          <Link
            key={key}
            href={`${config.routes.LEARN}/${key}`}
            className="flex flex-col items-center gap-y-2"
          >
            {!!category.icon ? (
              <Image
                src={`/${(key as FlashcardCategory) === "nextjs" ? category.iconDark : category.icon}`}
                alt={`${category.name} icon`}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
            ) : (
              <Code size={ICON_SIZE} />
            )}
            <p className="font-semibold">{category.name}</p>
          </Link>
        ))}
      </div>
    </ScreenContainer>
  );
}
