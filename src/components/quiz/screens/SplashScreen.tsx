"use client";

import { useEffect, useState } from "react";
import Logo from "../Logo";
import { copy } from "@/lib/copy";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2800;
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(onDone, 200);
      }
    }, 40);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center animate-fade-in">
      <Logo />
      <h1
        className="mt-6 text-2xl sm:text-3xl font-bold leading-tight max-w-sm"
        style={{
          background: "linear-gradient(135deg, #C5A059, #E8C87A, #A8843A)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {copy.splash.headline}
      </h1>
      <p className="mt-3 text-gray-500 text-sm max-w-xs">{copy.splash.sub}</p>

      <div className="w-full max-w-xs mt-10">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #C5A059, #E8C87A)",
            }}
          />
        </div>
        <p className="mt-3 text-xs text-gray-400">{copy.splash.loading}</p>
      </div>

      <div className="mt-8 rounded-xl bg-white border border-gray-100 shadow-sm p-3 max-w-xs text-left">
        <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
          {"★★★★★"}
        </div>
        <p className="text-xs text-gray-600 italic">
          &ldquo;En 3 semanas mi piel se veía 10 años más joven. ¡Increíble!&rdquo;
        </p>
        <p className="text-[11px] text-gray-400 mt-1">— Patricia, 51 años</p>
      </div>
    </div>
  );
}
