import React from "react";
import { ACTIVE_INGREDIENTS } from "../data/product";

export const ActivesMatrix: React.FC = () => {
  return (
    <section
      id="actives"
      className="relative border-t border-[#7A0C18]/10 bg-[#FAF5F4] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="font-mono-tech text-xs font-medium uppercase tracking-widest text-[#7A0C18]">
            02 · Bio-Active Silicone Delivery
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#1C1415] sm:text-4xl lg:text-5xl">
            Formulated for Stability Under{" "}
            <span className="italic text-[#7A0C18]">Occlusion</span>.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#1C1415]/75">
            Every active ingredient in PureCover is selected in a lipid-soluble,
            dry-powder, or heat-encapsulated form that remains stable inside
            medical-grade silicone without irritating healing skin.
          </p>
        </div>

        {/* Clean Editorial Grid */}
        <div className="mt-14 divide-y divide-[#7A0C18]/12 border-y border-[#7A0C18]/12">
          {ACTIVE_INGREDIENTS.map((item, idx) => (
            <div
              key={item.id}
              className="active-row grid grid-cols-1 gap-6 py-8 lg:grid-cols-12 lg:items-start"
            >
              <div className="lg:col-span-4">
                <span className="font-mono-tech text-xs text-[#7A0C18]">
                  ACTIVE 0{idx + 1} · {item.sourceForm}
                </span>
                <h3 className="mt-1.5 font-display text-xl font-bold text-[#1C1415]">
                  {item.name}
                </h3>
              </div>

              <div className="lg:col-span-4">
                <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#1C1415]/45">
                  Formulation Engineering
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[#1C1415]/80">
                  {item.mechanism}
                </p>
              </div>

              <div className="lg:col-span-4">
                <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[#7A0C18]/75">
                  Clinical Scar Benefit
                </div>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#1C1415]">
                  {item.clinicalBenefit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
