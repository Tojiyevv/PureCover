import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Layers3, MoveDown, ScanLine } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { ProductScene } from './ProductViewer/ProductScene';
import type { PatchEdition, PatchShape } from '../data/product';

gsap.registerPlugin(ScrollTrigger);
const chapters = [
  { eyebrow: '01 / THE SURFACE', title: 'Almost invisible.', body: 'A matte finish and delicate silhouette, designed to blend into everyday life.' },
  { eyebrow: '02 / THE STRUCTURE', title: 'Engineering in layers.', body: 'Explore an illustrative exploded view of the silicone matrix, breathable film and protective release liner.' },
  { eyebrow: '03 / THE DETAIL', title: 'Every layer matters.', body: 'Inspect the architecture at your own pace. Rotate, zoom and select individual components in the dedicated explorer.' },
];
interface Props { shape: PatchShape; shadeId: string; edition: PatchEdition; onInspect: () => void; }
export function CinematicJourney({ shape, shadeId, edition, onInspect }: Props) {
  const section = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update(); mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!section.current || reduceMotion) return;
    const trigger = ScrollTrigger.create({
      trigger: section.current, start: 'top bottom', end: 'bottom top',
      onUpdate: self => setProgress(self.progress),
    });
    return () => trigger.kill();
  }, [reduceMotion]);
  const phase = progress < .34 ? 0 : progress < .67 ? 1 : 2;
  const explode = reduceMotion ? .62 : Math.max(0, Math.min(1, (progress - .22) / .48));
  return <section ref={section} id="experience" className="relative overflow-hidden bg-[#1C1415] text-[#FAF5F4]">
    <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 72% 38%, rgba(122,12,24,.4), transparent 62%)'}} />
    <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[.22em] text-[#E7BDB7]"><ScanLine size={17}/> THE PURECOVER EXPERIENCE</div>
        <div className="flex items-center gap-2 text-xs text-white/50"><MoveDown size={14}/> Scroll to explore</div>
      </div>
      <div className="grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div className="relative z-10">
          <div className="mb-5 text-xs font-semibold tracking-[.24em] text-[#E7BDB7]">{chapters[phase].eyebrow}</div>
          <h2 className="font-display max-w-lg text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">{chapters[phase].title}</h2>
          <p className="mt-7 max-w-md text-base leading-8 text-white/65">{chapters[phase].body}</p>
          <div className="mt-10 flex gap-2" aria-label="Story chapters">
            {chapters.map((chapter,i)=><div key={chapter.eyebrow} className={`h-1 rounded-full transition-all duration-500 ${phase===i?'w-16 bg-[#E7BDB7]':'w-7 bg-white/20'}`} />)}
          </div>
          <a href="#architecture" onClick={onInspect} className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm transition-colors hover:bg-white hover:text-[#1C1415]"><Layers3 size={16}/> Open full layer explorer <ArrowUpRight size={15}/></a>
        </div>
        <div className="relative h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#5D2B30] via-[#31191D] to-[#1C1415] sm:h-[510px]">
          <div className="absolute left-5 top-5 z-10 rounded-full border border-white/20 bg-black/25 px-4 py-2 font-mono text-[10px] tracking-widest text-white/80 backdrop-blur-md">LIVE 3D · {Math.round(explode*100)}% EXPANDED</div>
          <ProductScene explodeProgress={explode} shape={shape} shadeId={shadeId} edition={edition} selectedLayerId={null} onSelectLayer={()=>{}} autoRotate={!reduceMotion} resetTrigger={0} showAnnotations={false}/>
          <div className="pointer-events-none absolute bottom-5 left-5 right-5 z-10 flex justify-between text-[10px] uppercase tracking-widest text-white/55"><span>Illustrative model</span><span>Drag to rotate</span></div>
        </div>
      </div>
      <p className="mt-7 text-xs leading-6 text-white/45">3D representation is conceptual and not a microscopic or clinically validated depiction of the finished product.</p>
    </div>
  </section>;
}
