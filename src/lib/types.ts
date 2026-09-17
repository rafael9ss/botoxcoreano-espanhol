export type QuizStep =
  | "splash"
  | "age"
  | "skin"
  | "goal"
  | "faceArea"
  | "beforeAfter"
  | "dailyTime"
  | "skincare"
  | "chart"
  | "loading"
  | "result"
  | "video";

export interface QuizAnswers {
  age?: string;
  skin?: string;
  goal?: string;
  faceArea?: string;
  dailyTime?: string;
  skincare?: string;
}

export const STEP_ORDER: QuizStep[] = [
  "splash",
  "age",
  "skin",
  "goal",
  "faceArea",
  "beforeAfter",
  "dailyTime",
  "skincare",
  "chart",
  "loading",
  "result",
  "video",
];

/** Progress shown on the gold bar (splash & video may hide or max it). */
export const STEP_PROGRESS: Record<QuizStep, number> = {
  splash: 0,
  age: 8,
  skin: 18,
  goal: 28,
  faceArea: 38,
  beforeAfter: 48,
  dailyTime: 58,
  skincare: 68,
  chart: 78,
  loading: 88,
  result: 95,
  video: 100,
};

export const STEPS_WITH_BACK: QuizStep[] = [
  "skin",
  "goal",
  "faceArea",
  "beforeAfter",
  "dailyTime",
  "skincare",
  "chart",
  "loading",
  "result",
];
