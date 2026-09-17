"use client";

import Logo from "../Logo";
import OptionCard from "../OptionCard";
import { copy } from "@/lib/copy";

export default function SkincareScreen({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <Logo compact />
      <h1 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        {copy.skincare.title}
      </h1>
      <div className="flex flex-col gap-3">
        {copy.skincare.options.map((opt) => (
          <OptionCard
            key={opt.id}
            label={opt.label}
            emoji={opt.emoji}
            onClick={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}
