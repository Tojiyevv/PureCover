import { useState } from 'react';
import { Check, MoveHorizontal, RotateCcw, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { SHADE_OPTIONS } from '../data/product';
import { SKIN_TONES } from '../data/skin';
import type { SkinToneId } from '../data/skin';
interface Props { shadeId: string; skinToneId: SkinToneId; onSkinToneChange: (id: SkinToneId) => void; }
export function VisualComparison({shadeId, skinToneId, onSkinToneChange}: Props) {
 const [value,setValue] = useState(52);
 const [lighting,setLighting] = useState<'daylight'|'studio'|'warm'>('daylight');
 const shade = SHADE_OPTIONS.find(s=>s.id===shadeId) ?? SHADE_OPTIONS[0];
 const skin = SKIN_TONES.find(s=>s.id===skinToneId) ?? SKIN_TONES[3];
 const light = lighting === 'studio' ? 'rgba(255,255,255,.19)' : lighting === 'warm' ? 'rgba(255,167,94,.18)' : 'rgba(255,244,226,.07)';
 return <section id="visualizer" className="bg-[#F4EAE7] py-24 lg:py-32">
   <div className="mx-auto max-w-7xl px-6 lg:px-10">
     <div className="grid items-end gap-6 md:grid-cols-2">
       <div><span className="font-mono-tech text-xs uppercase tracking-widest text-[#7A0C18]">04 / SKIN TONE STUDIO</span><h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">See it on <em className="text-[#7A0C18]">your canvas.</em></h2></div>
       <p className="max-w-md text-sm leading-7 text-[#1C1415]/65">Choose a simulated skin tone and lighting condition, then compare the selected patch shade. This is an illustrative preview, not a real skin scan or clinical result.</p>
     </div>
     <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_.6fr]">
       <div className="relative h-[350px] overflow-hidden rounded-[2rem] border border-[#7A0C18]/10 shadow-xl shadow-[#7A0C18]/5 sm:h-[500px]" style={{backgroundColor:skin.hex}}>
         <div className="pointer-events-none absolute inset-0" style={{background:`radial-gradient(ellipse at 24% 18%, rgba(255,255,255,.25), transparent 65%), linear-gradient(135deg, ${light}, rgba(34,11,8,.15))`}}/>
         <div className="pointer-events-none absolute inset-0 opacity-40" style={{backgroundImage:'repeating-linear-gradient(112deg,transparent 0px,transparent 7px,rgba(90,42,38,.04) 8px,transparent 9px)'}}/>
         <div className="absolute inset-0" style={{clipPath:`inset(0 ${100-value}% 0 0)`}}>
           <div className="absolute inset-0" style={{background:`radial-gradient(ellipse at 24% 18%, rgba(255,255,255,.22), transparent 65%), linear-gradient(135deg, ${light}, rgba(34,11,8,.15))`}}/>
           <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 shadow-[0_12px_28px_rgba(76,29,24,.16),inset_0_2px_8px_rgba(255,255,255,.25)] transition-colors duration-300 sm:h-40 sm:w-40" style={{backgroundColor:shade.hex,opacity:.82}}/>
           <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#7A0C18]">PATCH OVERLAY</div>
         </div>
         <div className="absolute right-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#7A0C18]">SKIN SIMULATION</div>
         <div className="pointer-events-none absolute inset-y-0 w-[2px] bg-white shadow-lg" style={{left:`${value}%`}}><span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#7A0C18] shadow-xl"><MoveHorizontal size={20}/></span></div>
         <input aria-label="Compare patch on selected simulated skin tone" type="range" min="0" max="100" value={value} onChange={e=>setValue(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-20"/>
         <div className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 font-mono text-xs text-[#7A0C18]">{value}% REVEAL</div>
       </div>
       <div className="flex flex-col gap-6 rounded-[2rem] border border-[#7A0C18]/10 bg-white p-6 sm:p-8">
         <div><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#7A0C18]/10 text-[#7A0C18]"><SlidersHorizontal size={21}/></div><h3 className="font-display text-2xl font-bold">Skin Tone Studio</h3><p className="mt-2 text-sm leading-6 text-[#1C1415]/60">Change the skin surface independently of the patch shade.</p></div>
         <div><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-widest text-[#7A0C18]">Skin tone</p><span className="text-xs text-[#1C1415]/60">{skin.name}</span></div><div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-4">{SKIN_TONES.map(t=><button type="button" key={t.id} onClick={()=>onSkinToneChange(t.id)} aria-label={`Skin tone: ${t.name}`} aria-pressed={skinToneId===t.id} title={t.name} className={`group flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border p-1.5 transition-all hover:-translate-y-0.5 ${skinToneId===t.id?'border-[#7A0C18] bg-[#FAF5F4] shadow-sm':'border-[#7A0C18]/10'}`}><span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10" style={{background:t.hex}}>{skinToneId===t.id&&<Check size={16} color={['rich','espresso','deep'].includes(t.id)?'#fff':'#48261f'}/>}</span><span className="text-[9px] text-[#1C1415]/70">{t.name}</span></button>)}</div></div>
         <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#7A0C18]">Lighting simulation</p><div className="grid grid-cols-3 gap-2">{(['daylight','studio','warm'] as const).map(l=><button key={l} type="button" aria-pressed={lighting===l} onClick={()=>setLighting(l)} className={`rounded-xl border px-2 py-2.5 text-xs capitalize ${lighting===l?'border-[#7A0C18] bg-[#7A0C18] text-white':'border-[#7A0C18]/15 bg-[#FAF5F4]'}`}>{l}</button>)}</div></div>
         <div className="mt-auto border-t border-[#7A0C18]/10 pt-5"><div className="flex items-center gap-3"><span className="h-10 w-10 rounded-full border border-black/10" style={{backgroundColor:shade.hex}}/><div><p className="text-[10px] uppercase tracking-widest text-[#1C1415]/50">Patch shade</p><p className="text-sm font-semibold">{shade.name}</p></div></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><a href="#customization" className="text-xs font-semibold text-[#7A0C18] underline underline-offset-4">Change patch shade</a><button type="button" onClick={()=>{onSkinToneChange('medium');setLighting('daylight');setValue(52);}} className="inline-flex items-center gap-1 text-xs text-[#7A0C18]"><RotateCcw size={13}/> Reset preview</button></div></div>
         <p className="flex gap-2 text-[11px] leading-5 text-[#1C1415]/55"><ShieldCheck size={16} className="shrink-0"/> Digital color swatches vary by screen and lighting; this does not determine a real-world shade match.</p>
       </div>
     </div>
   </div>
 </section>
}
