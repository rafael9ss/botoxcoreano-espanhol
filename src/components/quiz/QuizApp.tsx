"use client";

import { useCallback, useState } from "react";
import {
  QuizAnswers,
  QuizStep,
  STEP_ORDER,
  STEP_PROGRESS,
  STEPS_WITH_BACK,
} from "@/lib/types";
import ProgressBar from "./ProgressBar";
import BackButton from "./BackButton";
import SplashScreen from "./screens/SplashScreen";
import AgeScreen from "./screens/AgeScreen";
import SkinScreen from "./screens/SkinScreen";
import GoalScreen from "./screens/GoalScreen";
import FaceAreaScreen from "./screens/FaceAreaScreen";
import BeforeAfterScreen from "./screens/BeforeAfterScreen";
import DailyTimeScreen from "./screens/DailyTimeScreen";
import SkincareScreen from "./screens/SkincareScreen";
import ChartScreen from "./screens/ChartScreen";
import LoadingScreen from "./screens/LoadingScreen";
import ResultScreen from "./screens/ResultScreen";
import VideoScreen from "./screens/VideoScreen";

export default function QuizApp() {
  const [step, setStep] = useState<QuizStep>("splash");
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const goTo = useCallback((next: QuizStep) => {
    setStep(next);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const goNext = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) goTo(STEP_ORDER[idx + 1]);
  }, [step, goTo]);

  const goBack = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) goTo(STEP_ORDER[idx - 1]);
  }, [step, goTo]);

  const selectAndAdvance = useCallback(
    (key: keyof QuizAnswers, value: string) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
      window.setTimeout(() => {
        const idx = STEP_ORDER.indexOf(step);
        if (idx < STEP_ORDER.length - 1) goTo(STEP_ORDER[idx + 1]);
      }, 180);
    },
    [step, goTo]
  );

  const showProgress = step !== "splash";
  const showBack = STEPS_WITH_BACK.includes(step);

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto w-full max-w-[440px] min-h-screen px-4 pb-10 pt-3">
        {showProgress && (
          <div className="mb-3">
            <ProgressBar progress={STEP_PROGRESS[step]} />
          </div>
        )}

        {showBack && (
          <div className="mb-2">
            <BackButton onClick={goBack} />
          </div>
        )}

        <div key={step}>
          {step === "splash" && <SplashScreen onDone={goNext} />}
          {step === "age" && (
            <AgeScreen onSelect={(id) => selectAndAdvance("age", id)} />
          )}
          {step === "skin" && (
            <SkinScreen onSelect={(id) => selectAndAdvance("skin", id)} />
          )}
          {step === "goal" && (
            <GoalScreen onSelect={(id) => selectAndAdvance("goal", id)} />
          )}
          {step === "faceArea" && (
            <FaceAreaScreen
              onSelect={(id) => selectAndAdvance("faceArea", id)}
            />
          )}
          {step === "beforeAfter" && <BeforeAfterScreen onNext={goNext} />}
          {step === "dailyTime" && (
            <DailyTimeScreen
              onSelect={(id) => selectAndAdvance("dailyTime", id)}
            />
          )}
          {step === "skincare" && (
            <SkincareScreen
              onSelect={(id) => selectAndAdvance("skincare", id)}
            />
          )}
          {step === "chart" && <ChartScreen onNext={goNext} />}
          {step === "loading" && <LoadingScreen onDone={goNext} />}
          {step === "result" && <ResultScreen onNext={goNext} />}
          {step === "video" && <VideoScreen />}
        </div>

        <span className="sr-only" data-answers={JSON.stringify(answers)} />
      </div>
    </div>
  );
}
