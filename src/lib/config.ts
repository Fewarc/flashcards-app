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
  "docker",
  "aws",
  "frontend",
  "js-roadmap",
  "react-roadmap",
  "ts-roadmap",
  "nodejs-roadmap",
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
  css: { name: "CSS", icon: "css.png", iconDark: "css_dark.png" },
  docker: { name: "Docker", icon: "docker.png" },
  aws: { name: "AWS", icon: "aws.png" },
  frontend: { name: "Front-end", icon: "front-end.png" },
  "js-roadmap": { name: "JS-roadmap", icon: "javascript-roadmap.png" },
  "react-roadmap": { name: "React-roadmap", icon: "react-roadmap.png" },
  "ts-roadmap": { name: "TS-roadmap", icon: "typescript-roadmap.png" },
  "nodejs-roadmap": { name: "Node.js-roadmap", icon: "nodejs-roadmap.png" },
  other: { name: "Other", icon: "other.png" },
};
