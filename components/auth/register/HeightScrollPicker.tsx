"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const CM_MIN = 120;
const CM_MAX = 220;
const IN_MIN = 50;
const IN_MAX = 86;
const PIXELS_PER_UNIT = 8;
const DRAG_SENS = 2;
const VISIBLE_RANGE = 25;

export type HeightScrollPickerProps = {
  heightCm: number;
  heightUnit: "cm" | "ft";
  onHeightCmChange: (heightCm: number) => void;
  onHeightUnitChange: (unit: "cm" | "ft") => void;
};

function inchesFromCm(heightCm: number): number {
  return Math.round(heightCm / 2.54);
}

function cmFromInches(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10;
}

function formatFtIn(totalInches: number): string {
  const ft = Math.floor(totalInches / 12);
  const inch = totalInches % 12;
  return `${ft}′${inch}″`;
}

function clampCm(v: number): number {
  return Math.min(CM_MAX, Math.max(CM_MIN, v));
}

function clampIn(v: number): number {
  return Math.min(IN_MAX, Math.max(IN_MIN, v));
}

function snapCm(v: number): number {
  return Math.round(v * 10) / 10;
}

function heightToDisplay(heightCm: number, unit: "cm" | "ft"): number {
  return unit === "cm" ? clampCm(heightCm) : clampIn(inchesFromCm(heightCm));
}

function displayToHeightCm(display: number, unit: "cm" | "ft"): number {
  if (unit === "cm") return snapCm(display);
  return cmFromInches(Math.round(display));
}

function drawVerticalRuler(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  currentValue: number,
  minV: number,
  maxV: number,
  unit: "cm" | "ft",
) {
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const centerY = h / 2;
  const tickStartX = 28;
  const activeColor = "#4C8548";
  const inactiveColor = "#CCCCCC";

  const start = Math.floor(currentValue - VISIBLE_RANGE);
  const end = Math.ceil(currentValue + VISIBLE_RANGE);

  for (let i = start; i <= end; i++) {
    if (i < minV || i > maxV) continue;
    if (i % 5 !== 0) continue;

    const diff = i - currentValue;
    const y = centerY + diff * PIXELS_PER_UNIT;
    const isMajor = i % 10 === 0;

    const tickLen = isMajor ? 40 : 25;
    ctx.strokeStyle = isMajor ? activeColor : inactiveColor;
    ctx.lineWidth = isMajor ? 3 : 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(tickStartX, y);
    ctx.lineTo(tickStartX + tickLen, y);
    ctx.stroke();

    if (isMajor) {
      const dist = Math.abs(diff);
      const opacity = Math.max(0, Math.min(1, 1 - dist / 20));
      if (opacity > 0) {
        const label =
          unit === "cm" ? String(i) : formatFtIn(Math.min(IN_MAX, Math.max(IN_MIN, i)));
        ctx.save();
        ctx.fillStyle = `rgba(100, 100, 100, ${opacity})`;
        ctx.font = "bold 14px system-ui, sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(label, 0, y);
        ctx.restore();
      }
    }
  }

  const pointerY = centerY;
  ctx.fillStyle = "#E4E148";
  const lineLength = 80;
  const lineThickness = 5;
  const startX = 10;
  ctx.beginPath();
  ctx.moveTo(startX, pointerY - lineThickness / 2);
  ctx.lineTo(startX + lineLength, pointerY - lineThickness / 2);
  ctx.lineTo(startX + lineLength, pointerY + lineThickness / 2);
  ctx.lineTo(startX, pointerY + lineThickness / 2);
  ctx.closePath();
  ctx.fill();
}

