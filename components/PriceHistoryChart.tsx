"use client";

import { useState } from "react";
import type { PricePoint } from "@/data/types";

const WIDTH = 600;
const HEIGHT = 160;
const PAD_X = 8;
const PAD_TOP = 22;
const PAD_BOTTOM = 26;
const SNS_COLOR = "#dc2626";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

type PlottedPoint = PricePoint & { x: number; y: number };
type Hover = { series: "price" | "sns"; index: number };

export default function PriceHistoryChart({
  history,
  color,
  subscribeAndSaveHistory,
}: {
  history: PricePoint[];
  color: string;
  subscribeAndSaveHistory?: PricePoint[];
}) {
  const [hover, setHover] = useState<Hover | null>(null);

  if (history.length < 2) {
    return (
      <p className="text-xs text-gray-500">
        Price history will build up here as MacroSaver re-checks this offer.
      </p>
    );
  }

  const showSns = (subscribeAndSaveHistory?.length ?? 0) >= 2;
  const snsHistory = showSns ? subscribeAndSaveHistory! : [];

  // Shared, date-based (not index-based) axes so the two series line up on the calendar even
  // when one has check-ins the other doesn't.
  const allDates = [...history, ...snsHistory].map((p) => new Date(p.date).getTime());
  const minTime = Math.min(...allDates);
  const maxTime = Math.max(...allDates);
  const timeRange = maxTime - minTime || 1;

  const allPrices = [...history, ...snsHistory].map((p) => p.price);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const range = maxPrice - minPrice;
  const pad = range > 0 ? range * 0.15 : Math.max(1, minPrice * 0.05);
  const domainMin = minPrice - pad;
  const domainRange = maxPrice + pad - domainMin || 1;

  const plotWidth = WIDTH - PAD_X * 2;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const xForDate = (date: string) => PAD_X + ((new Date(date).getTime() - minTime) / timeRange) * plotWidth;
  const yForPrice = (price: number) => PAD_TOP + plotHeight - ((price - domainMin) / domainRange) * plotHeight;

  const plot = (pts: PricePoint[]): PlottedPoint[] => pts.map((p) => ({ ...p, x: xForDate(p.date), y: yForPrice(p.price) }));
  const pathFor = (pts: PlottedPoint[]) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaFor = (pts: PlottedPoint[]) => {
    const baseline = PAD_TOP + plotHeight;
    return `${pathFor(pts)} L${pts[pts.length - 1].x.toFixed(1)},${baseline} L${pts[0].x.toFixed(1)},${baseline} Z`;
  };

  const points = plot(history);
  const snsPoints = plot(snsHistory);

  const first = points[0];
  const last = points[points.length - 1];
  const snsLast = snsPoints[snsPoints.length - 1];

  const hovered = hover === null ? null : hover.series === "price" ? points[hover.index] : snsPoints[hover.index];
  const hoveredLabel = hover?.series === "sns" ? "Subscribe & Save" : null;

  return (
    <div className="relative">
      {showSns && (
        <div className="flex items-center gap-4 mb-1.5 text-[10px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-0.5 rounded" style={{ backgroundColor: color }} />
            Price
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-0.5 rounded" style={{ backgroundColor: SNS_COLOR }} />
            Subscribe &amp; Save
          </span>
        </div>
      )}
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Price history from ${formatDate(first.date)} at $${first.price.toFixed(2)} to ${formatDate(last.date)} at $${last.price.toFixed(2)}. Range $${minPrice.toFixed(2)} to $${maxPrice.toFixed(2)}.`}
      >
        <path d={areaFor(points)} fill={color} opacity={0.12} stroke="none" />
        <path d={pathFor(points)} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {showSns && (
          <>
            <path d={areaFor(snsPoints)} fill={SNS_COLOR} opacity={0.1} stroke="none" />
            <path d={pathFor(snsPoints)} fill="none" stroke={SNS_COLOR} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}

        <text x={first.x} y={HEIGHT - 8} fontSize={10} fill="#6b7280" textAnchor="start">
          {formatDate(first.date)}
        </text>
        <text x={last.x} y={HEIGHT - 8} fontSize={10} fill="#6b7280" textAnchor="end">
          {formatDate(last.date)}
        </text>
        <text x={last.x} y={Math.max(PAD_TOP - 8, last.y - 10)} fontSize={11} fontWeight={700} fill={color} textAnchor="end">
          ${last.price.toFixed(2)}
        </text>
        {showSns && (
          <text x={snsLast.x} y={Math.min(HEIGHT - PAD_BOTTOM - 4, snsLast.y + 14)} fontSize={11} fontWeight={700} fill={SNS_COLOR} textAnchor="end">
            ${snsLast.price.toFixed(2)}
          </text>
        )}

        {points.map((p, i) => (
          <g key={`price-${p.date}-${i}`}>
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
              onPointerEnter={() => setHover({ series: "price", index: i })}
              onPointerLeave={() => setHover((cur) => (cur?.series === "price" && cur.index === i ? null : cur))}
              onFocus={() => setHover({ series: "price", index: i })}
              onBlur={() => setHover((cur) => (cur?.series === "price" && cur.index === i ? null : cur))}
            />
          </g>
        ))}

        {showSns &&
          snsPoints.map((p, i) => (
            <g key={`sns-${p.date}-${i}`}>
              <circle cx={p.x} cy={p.y} r={3} fill={SNS_COLOR} />
              <circle
                cx={p.x}
                cy={p.y}
                r={12}
                fill="transparent"
                tabIndex={0}
                role="button"
                aria-label={`${formatDate(p.date)}: $${p.price.toFixed(2)} with Subscribe & Save`}
                className="cursor-pointer outline-none"
                onPointerEnter={() => setHover({ series: "sns", index: i })}
                onPointerLeave={() => setHover((cur) => (cur?.series === "sns" && cur.index === i ? null : cur))}
                onFocus={() => setHover({ series: "sns", index: i })}
                onBlur={() => setHover((cur) => (cur?.series === "sns" && cur.index === i ? null : cur))}
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
          {hoveredLabel ? ` (${hoveredLabel})` : ""}
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

      {showSns && (
        <table className="sr-only">
          <caption>Subscribe &amp; Save price history</caption>
          <thead>
            <tr>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {snsHistory.map((point) => (
              <tr key={point.date}>
                <td>{formatDate(point.date)}</td>
                <td>${point.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
