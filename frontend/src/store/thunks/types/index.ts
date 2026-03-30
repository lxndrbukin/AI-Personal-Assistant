export const Priority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export type NoteCreate = {
  title: number;
  desc: string | undefined;
  priority: Priority;
};
