import React from "react";
import { Layers, CheckCircle2, Eye } from "lucide-react";
import type { PatchEdition, PatchShape } from "../data/product";
import { PATCH_LAYERS } from "../data/product";
import { ProductScene } from "./ProductViewer/ProductScene";

interface ExplodedBreakdownProps {
  explodeProgress: number;
  setExplodeProgress: (val: number) => void;
  shape: PatchShape;
  shadeId: string;
  edition: PatchEdition;
  selectedLayerId: string | null;
  onSelectLayer: (id: string) => void;
  autoRotate: boolean;
  resetTrigger: number;
}

export const ExplodedBreakdown: React.FC<ExplodedBreakdownProps> = ({
  explodeProgress,
  setExplodeProgress,
  shape,
  shadeId,
  edition,
  selectedLayerId,
  onSelectLayer,
  autoRotate,
  resetTrigger,
}) => {
  const activeLayer =
    PATCH_LAYERS.find((l) => l.id === selectedLayerId) ?? PATCH_LAYERS[0];

  return (
    <section
      id="architecture"
      className="relative border-t border-[#7A0C18]/10 bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#7A0C18]/12 pb-10 md:flex-row md:items-end">
          <div>
            <span className="font-mono-tech text-xs font-medium uppercase tracking-widest text-[#7A0C18]">
              01 · Multi-Layer Engineering
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#1C1415] sm:text-4xl lg:text-5xl">
              Six Functional Layers in{" "}
              <span className="italic text-[#7A0C18]">0.10 mm</span>.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setExplodeProgress(0)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                explodeProgress < 0.25
                  ? "bg-[#7A0C18] text-white shadow-sm"
                  : "border border-[#7A0C18]/20 text-[#1C1415] hover:border-[#7A0C18]"
              }`}
            >
              Assembled Patch
            </button>
            <button
              type="button"
              onClick={() => setExplodeProgress(1)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                explodeProgress >= 0.75
                  ? "bg-[#7A0C18] text-white shadow-sm"
                  : "border border-[#7A0C18]/20 text-[#1C1415] hover:border-[#7A0C18]"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Exploded Cross-Section</span>
            </button>
          </div>
        </div>

        {/* Interactive Split: 3D Stage + Layer Inspector */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Interactive 3D Exploded Canvas */}
          <div className="lg:col-span-6">
          <div className="relative h-[440px] rounded-3xl border border-[#7A0C18]/12 bg-[#FAF5F4] sm:h-[520px]">
            <ProductScene
              explodeProgress={explodeProgress}
              shape={shape}
              shadeId={shadeId}
              edition={edition}
              selectedLayerId={activeLayer.id}
              onSelectLayer={(id) => {
                if (explodeProgress < 0.7) setExplodeProgress(1);
                onSelectLayer(id);
              }}
              autoRotate={autoRotate}
              resetTrigger={resetTrigger}
              showAnnotations={true}
            />

          </div>

          {/* Layer details always sit below the 3D viewport, including desktop. */}
          <div className="mt-4 rounded-2xl border border-[#7A0C18]/15 bg-[#FAF5F4] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono-tech text-[11px] font-semibold text-[#7A0C18]">LAYER 0{activeLayer.index} · {activeLayer.thicknessOrMetric}</span>
              <span className="font-mono-tech text-[10px] text-[#1C1415]/50">{activeLayer.chemicalSpec}</span>
            </div>
            <h3 className="mt-1 font-display text-base font-bold text-[#1C1415]">{activeLayer.name}</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#1C1415]/75">{activeLayer.details}</p>
          </div>
          </div>

          {/* Interactive Layer Stack List */}
          <div className="flex flex-col justify-between gap-2.5 lg:col-span-6">
            {PATCH_LAYERS.map((layer) => {
              const selected = activeLayer.id === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => {
                    if (explodeProgress < 0.75) setExplodeProgress(1);
                    onSelectLayer(layer.id);
                  }}
                  className={`group flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition-all ${
                    selected
                      ? "border-[#7A0C18] bg-[#FAF5F4] shadow-sm"
                      : "border-[#7A0C18]/10 bg-white hover:border-[#7A0C18]/40"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono-tech text-xs font-semibold transition-colors ${
                        selected
                          ? "bg-[#7A0C18] text-white"
                          : "bg-[#7A0C18]/10 text-[#7A0C18] group-hover:bg-[#7A0C18]/20"
                      }`}
                    >
                      0{layer.index}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-sm font-bold text-[#1C1415] sm:text-base">
                          {layer.name}
                        </span>
                      </div>
                      <p className="mt-0.5 font-mono-tech text-[11px] text-[#7A0C18]/85">
                        {layer.chemicalSpec}
                      </p>
                      <p className="mt-1 text-xs text-[#1C1415]/70">
                        {layer.role}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pt-1 text-[#7A0C18]">
                    {selected ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4 opacity-35 group-hover:opacity-100" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
