"use client";

import { useState } from "react";
import type { PricePoint } from "@/data/types";

const WIDTH = 600;
const HEIGHT = 160;
const PAD_X = 8;
const PAD_TOP = 22;
const PAD_BOTTOM = 26;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function PriceHistoryChart({
  history,
  color,
}: {
  history: PricePoint[];
  color: string;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (history.length < 2) {
    return (
      <p className="text-xs text-gray-500">
        Price history will build up here as MacroSaver re-checks this offer.
      </p>
    );
  }

  const prices = history.map((point) => point.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = maxPrice - minPrice;
  const pad = range > 0 ? range * 0.15 : Math.max(1, minPrice * 0.05);
  const domainMin = minPrice - pad;
  const domainRange = maxPrice + pad - domainMin || 1;

  const plotWidth = WIDTH - PAD_X * 2;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const points = history.map((point, i) => ({
    ...point,
    x: PAD_X + (i / (history.length - 1)) * plotWidth,
    y: PAD_TOP + plotHeight - ((point.price - domainMin) / domainRange) * plotHeight,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const baseline = PAD_TOP + plotHeight;
  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${baseline} L${points[0].x.toFixed(1)},${baseline} Z`;

  const first = points[0];
  const last = points[points.length - 1];
  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Price history from ${formatDate(first.date)} at $${first.price.toFixed(2)} to ${formatDate(last.date)} at $${last.price.toFixed(2)}. Range $${minPrice.toFixed(2)} to $${maxPrice.toFixed(2)}.`}
      >
        <path d={areaPath} fill={color} opacity={0.12} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text x={first.x} y={HEIGHT - 8} fontSize={10} fill="#6b7280" textAnchor="start">
          {formatDate(first.date)}
        </text>
        <text x={last.x} y={HEIGHT - 8} fontSize={10} fill="#6b7280" textAnchor="end">
          {formatDate(last.date)}
        </text>
        <text
          x={last.x}
          y={Math.max(PAD_TOP - 8, last.y - 10)}
          fontSize={11}
          fontWeight={700}
          fill={color}
          textAnchor="end"
        >
          ${last.price.toFixed(2)}
        </text>

        {points.map((p, i) => (
          <g key={`${p.date}-${i}`}>
            <circle cx={p.x} cy={p.y} r={3} fill={color} />
            <circle
              cx={p.x}
              cy={p.y}
              r={12}
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`${formatDate(p.date)}: $${p.price.toFixed(2)}`}
              className="cursor-pointer outline-none"
              onPointerEnter={() => setHoverIndex(i)}
              onPointerLeave={() => setHoverIndex((cur) => (cur === i ? null : cur))}
              onFocus={() => setHoverIndex(i)}
              onBlur={() => setHoverIndex((cur) => (cur === i ? null : cur))}
            />
          </g>
        ))}
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded border border-gray-700 bg-[#111] px-2 py-1 text-[10px] font-bold text-white shadow-lg"
          style={{
            left: `${(hovered.x / WIDTH) * 100}%`,
            top: `${(hovered.y / HEIGHT) * 100}%`,
          }}
        >
          {formatDate(hovered.date)} · ${hovered.price.toFixed(2)}
        </div>
      )}

      <table className="sr-only">
        <caption>Price history</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {history.map((point) => (
            <tr key={point.date}>
              <td>{formatDate(point.date)}</td>
              <td>${point.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
