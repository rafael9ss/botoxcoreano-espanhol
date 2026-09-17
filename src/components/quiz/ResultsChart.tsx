"use client";

import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";

/** Animated SVG comparison chart — gold vs purple */
export default function ResultsChart() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Week points: start same, gold shoots up, purple flattens
  const weeks = [0, 1, 2, 3, 4];
  const goldY = [85, 72, 50, 28, 12]; // inverted (SVG y)
  const purpleY = [85, 78, 72, 68, 65];

  const toPath = (ys: number[]) =>
    weeks
      .map((w, i) => {
        const x = 40 + w * 55;
        return `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`;
      })
      .join(" ");

  const toArea = (ys: number[]) => {
    const line = toPath(ys);
    const lastX = 40 + 4 * 55;
    return `${line} L ${lastX} 95 L 40 95 Z`;
  };

  return (
    <div className="rounded-2xl bg-gray-50 p-4 sm:p-5 border border-gray-100">
      <h3 className="text-center font-bold text-gray-900 text-sm sm:text-base mb-3">
        {copy.chart.chartTitle}
      </h3>
      <svg viewBox="0 0 280 120" className="w-full h-auto" role="img" aria-label={copy.chart.chartTitle}>
        {/* Axes */}
        <line x1="35" y1="10" x2="35" y2="95" stroke="#222" strokeWidth="1.5" />
        <line x1="35" y1="95" x2="265" y2="95" stroke="#222" strokeWidth="1.5" />
        <polygon points="35,6 32,14 38,14" fill="#222" />
        <polygon points="268,95 260,92 260,98" fill="#222" />

        {/* Purple area + line */}
        <path
          d={toArea(purpleY)}
          fill="rgba(147, 51, 234, 0.12)"
          style={{
            opacity: animate ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        />
        <path
          d={toPath(purpleY)}
          fill="none"
          stroke="#9333EA"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 400,
            strokeDashoffset: animate ? 0 : 400,
            transition: "stroke-dashoffset 1.4s ease 0.15s",
          }}
        />
        {weeks.map((w, i) => (
          <circle
            key={`p-${w}`}
            cx={40 + w * 55}
            cy={purpleY[i]}
            r={animate ? 4 : 0}
            fill="#fff"
            stroke="#9333EA"
            strokeWidth="2"
            style={{ transition: `r 0.3s ease ${0.4 + i * 0.15}s` }}
          />
        ))}

        {/* Gold area + line */}
        <path
          d={toArea(goldY)}
          fill="url(#goldFill)"
          style={{
            opacity: animate ? 1 : 0,
            transition: "opacity 0.8s ease 0.35s",
          }}
        />
        <path
          d={toPath(goldY)}
          fill="none"
          stroke="#C5A059"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 400,
            strokeDashoffset: animate ? 0 : 400,
            transition: "stroke-dashoffset 1.6s ease 0.3s",
            filter: "drop-shadow(0 0 4px rgba(197,160,89,0.5))",
          }}
        />
        {weeks.map((w, i) => (
          <circle
            key={`g-${w}`}
            cx={40 + w * 55}
            cy={goldY[i]}
            r={animate ? 4.5 : 0}
            fill="#fff"
            stroke="#C5A059"
            strokeWidth="2.5"
            style={{ transition: `r 0.3s ease ${0.5 + i * 0.15}s` }}
          />
        ))}

        <defs>
          <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C5A059" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C5A059" stopOpacity="0.02" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex items-center justify-center gap-5 mt-2 text-xs sm:text-sm text-gray-700">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#C5A059" }} />
          {copy.chart.legendUs}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
          {copy.chart.legendOther}
        </span>
      </div>
    </div>
  );
}
