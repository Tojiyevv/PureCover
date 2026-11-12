import React from "react";
import { ArrowDownRight, Layers, RotateCcw, Sparkles } from "lucide-react";
import type { PatchEdition, PatchShape } from "../data/product";
import { PRODUCT_META, SHADE_OPTIONS } from "../data/product";
import { ProductScene } from "./ProductViewer/ProductScene";

interface HeroProps {
  explodeProgress: number;
  setExplodeProgress: (val: number) => void;
  shape: PatchShape;
  shadeId: string;
  setShadeId: (id: string) => void;
  edition: PatchEdition;
  selectedLayerId: string | null;
  onSelectLayer: (id: string) => void;
  autoRotate: boolean;
  setAutoRotate: (val: boolean) => void;
  resetTrigger: number;
  onResetCamera: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  explodeProgress,
  setExplodeProgress,
  shape,
  shadeId,
  setShadeId,
  edition,
  selectedLayerId,
  onSelectLayer,
  autoRotate,
  setAutoRotate,
  resetTrigger,
  onResetCamera,
}) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-24 pb-12 lg:pt-28">
      {/* Subtle architectural gradient backdrop inspired by the Korea Office proposal deck */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 75% 45%, rgba(235, 198, 189, 0.42) 0%, rgba(250, 245, 244, 0.95) 55%, #FAF5F4 100%)",
        }}
      />
      {/* Signature crimson ribbon curve along the lower edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#580710] via-[#7A0C18] to-[#9E2A38]"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:px-10">
        {/* Left Editorial Column */}
        <div className="z-10 flex flex-col items-start lg:col-span-5">
          <div className="hero-reveal mb-5 inline-flex items-center gap-2 rounded-full border border-[#7A0C18]/15 bg-white/75 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7A0C18]" />
            <span className="font-mono-tech text-[11px] font-medium uppercase tracking-wider text-[#7A0C18]">
              {PRODUCT_META.origin}
            </span>
          </div>

          <div className="hero-reveal mb-2">
            <h1 className="font-display text-5xl font-bold italic tracking-tight text-[#7A0C18] sm:text-6xl lg:text-[68px] lg:leading-[1.02]">
              {PRODUCT_META.brand}
            </h1>
            <div className="mt-1 inline-block rounded-r-full bg-[#7A0C18]/10 pr-6 pl-1 py-0.5">
              <span className="font-display text-xl font-semibold italic text-[#7A0C18] sm:text-2xl">
                {PRODUCT_META.subtitle}
              </span>
            </div>
          </div>

          <p className="hero-reveal mt-5 text-lg font-medium leading-snug text-[#1C1415] sm:text-xl">
            {PRODUCT_META.heroHeadline}
          </p>

          <p className="hero-reveal mt-3.5 text-sm leading-relaxed text-[#1C1415]/70 sm:text-base">
            {PRODUCT_META.heroDescription}
          </p>

          {/* Key Telemetry Strip */}
          <div className="hero-reveal mt-7 grid w-full grid-cols-3 border-y border-[#7A0C18]/12 py-4">
            <div>
              <div className="font-mono-tech text-lg font-semibold text-[#7A0C18]">
                0.10<span className="text-xs">mm</span>
              </div>
              <div className="mt-0.5 text-[11px] text-[#1C1415]/60">
                Ultra-Thin Profile
              </div>
            </div>
            <div className="border-x border-[#7A0C18]/12 px-4">
              <div className="font-mono-tech text-lg font-semibold text-[#7A0C18]">
                10–25<span className="text-xs">μm</span>
              </div>
              <div className="mt-0.5 text-[11px] text-[#1C1415]/60">
                Breathable PU Film
              </div>
            </div>
            <div className="pl-4">
              <div className="font-mono-tech text-lg font-semibold text-[#7A0C18]">
                6 Shades
              </div>
              <div className="mt-0.5 text-[11px] text-[#1C1415]/60">
                Iron Oxide Match
              </div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="hero-reveal mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#architecture"
              onClick={() => setExplodeProgress(1)}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#7A0C18] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#7A0C18]/20 transition-all hover:bg-[#580710] hover:shadow-xl"
            >
              <Layers className="h-4 w-4" />
              <span>Explore Exploded 3D Layers</span>
            </a>

            <a
              href="#customization"
              className="inline-flex items-center gap-2 rounded-full border border-[#7A0C18]/20 bg-white/80 px-5 py-3.5 text-sm font-medium text-[#1C1415] transition-all hover:border-[#7A0C18] hover:text-[#7A0C18]"
            >
              <span>Shapes &amp; Editions</span>
              <ArrowDownRight className="h-4 w-4 text-[#7A0C18]" />
            </a>
          </div>
        </div>

        {/* Right Interactive 3D Stage */}
        <div className="relative flex flex-col lg:col-span-7">
          <div className="relative w-full lg:h-[600px]">
            <div className="relative h-[460px] w-full sm:h-[540px] lg:h-full">
            <ProductScene
              explodeProgress={explodeProgress}
              shape={shape}
              shadeId={shadeId}
              edition={edition}
              selectedLayerId={selectedLayerId}
              onSelectLayer={onSelectLayer}
              autoRotate={autoRotate}
              resetTrigger={resetTrigger}
              showAnnotations={true}
            />

            {/* Top-Right Interactive Hint */}
            <div className="pointer-events-none absolute top-3 right-3 flex items-center gap-2 rounded-full border border-[#7A0C18]/12 bg-white/80 px-3 py-1.5 text-[11px] text-[#1C1415]/70 backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-[#7A0C18]" />
              <span>Drag to rotate · Scroll to zoom · Click any layer</span>
            </div>

          </div>

            {/* Bottom Floating 3D Control Bar */}
            <div className="relative z-20 mt-3 flex w-full max-w-xl flex-col gap-3 lg:absolute lg:bottom-3 lg:left-1/2 lg:mt-0 lg:w-[95%] lg:-translate-x-1/2 rounded-2xl border border-[#7A0C18]/15 bg-white/88 p-3.5 shadow-lg shadow-[#580710]/5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
              {/* Explode Slider */}
              <div className="flex flex-1 items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setExplodeProgress(explodeProgress > 0.5 ? 0 : 1)
                  }
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    explodeProgress > 0.5
                      ? "bg-[#7A0C18] text-white"
                      : "bg-[#7A0C18]/10 text-[#7A0C18] hover:bg-[#7A0C18]/20"
                  }`}
                >
                  {explodeProgress > 0.5 ? "Assemble" : "Explode"}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  aria-label="Exploded view separation"
                  value={explodeProgress}
                  onChange={(e) =>
                    setExplodeProgress(parseFloat(e.target.value))
                  }
                  className="pure-slider w-full"
                />
                <span className="font-mono-tech w-10 text-right text-[11px] text-[#1C1415]/65">
                  {Math.round(explodeProgress * 100)}%
                </span>
              </div>

              {/* Shade Quick Dots & Camera Reset */}
              <div className="flex items-center justify-between gap-2 border-t border-[#7A0C18]/10 pt-2.5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-3">
                <div className="flex items-center gap-1.5">
                  {SHADE_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      title={`${s.name} (${s.undertone})`}
                      onClick={() => setShadeId(s.id)}
                      className={`h-5 w-5 rounded-full border transition-transform ${
                        shadeId === s.id
                          ? "scale-120 border-[#7A0C18] ring-2 ring-[#7A0C18]/25"
                          : "border-black/15 hover:scale-110"
                      }`}
                      style={{ backgroundColor: s.hex }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    title={autoRotate ? "Pause Rotation" : "Resume Rotation"}
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`rounded-lg px-2 py-1 font-mono-tech text-[10px] transition-colors ${
                      autoRotate
                        ? "bg-[#7A0C18]/10 text-[#7A0C18]"
                        : "bg-black/5 text-[#1C1415]/60"
                    }`}
                  >
                    {autoRotate ? "360° ON" : "360° OFF"}
                  </button>
                  <button
                    type="button"
                    title="Reset Camera"
                    onClick={onResetCamera}
                    className="rounded-lg p-1.5 text-[#1C1415]/65 transition-colors hover:bg-[#7A0C18]/10 hover:text-[#7A0C18]"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
