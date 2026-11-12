import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Bookmark, Check, Command, Copy, Download, Layers3, RotateCcw, Search, Share2, SlidersHorizontal, X } from 'lucide-react';
import { SHADE_OPTIONS } from '../data/product';
import { SKIN_TONES } from '../data/skin';
import type { SkinToneId } from '../data/skin';
import type { PatchEdition, PatchShape } from '../data/product';

export type StudioConfig = { shape: PatchShape; shadeId: string; edition: PatchEdition };
type Props = {
  config: StudioConfig;
  skinToneId: SkinToneId;
  onSkinToneChange: (id: SkinToneId) => void;
  onChange: (next: StudioConfig) => void;
  onExplode: () => void;
  onReset: () => void;
};
const SECTIONS = [
  { name: 'Product overview', href: '#main-content', hint: 'Hero / 3D' },
  { name: 'Cinematic experience', href: '#experience', hint: 'Scroll storytelling' },
  { name: 'Layer architecture', href: '#architecture', hint: 'Exploded 3D' },
  { name: 'Customization studio', href: '#customization', hint: 'Shape / shade / edition' },
  { name: 'Visual comparison', href: '#visualizer', hint: 'Finish preview' },
  { name: 'Questions', href: '#questions', hint: 'Product notes' },
];
const shapeNames: Record<PatchShape,string> = { square: 'Square pad', round: 'Round dot', strip: 'Surgical strip' };
const editionNames: Record<PatchEdition,string> = { standard: 'Standard', nighttime: 'Nighttime', clear: 'Clear' };

