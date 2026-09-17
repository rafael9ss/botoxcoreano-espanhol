"use client";

import Logo from "../Logo";
import ResultsChart from "../ResultsChart";
import { copy } from "@/lib/copy";

export default function ChartScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="animate-fade-in">
      <Logo compact />
      <h1
        className="text-center text-xl sm:text-2xl font-bold leading-snug mb-2"
        style={{
          background: "linear-gradient(135deg, #C5A059, #E8C87A, #A8843A)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {copy.chart.title}
      </h1>
      <p className="text-center text-gray-600 text-sm mb-5 leading-relaxed">
        {copy.chart.subtitle}
      </p>
      <ResultsChart />
      <button
        type="button"
        onClick={onNext}
        className="mt-6 w-full py-3.5 rounded-xl font-semibold text-white shadow-md active:scale-[0.98] transition"
        style={{
          background: "linear-gradient(135deg, #C5A059, #D4AF37, #B8943F)",
        }}
      >
        {copy.chart.cta}
      </button>
    </div>
  );
}
