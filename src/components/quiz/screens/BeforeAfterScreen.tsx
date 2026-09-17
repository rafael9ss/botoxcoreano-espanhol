"use client";

import BeforeAfterSlider from "../BeforeAfterSlider";
import { copy } from "@/lib/copy";

export default function BeforeAfterScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="animate-fade-in">
      <h1
        className="text-center text-xl sm:text-2xl font-bold leading-snug mb-2"
        style={{ color: "#C5A059" }}
      >
        {copy.beforeAfter.title}
      </h1>
      <p className="text-center text-gray-500 text-sm mb-5">
        {copy.beforeAfter.subtitle}
      </p>

      <BeforeAfterSlider
        beforeSrc="/images/before.jpg"
        afterSrc="/images/after.jpg"
        beforeLabel={copy.beforeAfter.antes}
        afterLabel={copy.beforeAfter.despues}
      />

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-gray-900 text-sm">
            {copy.beforeAfter.name}
          </span>
          <span className="text-amber-400 text-sm tracking-tight">★★★★★</span>
        </div>
        <p className="text-sm text-gray-600 italic leading-relaxed">
          &ldquo;{copy.beforeAfter.quote}&rdquo;
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="mt-6 w-full py-3.5 rounded-xl font-semibold text-white shadow-md active:scale-[0.98] transition"
        style={{
          background: "linear-gradient(135deg, #C5A059, #D4AF37, #B8943F)",
        }}
      >
        {copy.beforeAfter.cta}
      </button>
    </div>
  );
}
