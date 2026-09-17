"use client";

interface OptionCardProps {
  label: string;
  emoji?: string;
  selected?: boolean;
  onClick: () => void;
  large?: boolean;
}

export default function OptionCard({
  label,
  emoji,
  selected,
  onClick,
  large,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl px-4 py-4 text-center font-medium transition-all active:scale-[0.98] ${
        large ? "text-base" : "text-[15px]"
      } ${
        selected
          ? "bg-gold-50 border-2 border-gold-500 text-gray-900 shadow-md"
          : "bg-gray-100 border-2 border-transparent text-gray-800 hover:bg-gray-150 hover:shadow-sm"
      }`}
      style={
        selected
          ? { backgroundColor: "#FBF6EB", borderColor: "#C5A059" }
          : { backgroundColor: "#F3F4F6" }
      }
    >
      {emoji ? (
        <span className="inline-flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <span>{label}</span>
        </span>
      ) : (
        label
      )}
    </button>
  );
}
