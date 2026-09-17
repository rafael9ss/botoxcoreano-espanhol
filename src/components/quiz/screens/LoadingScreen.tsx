"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { copy } from "@/lib/copy";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [percent, setPercent] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [carousel, setCarousel] = useState(0);
  const testimonials = copy.loading.testimonials;
  const steps = copy.loading.steps;

  useEffect(() => {
    const duration = 6500;
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / duration) * 100);
      setPercent(Math.floor(p));
      if (p < 33) setStepIdx(0);
      else if (p < 66) setStepIdx(1);
      else setStepIdx(2);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(onDone, 400);
      }
    }, 50);
    return () => clearInterval(id);
  }, [onDone]);

  useEffect(() => {
    const id = setInterval(() => {
      setCarousel((c) => (c + 1) % testimonials.length);
    }, 2200);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const stepPercents = steps.map((_, i) => {
    if (i < stepIdx) return 100;
    if (i === stepIdx) {
      if (stepIdx === 0) return Math.min(100, percent * 3);
      if (stepIdx === 1) return Math.min(100, (percent - 33) * 3);
      return Math.min(100, (percent - 66) * 3);
    }
    return 0;
  });

  const current = testimonials[carousel];

  return (
    <div className="animate-fade-in flex flex-col items-center">
      <div
        className="w-12 h-12 rounded-full border-4 animate-spin mb-4"
        style={{ borderColor: "#E8D5A8", borderTopColor: "transparent", borderRightColor: "#C5A059", borderBottomColor: "#C5A059", borderLeftColor: "#C5A059" }}
      />
      <h1 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-5">
        {copy.loading.headline}
      </h1>

      {/* Before/after carousel */}
      <div className="relative w-full max-w-xs rounded-2xl overflow-hidden shadow-md mb-6 bg-gray-100">
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i === carousel ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
        <div className="grid grid-cols-2">
          <div className="relative aspect-[3/4]">
            <Image
              src={current.before}
              alt="Antes"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
          <div className="relative aspect-[3/4]">
            <Image
              src={current.after}
              alt="Después"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        </div>
        <div
          className="flex items-center justify-between px-3 py-2 text-white text-xs font-bold tracking-wide"
          style={{
            background: "linear-gradient(90deg, #C5A059, #D4AF37, #C5A059)",
          }}
        >
          <span>ANTES</span>
          <span className="text-sm">→</span>
          <span>DESPUÉS</span>
        </div>
      </div>

      {/* Step progress list */}
      <div className="w-full space-y-3 mb-4">
        {steps.map((label, i) => {
          const active = i <= stepIdx;
          const pct = Math.floor(stepPercents[i]);
          return (
            <div key={label} className={active ? "opacity-100" : "opacity-40"}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-800 font-medium">{label}</span>
                <span style={{ color: "#C5A059" }} className="font-semibold">
                  {pct}%{pct >= 100 ? " ✓" : ""}
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${pct}%`,
                    background: "linear-gradient(90deg, #C5A059, #E8C87A)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom status */}
      <div className="w-full flex items-center gap-2 mt-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
        <span
          className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs shrink-0"
          style={{ background: "#3B82F6" }}
        >
          ↻
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-800 font-medium truncate">
            {steps[stepIdx]}{" "}
            <span style={{ color: "#C5A059" }}>{percent}%</span>
          </p>
          <div className="h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${percent}%`,
                background: "linear-gradient(90deg, #C5A059, #E8C87A)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
