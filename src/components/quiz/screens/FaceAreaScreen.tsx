"use client";

import Image from "next/image";
import Logo from "../Logo";
import OptionCard from "../OptionCard";
import { copy } from "@/lib/copy";

export default function FaceAreaScreen({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <Logo compact />
      <h1 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mb-5">
        {copy.faceArea.title}
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <div className="relative w-44 h-56 sm:w-48 sm:h-64 shrink-0 rounded-2xl overflow-hidden shadow-md">
          <Image
            src="/images/face-areas.jpg"
            alt="Áreas del rostro"
            fill
            className="object-cover"
            sizes="192px"
          />
          {/* Dotted circle overlays */}
          <span className="absolute border-2 border-dashed border-white/90 rounded-full w-14 h-10 top-[18%] left-1/2 -translate-x-1/2" />
          <span className="absolute border-2 border-dashed border-white/90 rounded-full w-10 h-8 top-[38%] left-[18%]" />
          <span className="absolute border-2 border-dashed border-white/90 rounded-full w-12 h-10 top-[48%] right-[14%]" />
          <span className="absolute border-2 border-dashed border-white/90 rounded-full w-16 h-8 bottom-[18%] left-1/2 -translate-x-1/2" />
        </div>
        <div className="flex flex-col gap-2.5 w-full">
          {copy.faceArea.options.map((opt) => (
            <OptionCard
              key={opt.id}
              label={opt.label}
              onClick={() => onSelect(opt.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