export function HeightScrollPicker({
  heightCm,
  heightUnit,
  onHeightCmChange,
  onHeightUnitChange,
}: HeightScrollPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const displayRef = useRef(heightToDisplay(heightCm, heightUnit));
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);

  const minV = heightUnit === "cm" ? CM_MIN : IN_MIN;
  const maxV = heightUnit === "cm" ? CM_MAX : IN_MAX;

  const committedDisplay = heightToDisplay(heightCm, heightUnit);
  const fieldText = focused
    ? draft
    : heightUnit === "cm"
      ? snapCm(committedDisplay).toFixed(1)
      : String(Math.round(committedDisplay));

  useEffect(() => {
    if (!draggingRef.current) {
      displayRef.current = heightToDisplay(heightCm, heightUnit);
    }
  }, [heightCm, heightUnit]);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawVerticalRuler(ctx, w, h, displayRef.current, minV, maxV, heightUnit);
  }, [heightUnit, minV, maxV]);

  useLayoutEffect(() => {
    paint();
  }, [paint, heightCm, heightUnit, fieldText]);

  useEffect(() => {
    const ro = new ResizeObserver(() => paint());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [paint]);

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const snapped =
      heightUnit === "cm"
        ? snapCm(displayRef.current)
        : Math.round(displayRef.current);
    displayRef.current = Math.min(maxV, Math.max(minV, snapped));
    onHeightCmChange(displayToHeightCm(displayRef.current, heightUnit));
    paint();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    draggingRef.current = true;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const delta = -e.movementY / DRAG_SENS;
    let next = displayRef.current + delta;
    next = Math.min(maxV, Math.max(minV, next));
    displayRef.current = next;
    onHeightCmChange(displayToHeightCm(next, heightUnit));
    if (focused) {
      if (heightUnit === "cm") setDraft(snapCm(next).toFixed(1));
      else setDraft(String(Math.round(next)));
    }
    paint();
  };

  const onFieldChange = (raw: string) => {
    setDraft(raw);
    const cleaned = raw.replace(/[^0-9.]/g, "");
    if (cleaned === "") return;
    const n = Number(cleaned);
    if (Number.isNaN(n)) return;
    if (heightUnit === "cm") {
      if (n < CM_MIN || n > CM_MAX) return;
      displayRef.current = n;
      onHeightCmChange(snapCm(n));
    } else {
      const ins = Math.round(n);
      if (ins < IN_MIN || ins > IN_MAX) return;
      displayRef.current = ins;
      onHeightCmChange(cmFromInches(ins));
    }
    paint();
  };

  const onFieldBlur = () => {
    setFocused(false);
    paint();
  };

  const ftSubtitle = heightUnit === "ft" ? formatFtIn(Math.round(heightToDisplay(heightCm, "ft"))) : null;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-secondary-text">
          Height
        </span>
        <div
          className="inline-flex shrink-0 rounded-full bg-bg-light p-1"
          role="group"
          aria-label="Height unit"
        >
          {(
            [
              { id: "cm" as const, label: "CM" },
              { id: "ft" as const, label: "FT" },
            ] as const
          ).map((u) => {
            const on = heightUnit === u.id;
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => onHeightUnitChange(u.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                  on
                    ? "bg-[#1b3022] text-white shadow-sm"
                    : "text-[#5a6b62] hover:text-[#1b3022]"
                }`}
              >
                {u.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <div
          ref={wrapRef}
          className="relative w-[110px] shrink-0 touch-none select-none"
          style={{ height: 280 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-ns-resize" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex flex-wrap items-baseline justify-end gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={fieldText}
              onChange={(e) => onFieldChange(e.target.value)}
              onFocus={(e) => {
                setFocused(true);
                const d = heightToDisplay(heightCm, heightUnit);
                setDraft(
                  heightUnit === "cm" ? snapCm(d).toFixed(1) : String(Math.round(d)),
                );
                requestAnimationFrame(() => e.target.select());
              }}
              onBlur={onFieldBlur}
              className="min-w-[4rem] max-w-[11rem] border-0 bg-transparent text-right text-4xl font-bold tabular-nums text-[#4CAF50] outline-none focus:ring-0 sm:text-5xl"
              aria-label="Height value"
            />
            <span className="text-3xl font-bold text-[#4CAF50] sm:text-4xl">
              {heightUnit === "cm" ? "cm" : "in"}
            </span>
          </div>
          {heightUnit === "ft" && ftSubtitle ? (
            <p className="mt-1 text-right text-sm font-medium text-secondary-text">{ftSubtitle}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
