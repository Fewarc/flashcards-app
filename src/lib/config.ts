export const config = {
  routes: {
    CREATE_NEW_FLASHCARD: "/create-new-flashcard",
    LEARN: "/learn",
  },
};

export const flashcard_categories = [
  "all",
  "javascript",
  "typescript",
  "git",
  "nextjs",
  "react",
  "css",
  "other",
] as const;

export const flashcard_categories_data: Record<
  (typeof flashcard_categories)[number],
  { name: string; icon: string | null; iconDark?: string }
> = {
  all: { name: "All", icon: null },
  git: { name: "Git", icon: "git.png" },
  javascript: { name: "JavaScript", icon: "javascript.png" },
  nextjs: { name: "NextJS", icon: "nextjs.png", iconDark: "nextjs_dark.png" },
  typescript: { name: "TypeScript", icon: "typescript.png" },
  react: { name: "React", icon: "react.png" },
  css: { name: "CSS", icon: "css.png" },
  other: { name: "Other", icon: "other.png" },
};
