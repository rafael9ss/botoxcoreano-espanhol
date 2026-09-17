"use client";

import Logo from "../Logo";
import OptionCard from "../OptionCard";
import { copy } from "@/lib/copy";

export default function DailyTimeScreen({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <Logo compact />
      <h1 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        {copy.dailyTime.title}
      </h1>
      <p className="text-center text-gray-500 text-sm mb-6">
        {copy.dailyTime.subtitle}
      </p>
      <div className="flex flex-col gap-3">
        {copy.dailyTime.options.map((opt) => (
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
