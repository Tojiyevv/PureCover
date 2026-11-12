import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/Navbar";
import { ShareExperience } from "./components/ShareExperience";
import { Hero } from "./components/Hero";
import { ExplodedBreakdown } from "./components/ExplodedBreakdown";
import { ActivesMatrix } from "./components/ActivesMatrix";
import { CustomizationLab } from "./components/CustomizationLab";
import { ApplicationsAndSpecs } from "./components/ApplicationsAndSpecs";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { CinematicJourney } from "./components/CinematicJourney";
import { VisualComparison } from "./components/VisualComparison";
import { Questions } from "./components/Questions";
import { StudioDock } from "./components/StudioDock";
import {
  PATCH_LAYERS,
  SHADE_OPTIONS,
} from "./data/product";
import type { PatchEdition, PatchShape } from "./data/product";

import { isSkinTone } from "./data/skin";
import type { SkinToneId } from "./data/skin";

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [shareOpen, setShareOpen] = useState(false);
  const [skinToneId, setSkinToneId] = useState<SkinToneId>(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('skin');
    if (isSkinTone(fromUrl)) return fromUrl;
    try { const stored = localStorage.getItem('purecover-skin-tone'); if (isSkinTone(stored)) return stored; } catch { /* storage may be blocked */ }
    return 'medium';
  });
  useEffect(() => { try { localStorage.setItem('purecover-skin-tone', skinToneId); } catch { /* optional preference */ } }, [skinToneId]);
  const [explodeProgress, setExplodeProgress] = useState<number>(0);
  const [shape, setShape] = useState<PatchShape>(() => {
    const value = new URLSearchParams(window.location.search).get('shape');
    return value === 'round' || value === 'strip' || value === 'square' ? value : 'square';
  });
  const [shadeId, setShadeId] = useState<string>(() => {
    const value = new URLSearchParams(window.location.search).get('shade');
    return SHADE_OPTIONS.some(s => s.id === value) ? value! : SHADE_OPTIONS[1].id;
  });
  const [edition, setEdition] = useState<PatchEdition>(() => {
    const value = new URLSearchParams(window.location.search).get('edition');
    return value === 'nighttime' || value === 'clear' || value === 'standard' ? value : 'standard';
  });
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(
    PATCH_LAYERS[0].id,
  );
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  const appRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".active-row").forEach((row) => {
        gsap.from(row, {
          y: 22,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={appRef} className="min-h-screen bg-[#FAF5F4] text-[#1C1415]">
      <div aria-hidden="true" className="fixed left-0 top-0 z-[70] h-[3px] bg-[#7A0C18] transition-[width] duration-150" style={{ width: `${scrollPct}%` }} />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-16 focus:z-[80] focus:rounded-lg focus:bg-white focus:p-3">Skip to content</a>
      <Navbar onTriggerExplode={() => setExplodeProgress(1)} onShare={() => setShareOpen(true)} />
      <ShareExperience open={shareOpen} onClose={() => setShareOpen(false)} />

      <main id="main-content">
        <Hero
          explodeProgress={explodeProgress}
          setExplodeProgress={setExplodeProgress}
          shape={shape}
          shadeId={shadeId}
          setShadeId={setShadeId}
          edition={edition}
          selectedLayerId={selectedLayerId}
          onSelectLayer={setSelectedLayerId}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
          resetTrigger={resetTrigger}
          onResetCamera={() => setResetTrigger((n) => n + 1)}
        />

        <CinematicJourney shape={shape} shadeId={shadeId} edition={edition} onInspect={() => setExplodeProgress(1)} />

        <ExplodedBreakdown
          explodeProgress={explodeProgress}
          setExplodeProgress={setExplodeProgress}
          shape={shape}
          shadeId={shadeId}
          edition={edition}
          selectedLayerId={selectedLayerId}
          onSelectLayer={setSelectedLayerId}
          autoRotate={autoRotate}
          resetTrigger={resetTrigger}
        />

        <ActivesMatrix />

        <CustomizationLab
          shape={shape}
          setShape={setShape}
          shadeId={shadeId}
          setShadeId={setShadeId}
          edition={edition}
          setEdition={setEdition}
        />

        <VisualComparison shadeId={shadeId} skinToneId={skinToneId} onSkinToneChange={setSkinToneId} />

        <ApplicationsAndSpecs />

        <Questions />

        <FinalCTA onInspectExploded={() => setExplodeProgress(1)} />
      </main>

      <Footer />
      <StudioDock
        config={{ shape, shadeId, edition }}
        skinToneId={skinToneId}
        onSkinToneChange={setSkinToneId}
        onChange={(next) => { setShape(next.shape); setShadeId(next.shadeId); setEdition(next.edition); }}
        onExplode={() => setExplodeProgress(1)}
        onReset={() => { setExplodeProgress(0); setResetTrigger(n => n + 1); }}
      />
    </div>
  );
}

export default App;
