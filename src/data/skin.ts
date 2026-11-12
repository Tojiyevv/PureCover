export const SKIN_TONES = [
  { id: 'porcelain', name: 'Porcelain', hex: '#F2D9C6' },
  { id: 'fair', name: 'Fair', hex: '#EAC3A8' },
  { id: 'light', name: 'Light', hex: '#DFAE8D' },
  { id: 'medium', name: 'Medium', hex: '#C78D69' },
  { id: 'tan', name: 'Tan', hex: '#A96D4C' },
  { id: 'deep', name: 'Deep', hex: '#855239' },
  { id: 'rich', name: 'Rich', hex: '#633B2C' },
  { id: 'espresso', name: 'Espresso', hex: '#442A23' },
] as const;
export type SkinToneId = typeof SKIN_TONES[number]['id'];
export const isSkinTone = (id: string | null): id is SkinToneId => SKIN_TONES.some(t => t.id === id);
