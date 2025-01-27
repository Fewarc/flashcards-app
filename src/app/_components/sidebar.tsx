"use client";

import { Separator } from "@/components/ui/separator";
import { config, flashcard_categories_data } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Code, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {
  className?: string;
}

const ICON_SIZE = 36;

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "fixed flex h-screen w-14 flex-col items-center gap-y-4 bg-black pt-6 text-white",
        className,
      )}
    >
      <Link className="mb-6 text-5xl font-extrabold" href="/">
        f
      </Link>
      <Link href={config.routes.CREATE_NEW_FLASHCARD}>
        <PlusCircle size={ICON_SIZE} />
      </Link>
      <div className="w-full px-2">
        <Separator />
      </div>
      {Object.entries(flashcard_categories_data).map(([key, category]) => (
        <Link key={key} href={`${config.routes.LEARN}/${key}`}>
          {!!category.icon ? (
            <Image
              src={`/${category.icon}`}
              alt={`${category.name} icon`}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          ) : (
            <Code size={ICON_SIZE} />
          )}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