export function StudioDock({ config, skinToneId, onSkinToneChange, onChange, onExplode, onReset }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'navigate'|'configure'>('navigate');
  const [notice, setNotice] = useState('');
  const [saved, setSaved] = useState<StudioConfig[]>(() => {
    try { const data = JSON.parse(localStorage.getItem('purecover-v5-presets') || '[]'); return Array.isArray(data) ? data.slice(0, 8) : []; } catch { return []; }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const shade = SHADE_OPTIONS.find(s => s.id === config.shadeId) ?? SHADE_OPTIONS[0];
  const matches = useMemo(() => SECTIONS.filter(s => `${s.name} ${s.hint}`.toLowerCase().includes(query.toLowerCase())), [query]);
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setOpen(v => !v); }
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, []);
  useEffect(() => { if (open) { setQuery(''); requestAnimationFrame(() => inputRef.current?.focus()); } }, [open]);
  useEffect(() => { localStorage.setItem('purecover-v5-presets', JSON.stringify(saved)); }, [saved]);
  useEffect(() => { if (!notice) return; const t = window.setTimeout(() => setNotice(''), 3000); return () => clearTimeout(t); }, [notice]);
  const update = (partial: Partial<StudioConfig>) => onChange({ ...config, ...partial });
  const navigate = (href: string) => { setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); };
  const save = () => { if (saved.some(s => JSON.stringify(s) === JSON.stringify(config))) { setNotice('This configuration is already saved'); return; } setSaved(v => [config, ...v].slice(0,8)); setNotice('Configuration saved on this device'); };
  const share = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('shape', config.shape);
    url.searchParams.set('shade', config.shadeId);
    url.searchParams.set('edition', config.edition);
    url.searchParams.set('skin', skinToneId);
    try { await navigator.clipboard.writeText(url.toString()); setNotice('Shareable configuration link copied'); }
    catch { setNotice('Clipboard unavailable — use the browser address bar'); }
  };
  const exportConfig = () => {
    const payload = { product: 'PureCover concept', version: 'Ultimate 5.1', skinToneId, ...config, shadeName: shade.name, note: 'Design concept; not a confirmed product specification.' };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'purecover-configuration.json'; a.click(); URL.revokeObjectURL(url);
    setNotice('Configuration exported');
  };
  return <>
    <div className="fixed bottom-4 left-1/2 z-[65] w-[min(94vw,590px)] -translate-x-1/2 rounded-[1.6rem] border border-white/60 bg-[#241719]/95 p-2 text-white shadow-[0_20px_75px_rgba(36,12,18,.32)] backdrop-blur-2xl sm:bottom-6" role="toolbar" aria-label="PureCover design studio">
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => { setTab('navigate'); setOpen(true); }} className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-white/10" aria-label="Open command menu">
          <Search size={17} className="shrink-0 text-[#F1B7B8]"/><span className="truncate text-xs font-medium sm:text-sm">Explore PureCover</span><span className="ml-auto hidden rounded-md border border-white/20 px-1.5 py-1 font-mono text-[10px] text-white/50 sm:inline">⌘ K</span>
        </button>
        <div className="h-8 w-px bg-white/15"/>
        <button type="button" onClick={() => { setTab('configure'); setOpen(true); }} className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition hover:bg-white/10" aria-label="Configure patch"><span className="h-4 w-4 shrink-0 rounded-full border border-white/40" style={{background:shade.hex}}/><span className="hidden sm:inline">Customize</span><SlidersHorizontal size={15}/></button>
        <button type="button" onClick={share} className="rounded-xl p-3 transition hover:bg-white/10" title="Copy configuration link" aria-label="Copy configuration link"><Share2 size={17}/></button>
        <button type="button" onClick={save} className="rounded-xl bg-[#8F1726] p-3 transition hover:bg-[#AB2636]" title="Save configuration" aria-label="Save configuration"><Bookmark size={17}/></button>
      </div>
    </div>
    {notice && <div role="status" className="fixed bottom-24 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-[#25191A] px-5 py-3 text-center text-xs text-white shadow-xl">{notice}</div>}
    {open && <div className="fixed inset-0 z-[90] flex items-start justify-center bg-[#170B0D]/65 px-3 pt-[min(14vh,110px)] backdrop-blur-md" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <section role="dialog" aria-modal="true" aria-label="PureCover command studio" className="w-full max-w-2xl overflow-hidden rounded-[1.8rem] border border-white/70 bg-[#FAF5F4] text-[#1C1415] shadow-[0_40px_120px_rgba(0,0,0,.32)]">
        <div className="flex items-center gap-3 border-b border-[#7A0C18]/10 px-5 py-4"><Command size={18} className="text-[#7A0C18]"/><input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search sections or customize your patch..." className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#1C1415]/40" aria-label="Search sections"/><button onClick={() => setOpen(false)} aria-label="Close command studio" className="rounded-lg p-2 hover:bg-[#7A0C18]/10"><X size={19}/></button></div>
        <div className="flex gap-2 border-b border-[#7A0C18]/10 px-5 py-3"><button onClick={() => setTab('navigate')} className={`rounded-full px-4 py-2 text-xs font-semibold ${tab === 'navigate' ? 'bg-[#7A0C18] text-white':'bg-white text-[#7A0C18]'}`}>Navigate</button><button onClick={() => setTab('configure')} className={`rounded-full px-4 py-2 text-xs font-semibold ${tab === 'configure' ? 'bg-[#7A0C18] text-white':'bg-white text-[#7A0C18]'}`}>Configure</button></div>
        <div className="max-h-[min(65vh,560px)] overflow-y-auto p-5">
          {tab === 'navigate' ? <div className="space-y-1">{matches.map(s => <button key={s.href} onClick={() => navigate(s.href)} className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-[#7A0C18]/8"><span><span className="block text-sm font-semibold">{s.name}</span><span className="text-xs text-[#1C1415]/50">{s.hint}</span></span><ArrowRight size={16} className="text-[#7A0C18] transition-transform group-hover:translate-x-1"/></button>)}{!matches.length && <p className="py-6 text-center text-sm text-[#1C1415]/55">No matching sections found.</p>}<button onClick={() => { onExplode(); navigate('#architecture'); }} className="mt-3 flex w-full items-center gap-3 rounded-xl bg-[#7A0C18] px-4 py-3 text-left text-sm font-semibold text-white"><Layers3 size={17}/> Open exploded layer explorer <ArrowRight size={16} className="ml-auto"/></button></div> : <div className="space-y-6">
            <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#7A0C18]">Patch shape</p><div className="grid grid-cols-3 gap-2">{(['round','square','strip'] as const).map(s => <button key={s} onClick={() => update({shape:s})} aria-pressed={config.shape===s} className={`rounded-xl border p-3 text-xs font-medium ${config.shape===s ? 'border-[#7A0C18] bg-[#7A0C18] text-white':'border-[#7A0C18]/15 bg-white'}`}>{shapeNames[s]}</button>)}</div></div>
            <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#7A0C18]">Shade</p><div className="grid grid-cols-3 gap-2 sm:grid-cols-6">{SHADE_OPTIONS.map(s => <button key={s.id} onClick={() => update({shadeId:s.id})} aria-label={s.name} aria-pressed={config.shadeId===s.id} className={`flex flex-col items-center gap-2 rounded-xl border p-2 text-center text-[10px] ${config.shadeId===s.id ? 'border-[#7A0C18] bg-[#7A0C18]/5':'border-transparent bg-white'}`}><span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10" style={{background:s.hex}}>{config.shadeId===s.id && <Check size={15} className="text-[#26181A]"/>}</span>{s.name}</button>)}</div></div>
            <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#7A0C18]">Simulated skin tone</p><div className="grid grid-cols-4 gap-2 sm:grid-cols-8">{SKIN_TONES.map(t => <button key={t.id} type="button" onClick={() => onSkinToneChange(t.id)} aria-pressed={skinToneId === t.id} title={t.name} className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-[10px] ${skinToneId === t.id ? 'border-[#7A0C18] bg-[#7A0C18]/5' : 'border-transparent bg-white'}`}><span className="h-8 w-8 rounded-full border border-black/10" style={{background:t.hex}}/>{t.name}</button>)}</div><a href="#visualizer" onClick={()=>setOpen(false)} className="mt-2 inline-block text-xs text-[#7A0C18] underline">Open skin preview</a></div>
            <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#7A0C18]">Edition</p><div className="grid grid-cols-3 gap-2">{(['standard','nighttime','clear'] as const).map(e => <button key={e} onClick={() => update({edition:e})} aria-pressed={config.edition===e} className={`rounded-xl border p-3 text-xs font-medium ${config.edition===e ? 'border-[#7A0C18] bg-[#7A0C18] text-white':'border-[#7A0C18]/15 bg-white'}`}>{editionNames[e]}</button>)}</div></div>
            <div className="flex flex-wrap gap-2 border-t border-[#7A0C18]/10 pt-4"><button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-[#7A0C18] px-4 py-2.5 text-xs font-semibold text-white"><Bookmark size={14}/> Save preset</button><button onClick={share} className="inline-flex items-center gap-2 rounded-full border border-[#7A0C18]/20 bg-white px-4 py-2.5 text-xs font-semibold"><Copy size={14}/> Copy link</button><button onClick={exportConfig} className="inline-flex items-center gap-2 rounded-full border border-[#7A0C18]/20 bg-white px-4 py-2.5 text-xs font-semibold"><Download size={14}/> Export JSON</button><button onClick={onReset} className="inline-flex items-center gap-2 rounded-full border border-[#7A0C18]/20 bg-white px-4 py-2.5 text-xs font-semibold"><RotateCcw size={14}/> Reset 3D</button></div>
            {saved.length > 0 && <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#7A0C18]">Saved presets · this device</p><div className="space-y-2">{saved.map((s,i) => <div key={`${s.shape}-${s.shadeId}-${s.edition}-${i}`} className="flex items-center gap-3 rounded-xl bg-white p-3"><span className="h-7 w-7 rounded-full border border-black/10" style={{background:SHADE_OPTIONS.find(sh=>sh.id===s.shadeId)?.hex}}/><span className="min-w-0 flex-1 truncate text-xs">{shapeNames[s.shape]} · {SHADE_OPTIONS.find(sh=>sh.id===s.shadeId)?.name} · {editionNames[s.edition]}</span><button className="rounded-lg px-3 py-2 text-xs font-semibold text-[#7A0C18] hover:bg-[#7A0C18]/5" onClick={() => onChange(s)}>Apply</button><button className="rounded-lg p-2 text-[#7A0C18] hover:bg-[#7A0C18]/5" aria-label="Remove preset" onClick={() => setSaved(v=>v.filter((_,j)=>j!==i))}><X size={15}/></button></div>)}</div></div>}
            <p className="text-xs leading-5 text-[#1C1415]/55">Interactive concept only. Shades, editions and performance are not verified commercial specifications.</p>
          </div>}
        </div>
        <div className="flex items-center justify-between border-t border-[#7A0C18]/10 px-5 py-3 text-[11px] text-[#1C1415]/50"><span>PURECOVER / ULTIMATE 5.1</span><span>ESC to close</span></div>
      </section>
    </div>}
  </>;
}
