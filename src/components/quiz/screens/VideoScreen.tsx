"use client";

import { copy } from "@/lib/copy";

export default function VideoScreen() {
  return (
    <div className="animate-fade-in text-center">
      <h1
        className="text-xl sm:text-2xl font-bold leading-snug mb-2"
        style={{ color: "#C5A059" }}
      >
        {copy.video.title}
      </h1>
      <p className="text-gray-500 text-sm mb-6">{copy.video.subtitle}</p>

      {/* 9:16 placeholder */}
      <div
        className="relative mx-auto w-full max-w-[280px] rounded-2xl border-2 border-dashed overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center"
        style={{ aspectRatio: "9 / 16", borderColor: "#C5A059" }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
          style={{ background: "rgba(197,160,89,0.15)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#C5A059">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="font-semibold text-gray-700">{copy.video.placeholder}</p>
        <p className="text-xs text-gray-400 mt-2 px-6 leading-relaxed">
          {copy.video.placeholderHint}
        </p>
      </div>

      <p className="mt-5 text-sm text-gray-600">{copy.video.teaser}</p>
      <p className="mt-2 text-xs text-gray-400">{copy.video.secure}</p>
    </div>
  );
}
