import Image from "next/image";
import { BRAND, BRAND_TAG } from "@/lib/copy";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-col items-center ${compact ? "mb-2" : "mb-4"}`}>
      <Image
        src="/images/logo.svg"
        alt={BRAND}
        width={compact ? 56 : 72}
        height={compact ? 56 : 72}
        className="mb-1"
        priority
      />
      <p
        className="font-serif text-gold-600 tracking-wide"
        style={{ fontSize: compact ? "0.95rem" : "1.05rem", color: "#C5A059" }}
      >
        {BRAND}
      </p>
      <p className="text-xs tracking-widest" style={{ color: "#C5A059" }}>
        {BRAND_TAG}
      </p>
    </div>
  );
}
