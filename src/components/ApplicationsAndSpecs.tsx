import React from "react";
import { ShieldCheck, Sparkles, Droplets, Sun } from "lucide-react";
import { PRODUCT_META, TARGET_AUDIENCES } from "../data/product";

export const ApplicationsAndSpecs: React.FC = () => {
  return (
    <>
      {/* Target Use Cases Section */}
      <section
        id="applications"
        className="relative border-t border-[#7A0C18]/10 bg-[#FAF5F4] py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <span className="font-mono-tech text-xs font-medium uppercase tracking-widest text-[#7A0C18]">
              04 · Clinical &amp; Everyday Applications
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#1C1415] sm:text-4xl lg:text-5xl">
              Designed for Every Stage of{" "}
              <span className="italic text-[#7A0C18]">Skin Recovery</span>.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {TARGET_AUDIENCES.map((aud, index) => (
              <div
                key={aud.id}
                className="flex flex-col justify-between rounded-3xl border border-[#7A0C18]/12 bg-white p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-xs font-semibold text-[#7A0C18]">
                      0{index + 1}
                    </span>
                    {aud.ageRange && (
                      <span className="rounded-full bg-[#7A0C18]/8 px-3 py-1 font-mono-tech text-[11px] text-[#7A0C18]">
                        {aud.ageRange}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-[#1C1415]">
                    {aud.segment}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-[#7A0C18]">
                    {aud.primaryNeed}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#1C1415]/75">
                    {aud.applicationNote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section
        id="specifications"
        className="relative border-t border-[#7A0C18]/10 bg-white py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-4 border-b border-[#7A0C18]/15 pb-8 md:flex-row md:items-end">
            <div>
              <span className="font-mono-tech text-xs font-medium uppercase tracking-widest text-[#7A0C18]">
                05 · Technical Data Sheet
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#1C1415] sm:text-4xl">
                Material &amp; Formulation Specifications
              </h2>
            </div>
            <span className="font-mono-tech text-xs text-[#1C1415]/55">
              {PRODUCT_META.origin}
            </span>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <tbody className="divide-y divide-[#7A0C18]/10 text-sm">
                <tr>
                  <th className="w-1/3 py-4 pr-6 font-mono-tech text-xs font-medium uppercase text-[#1C1415]/55">
                    Total Patch Thickness
                  </th>
                  <td className="py-4 font-medium text-[#1C1415]">
                    0.10 mm ultra-thin profile (blends seamlessly under
                    concealer without thick hydrocolloid edges)
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 font-mono-tech text-xs font-medium uppercase text-[#1C1415]/55">
                    Carrier Membrane
                  </th>
                  <td className="py-4 text-[#1C1415]">
                    Ultra-Thin Polyurethane (PU) Film (10–25 microns) —
                    flexible, waterproof, and breathable
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 font-mono-tech text-xs font-medium uppercase text-[#1C1415]/55">
                    Adhesive &amp; Edge System
                  </th>
                  <td className="py-4 text-[#1C1415]">
                    Medical-Grade Silicone Gel (Polydimethylsiloxane /
                    Dimethicone crosspolymer) with Soft Silicone Elastomer
                    perimeter reinforcement
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 font-mono-tech text-xs font-medium uppercase text-[#1C1415]/55">
                    Surface Matte Technology
                  </th>
                  <td className="py-4 text-[#1C1415]">
                    Silica / Polymethylsilsesquioxane micro-spheres for
                    shine-free finish and smooth makeup application
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 font-mono-tech text-xs font-medium uppercase text-[#1C1415]/55">
                    UV Defense System
                  </th>
                  <td className="py-4 text-[#1C1415]">
                    Non-nano Zinc Oxide &amp; Titanium Dioxide physical UVA/UVB
                    filters (removable for Nighttime-Only Edition)
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 font-mono-tech text-xs font-medium uppercase text-[#1C1415]/55">
                    Colorant System
                  </th>
                  <td className="py-4 text-[#1C1415]">
                    6 skin-tone shades via Iron Oxides CI 77491 (Red), CI 77492
                    (Yellow), CI 77499 (Black) — or unpigmented Clear Edition
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 font-mono-tech text-xs font-medium uppercase text-[#1C1415]/55">
                    Active Matrix
                  </th>
                  <td className="py-4 text-[#1C1415]">
                    Madecassoside (dry powder), Bisabolol, Tetrahexyldecyl
                    Ascorbate (Oil-Soluble Vitamin C), Micro-Encapsulated
                    Niacinamide (B3), Tocopherol (Vitamin E)
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 font-mono-tech text-xs font-medium uppercase text-[#1C1415]/55">
                    Release Liner
                  </th>
                  <td className="py-4 text-[#1C1415]">
                    Fluoropolymer-Coated PET Film for residue-free peel-off
                    protection
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 4 Core Pillars Strip */}
          <div className="mt-14 grid grid-cols-1 gap-6 border-t border-[#7A0C18]/12 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#7A0C18]" />
              <div>
                <div className="text-sm font-bold text-[#1C1415]">
                  Makeup-Ready Matte
                </div>
                <p className="mt-1 text-xs text-[#1C1415]/65">
                  Silica micro-spheres eliminate glare and hold concealer
                  cleanly.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sun className="mt-0.5 h-5 w-5 shrink-0 text-[#7A0C18]" />
              <div>
                <div className="text-sm font-bold text-[#1C1415]">
                  Non-Nano UV Shield
                </div>
                <p className="mt-1 text-xs text-[#1C1415]/65">
                  Blocks UVA/UVB rays to help prevent post-inflammatory
                  hyperpigmentation.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Droplets className="mt-0.5 h-5 w-5 shrink-0 text-[#7A0C18]" />
              <div>
                <div className="text-sm font-bold text-[#1C1415]">
                  Waterproof &amp; Breathable
                </div>
                <p className="mt-1 text-xs text-[#1C1415]/65">
                  10–25μm PU film and silicone elastomer edge seal resist water
                  and sweat.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#7A0C18]" />
              <div>
                <div className="text-sm font-bold text-[#1C1415]">
                  Painless Removal
                </div>
                <p className="mt-1 text-xs text-[#1C1415]/65">
                  Hypoallergenic silicone gel lifts cleanly with zero sticky
                  glue residue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
