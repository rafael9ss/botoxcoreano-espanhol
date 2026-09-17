"use client";

import Image from "next/image";
import Logo from "../Logo";
import { copy } from "@/lib/copy";

export default function AgeScreen({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <Logo />
      <h1 className="text-center text-xl sm:text-2xl font-bold text-gray-900 uppercase tracking-wide">
        {copy.age.title}
      </h1>
      <p className="text-center text-gray-500 text-sm mt-1 mb-6">
        {copy.age.subtitle}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {copy.age.options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            className="flex flex-col items-center bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl p-4 transition active:scale-[0.97] shadow-sm"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 ring-2 ring-gold-200" style={{ boxShadow: "0 0 0 2px #E8D5A8" }}>
              <Image
                src={opt.image}
                alt={opt.label}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <span className="font-bold text-gray-900 text-lg">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
