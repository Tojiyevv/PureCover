import React, { useState, useEffect } from "react";
import { Menu, X, Layers, QrCode } from "lucide-react";
import { PRODUCT_META } from "../data/product";

interface NavbarProps {
  onTriggerExplode: () => void;
  onShare: () => void;
}

const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Architecture", href: "#architecture" },
  { label: "Active Matrix", href: "#actives" },
  { label: "Shapes & Shades", href: "#customization" },
  { label: "Applications", href: "#applications" },
  { label: "FAQ", href: "#questions" },
];

export const Navbar: React.FC<NavbarProps> = ({ onTriggerExplode, onShare }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#7A0C18]/10 bg-[#FAF5F4]/88 backdrop-blur-xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Brand Identity matching proposal deck */}
        <a href="#" className="group flex items-baseline gap-2.5">
          <span className="font-display text-2xl font-bold italic tracking-tight text-[#7A0C18]">
            {PRODUCT_META.brand}
          </span>
          <span className="hidden text-xs font-medium tracking-wide text-[#7A0C18]/75 sm:inline">
            {PRODUCT_META.subtitle}
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-[#1C1415]/75 transition-colors hover:text-[#7A0C18]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Share is available on desktop and mobile */}
        <button type="button" onClick={onShare} className="ml-auto mr-3 inline-flex items-center gap-2 rounded-full bg-[#7A0C18] px-3 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#580710] sm:px-4 md:ml-0 md:mr-0" aria-label="Share experience and show QR code"><QrCode className="h-4 w-4" /><span className="hidden sm:inline">Share Experience</span></button>

        {/* Action Controls */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#architecture"
            onClick={onTriggerExplode}
            className="inline-flex items-center gap-2 rounded-full border border-[#7A0C18]/25 bg-white/80 px-4 py-2 text-xs font-medium text-[#7A0C18] transition-all hover:border-[#7A0C18] hover:bg-[#7A0C18] hover:text-white"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Exploded 3D View</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#7A0C18]/15 bg-white/80 text-[#7A0C18] md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-[#7A0C18]/10 bg-[#FAF5F4] px-6 py-6 shadow-xl md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-[#1C1415] hover:text-[#7A0C18]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#architecture"
              onClick={() => {
                setMobileOpen(false);
                onTriggerExplode();
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#7A0C18] px-5 py-3 text-sm font-medium text-white"
            >
              <Layers className="h-4 w-4" />
              <span>Inspect Exploded 3D Model</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
