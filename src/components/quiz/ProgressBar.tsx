export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${Math.min(100, Math.max(0, progress))}%`,
          background: "linear-gradient(90deg, #C5A059 0%, #E8C87A 50%, #D4A84B 100%)",
        }}
      />
    </div>
  );
}
