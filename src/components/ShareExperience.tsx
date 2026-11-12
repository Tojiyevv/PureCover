import { useEffect, useId, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Check, Copy, Download, Expand, Link2, QrCode, X } from 'lucide-react';

type ShareExperienceProps = { open: boolean; onClose: () => void };

export function ShareExperience({ open, onClose }: ShareExperienceProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [presentation, setPresentation] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState('');
  // Preserve the current product configuration in the shared URL.
  const shareUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
  const isLocal = typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(window.location.hostname);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled])'));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); previouslyFocused?.focus(); };
  }, [open, onClose]);

  useEffect(() => { if (!open) { setPresentation(false); setFeedback(''); setCopied(false); } }, [open]);

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareUrl); setCopied(true); setFeedback('Link copied.'); }
    catch { setFeedback('Copy unavailable. Select the link below and copy it manually.'); }
  };

  const downloadQR = () => {
    const svg = svgContainerRef.current?.querySelector('svg');
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', '1200');
    clone.setAttribute('height', '1200');
    const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'PureCover-QR.svg'; document.body.appendChild(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback('QR code downloaded as SVG.');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1C1415]/75 p-3 backdrop-blur-lg sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby={titleId} className={`relative w-full overflow-y-auto rounded-[2rem] bg-[#FAF5F4] shadow-2xl outline-none transition-all ${presentation ? 'flex h-full max-w-none flex-col items-center justify-center' : 'max-h-[95dvh] max-w-lg'}`}>
        <button type="button" onClick={onClose} aria-label="Close QR dialog" className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#7A0C18]/15 bg-white text-[#7A0C18] hover:bg-[#F0E5E5]"><X size={19}/></button>
        <div className={`flex flex-col items-center text-center ${presentation ? 'w-full gap-5 px-6 py-10' : 'gap-4 px-6 pb-7 pt-12 sm:px-10'}`}>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#7A0C18]">Live product experience</span>
          <h2 id={titleId} className={`font-display font-semibold italic tracking-tight text-[#7A0C18] ${presentation ? 'text-5xl sm:text-7xl' : 'text-4xl'}`}>PureCover.</h2>
          <p className={`max-w-lg text-[#1C1415]/75 ${presentation ? 'text-lg sm:text-2xl' : 'text-sm'}`}>Scan to explore the interactive 3D experience on your phone.</p>
          <div ref={svgContainerRef} className={`rounded-[1.5rem] border border-[#7A0C18]/10 bg-white shadow-xl ${presentation ? 'w-[min(65vw,46vh,540px)] p-5 sm:p-8' : 'w-[min(75vw,300px)] p-5'}`}>
            <QRCodeSVG value={shareUrl} size={900} level="H" marginSize={2} bgColor="#FFFFFF" fgColor="#580710" style={{ width: '100%', height: 'auto', display: 'block' }} title="PureCover website QR code" />
          </div>
          {isLocal && <p role="alert" className="max-w-md rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-900">This is a localhost link. Other phones cannot open it. Deploy your site to Vercel first, then open the public URL to display a working QR code.</p>}
          {!presentation && (
            <>
              <label htmlFor="purecover-share-link" className="sr-only">Shareable site link</label>
              <input id="purecover-share-link" readOnly value={shareUrl} onFocus={e => e.currentTarget.select()} className="w-full rounded-xl border border-[#7A0C18]/15 bg-white px-4 py-3 text-center text-xs text-[#7A0C18] outline-none focus:border-[#7A0C18]" />
              <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
                <button onClick={copyLink} className="flex items-center justify-center gap-2 rounded-full bg-[#7A0C18] px-3 py-3 text-xs font-semibold text-white hover:bg-[#580710]">{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? 'Copied' : 'Copy Link'}</button>
                <button onClick={downloadQR} className="flex items-center justify-center gap-2 rounded-full border border-[#7A0C18]/20 bg-white px-3 py-3 text-xs font-semibold text-[#7A0C18] hover:bg-[#F2E8E8]"><Download size={16}/> Save QR</button>
                <button onClick={() => setPresentation(true)} className="col-span-2 flex items-center justify-center gap-2 rounded-full border border-[#7A0C18]/20 bg-white px-3 py-3 text-xs font-semibold text-[#7A0C18] hover:bg-[#F2E8E8] sm:col-span-1"><Expand size={16}/> Present</button>
              </div>
              {feedback && <p aria-live="polite" className="text-xs text-[#7A0C18]">{feedback}</p>}
            </>
          )}
          {presentation && <div className="flex flex-wrap justify-center gap-3"><button onClick={() => setPresentation(false)} className="rounded-full bg-[#7A0C18] px-6 py-3 text-sm font-semibold text-white">Exit presentation</button><button onClick={downloadQR} className="flex items-center gap-2 rounded-full border border-[#7A0C18]/25 px-6 py-3 text-sm font-semibold text-[#7A0C18]"><Download size={17}/> Download SVG</button></div>}
          <p className="flex items-center gap-1.5 text-[11px] text-[#7A0C18]/60"><Link2 size={13}/> {isLocal ? 'Local preview — deploy to share' : 'Live link'} <QrCode size={13}/></p>
        </div>
      </div>
    </div>
  );
}
