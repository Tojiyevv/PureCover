import React from "react";
import { Layers, ArrowUp } from "lucide-react";
import { PRODUCT_META } from "../data/product";

interface FinalCTAProps {
  onInspectExploded: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onInspectExploded }) => {
  return (
    <section className="relative overflow-hidden bg-[#580710] py-24 text-white lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, #C86D61 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center lg:px-10">
        <span className="font-mono-tech text-xs uppercase tracking-widest text-white/70">
          {PRODUCT_META.origin}
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold italic tracking-tight sm:text-5xl lg:text-6xl">
          {PRODUCT_META.tagline}
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
          Inspect the 6-layer medical-grade silicone architecture in interactive
          3D, switch between Round, Square, and Surgical Strip formats, and
          compare all 6 skin-tone shades.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#architecture"
            onClick={onInspectExploded}
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#7A0C18] shadow-lg transition-transform hover:scale-105"
          >
            <Layers className="h-4 w-4" />
            <span>Launch Exploded 3D Inspection</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ArrowUp className="h-4 w-4" />
            <span>Back to Top</span>
          </a>
        </div>
      </div>
    </section>
  );
};
