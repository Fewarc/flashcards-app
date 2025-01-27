"use client";

import { Separator } from "@/components/ui/separator";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "fixed flex h-screen w-14 flex-col items-center gap-y-4 bg-black pt-6 text-white",
        className,
      )}
    >
      <p className="mb-6 text-5xl font-extrabold">f</p>
      <Link href={config.routes.CREATE_NEW_FLASHCARD}>
        <PlusCircle size={36} />
      </Link>
      <div className="w-full px-2">
        <Separator />
      </div>
    </div>
  );
};

export default Sidebar;
