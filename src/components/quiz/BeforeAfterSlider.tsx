"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "ANTES",
  afterLabel = "DESPUÉS",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, x)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg select-none touch-none cursor-ew-resize bg-gray-200"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* After (full) */}
        <Image
          src={afterSrc}
          alt={afterLabel}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 480px) 100vw, 420px"
          draggable={false}
          priority
        />

        {/* Before (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeLabel}
            fill
            className="object-cover"
            sizes="(max-width: 480px) 100vw, 420px"
            draggable={false}
            priority
          />
        </div>

        {/* Divider + handle */}
        <div
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-0.5 h-full bg-white shadow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-700">
              <path d="M8 12H4M4 12L7 9M4 12L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 12H20M20 12L17 9M20 12L17 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-2 px-1">
        <span className="text-sm font-bold tracking-wide" style={{ color: "#C5A059" }}>
          {beforeLabel}
        </span>
        <span className="text-sm font-bold tracking-wide" style={{ color: "#C5A059" }}>
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
