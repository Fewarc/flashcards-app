export const config = {
  routes: {
    CREATE_NEW_FLASHCARD: "create-new-flashcard",
    LEARN: "learn",
  },
};

export const flashcard_categories = [
  "general",
  "javascript",
  "typescript",
  "git",
  "nextjs",
] as const;

export const flashcard_categories_data: Record<
  (typeof flashcard_categories)[number],
  { name: string; icon: string | null }
> = {
  general: { name: "General", icon: null },
  git: { name: "Git", icon: "git.png" },
  javascript: { name: "JavaScript", icon: "javascript.png" },
  nextjs: { name: "NextJS", icon: "nextjs.png" },
  typescript: { name: "TypeScript", icon: "typescript.png" },
};
