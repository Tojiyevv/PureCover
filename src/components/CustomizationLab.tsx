import React from "react";
import {
  Circle,
  Square,
  RectangleHorizontal,
  Sun,
  Moon,
  EyeOff,
} from "lucide-react";
import type { PatchEdition, PatchShape } from "../data/product";
import { SHADE_OPTIONS, SHAPE_CATEGORIES } from "../data/product";

interface CustomizationLabProps {
  shape: PatchShape;
  setShape: (s: PatchShape) => void;
  shadeId: string;
  setShadeId: (id: string) => void;
  edition: PatchEdition;
  setEdition: (e: PatchEdition) => void;
}

export const CustomizationLab: React.FC<CustomizationLabProps> = ({
  shape,
  setShape,
  shadeId,
  setShadeId,
  edition,
  setEdition,
}) => {
  const activeShapeCategory =
    SHAPE_CATEGORIES.find((c) => c.id === shape) ?? SHAPE_CATEGORIES[1];

  return (
    <section
      id="customization"
      className="relative border-t border-[#7A0C18]/10 bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="font-mono-tech text-xs font-medium uppercase tracking-widest text-[#7A0C18]">
            03 · Anatomical Fit &amp; Modular Editions
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#1C1415] sm:text-4xl lg:text-5xl">
            Customize the Shape, Shade &amp;{" "}
            <span className="italic text-[#7A0C18]">Edition</span>.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: Shape Geometry & Anatomical Variants */}
          <div className="lg:col-span-6">
            <div className="font-mono-tech text-xs uppercase tracking-wider text-[#1C1415]/55">
              1. Select Patch Geometry (Updates Live 3D Model)
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {(
                [
                  { id: "round", label: "Round Dots", icon: Circle },
                  { id: "square", label: "Square Pad", icon: Square },
                  {
                    id: "strip",
                    label: "Surgical Strip",
                    icon: RectangleHorizontal,
                  },
                ] as const
              ).map(({ id, label, icon: Icon }) => {
                const active = shape === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setShape(id)}
                    className={`flex flex-col items-center gap-2.5 rounded-2xl border p-4 transition-all ${
                      active
                        ? "border-[#7A0C18] bg-[#7A0C18] text-white shadow-md"
                        : "border-[#7A0C18]/15 bg-[#FAF5F4] text-[#1C1415] hover:border-[#7A0C18]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-semibold">{label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-[#7A0C18]/12 bg-[#FAF5F4] p-6">
              <h3 className="font-display text-lg font-bold text-[#1C1415]">
                {activeShapeCategory.title}
              </h3>
              <p className="mt-1 text-xs text-[#1C1415]/70">
                {activeShapeCategory.subtitle}
              </p>

              <div className="mt-5 divide-y divide-[#7A0C18]/10">
                {activeShapeCategory.variants.map((v) => (
                  <div
                    key={v.sizeLabel}
                    className="flex flex-col justify-between gap-1 py-3 sm:flex-row sm:items-center"
                  >
                    <div>
                      <span className="text-sm font-semibold text-[#1C1415]">
                        {v.sizeLabel}
                      </span>
                      <span className="ml-2 font-mono-tech text-xs text-[#7A0C18]">
                        ({v.dimension})
                      </span>
                    </div>
                    <span className="text-xs text-[#1C1415]/70">
                      {v.useCase}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 6-Shade Match & Modular Formula Editions */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-6">
            <div>
              <div className="font-mono-tech text-xs uppercase tracking-wider text-[#1C1415]/55">
                2. Shade Match (6 Iron Oxide Complexions · CI 77491, 77492,
                77499)
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SHADE_OPTIONS.map((s) => {
                  const selected = shadeId === s.id && edition !== "clear";
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        if (edition === "clear") setEdition("standard");
                        setShadeId(s.id);
                      }}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                        selected
                          ? "border-[#7A0C18] bg-[#FAF5F4] shadow-sm"
                          : "border-[#7A0C18]/12 bg-white hover:border-[#7A0C18]/40"
                      }`}
                    >
                      <span
                        className="h-8 w-8 shrink-0 rounded-full border border-black/15 shadow-inner"
                        style={{ backgroundColor: s.hex }}
                      />
                      <div>
                        <div className="text-xs font-semibold text-[#1C1415]">
                          {s.name}
                        </div>
                        <div className="font-mono-tech text-[10px] text-[#1C1415]/55">
                          {s.undertone}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="font-mono-tech text-xs uppercase tracking-wider text-[#1C1415]/55">
                3. Modular Formula Editions (Optional SPF / Pigment
                Configurations)
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setEdition("standard")}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    edition === "standard"
                      ? "border-[#7A0C18] bg-[#7A0C18] text-white"
                      : "border-[#7A0C18]/15 bg-[#FAF5F4] text-[#1C1415]"
                  }`}
                >
                  <Sun className="h-4 w-4 mb-2" />
                  <div className="text-xs font-bold">Daylight UV + Shade</div>
                  <p
                    className={`mt-1 text-[11px] leading-snug ${
                      edition === "standard"
                        ? "text-white/80"
                        : "text-[#1C1415]/65"
                    }`}
                  >
                    Full mineral UVA/UVB block + 6-shade iron oxide camouflage.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setEdition("nighttime")}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    edition === "nighttime"
                      ? "border-[#7A0C18] bg-[#7A0C18] text-white"
                      : "border-[#7A0C18]/15 bg-[#FAF5F4] text-[#1C1415]"
                  }`}
                >
                  <Moon className="h-4 w-4 mb-2" />
                  <div className="text-xs font-bold">
                    Nighttime-Only Edition
                  </div>
                  <p
                    className={`mt-1 text-[11px] leading-snug ${
                      edition === "nighttime"
                        ? "text-white/80"
                        : "text-[#1C1415]/65"
                    }`}
                  >
                    Omits ZnO/TiO₂ mineral filters during sleep for an even
                    softer, more flexible top film.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setEdition("clear")}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    edition === "clear"
                      ? "border-[#7A0C18] bg-[#7A0C18] text-white"
                      : "border-[#7A0C18]/15 bg-[#FAF5F4] text-[#1C1415]"
                  }`}
                >
                  <EyeOff className="h-4 w-4 mb-2" />
                  <div className="text-xs font-bold">Transparent Edition</div>
                  <p
                    className={`mt-1 text-[11px] leading-snug ${
                      edition === "clear"
                        ? "text-white/80"
                        : "text-[#1C1415]/65"
                    }`}
                  >
                    Omits iron oxides for a classic clear patch under clothing
                    or orthopedic scars.
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
