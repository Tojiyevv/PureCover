import React from "react";
import { PRODUCT_META } from "../data/product";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#7A0C18]/12 bg-[#FAF5F4] py-10 text-xs text-[#1C1415]/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-10">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-base font-bold italic text-[#7A0C18]">
            {PRODUCT_META.brand}
          </span>
          <span>{PRODUCT_META.subtitle}</span>
        </div>
        <div>{PRODUCT_META.origin}</div>
      </div>
    </footer>
  );
};
