"use client";

import Image from "next/image";
import { copy } from "@/lib/copy";

export default function ResultScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="animate-fade-in">
      <h1 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mb-4">
        {copy.result.title}
      </h1>

      {/* Alert meter */}
      <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4 mb-4">
        <p className="text-sm text-gray-600 mb-1">{copy.result.levelLabel}</p>
        <p className="font-bold text-red-600 text-lg mb-3">{copy.result.alertZone}</p>
        <div className="h-3 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 relative mb-1">
          <span className="absolute right-[8%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-red-600 rounded-full shadow" />
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 px-0.5">
          <span>Bajo</span>
          <span>Medio</span>
          <span>Alto</span>
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-5 bg-amber-50 border border-amber-100 rounded-xl p-3">
        {copy.result.warning}
      </p>

      {/* Face with zones */}
      <div className="relative w-48 h-56 mx-auto mb-5 rounded-2xl overflow-hidden shadow-md">
        <Image
          src="/images/result-face.jpg"
          alt="Zonas de atención"
          fill
          className="object-cover"
          sizes="192px"
        />
        <span className="absolute top-[12%] left-[20%] right-[20%] h-8 bg-purple-400/40 rounded-md" />
        <span className="absolute top-[32%] left-[18%] w-10 h-4 bg-green-300/50 rounded-full" />
        <span className="absolute top-[32%] right-[18%] w-10 h-4 bg-green-300/50 rounded-full" />
        <span className="absolute top-[45%] left-[12%] w-12 h-10 bg-orange-300/40 rounded-lg rotate-[-15deg]" />
        <span className="absolute top-[45%] right-[12%] w-12 h-10 bg-orange-300/40 rounded-lg rotate-[15deg]" />
        <span className="absolute bottom-[28%] left-[15%] right-[15%] h-6 bg-pink-400/35 rounded-full" />
        <span className="absolute bottom-[8%] left-[30%] w-3 h-10 bg-green-300/40 rounded" />
        <span className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-3 h-10 bg-pink-300/40 rounded" />
        <span className="absolute bottom-[8%] right-[30%] w-3 h-10 bg-green-300/40 rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div className="rounded-xl border border-gray-200 p-3 bg-white">
          <p className="font-semibold text-sm mb-2">{copy.result.signsTitle}</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            {copy.result.signs.map((s) => (
              <li key={s}>❌ {s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-green-100 p-3 bg-green-50/40">
          <p className="font-semibold text-sm mb-2">{copy.result.protocolTitle}</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            {copy.result.benefits.map((s) => (
              <li key={s}>✅ {s}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main testimonial */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-sm">{copy.result.testimonial.name}</span>
          <span className="text-amber-400 text-sm">★★★★★</span>
        </div>
        <p className="text-sm text-gray-600 italic leading-relaxed">
          &ldquo;{copy.result.testimonial.quote}&rdquo;
        </p>
      </div>

      <p className="text-sm font-semibold text-gray-800 mb-2">
        {copy.result.liveTitle}
      </p>
      <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
        {copy.result.live.map((t) => (
          <div
            key={t.name}
            className="rounded-lg bg-gray-50 border border-gray-100 p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm text-gray-900">{t.name}</span>
              {"verified" in t && t.verified && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-medium">
                  ✓ Verificada
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 italic">&ldquo;{t.quote}&rdquo;</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full py-3.5 rounded-xl font-semibold text-white shadow-md active:scale-[0.98] transition"
        style={{
          background: "linear-gradient(135deg, #C5A059, #D4AF37, #B8943F)",
        }}
      >
        {copy.result.cta}
      </button>
    </div>
  );
}
