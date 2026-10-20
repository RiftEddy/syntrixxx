// ADZAVA Atelier Accent Color Engine
// Allows dynamic customization of ADZAVA's primary brand accent color

export interface AccentPreset {
  id: string;
  name: string;
  hex: string;
  hoverHex: string;
  glow: string;
  description: string;
}

export const ACCENT_PRESETS: AccentPreset[] = [
  {
    id: 'solar-gold',
    name: 'Solar Gold',
    hex: '#FFD700',
    hoverHex: '#FFE234',
    glow: 'rgba(255, 215, 0, 0.28)',
    description: 'Signature Atelier Luxury & High Horology'
  },
  {
    id: 'azure-cyan',
    name: 'Azure Cyber',
    hex: '#00E5FF',
    hoverHex: '#38BDF8',
    glow: 'rgba(0, 229, 255, 0.28)',
    description: 'Electric Precision & Algorithmic Compute'
  },
  {
    id: 'cyber-emerald',
    name: 'Cyber Emerald',
    hex: '#10B981',
    hoverHex: '#34D399',
    glow: 'rgba(16, 185, 129, 0.28)',
    description: 'Hyper-Performance & Bio-Tech Architecture'
  },
  {
    id: 'ultra-violet',
    name: 'Ultra Violet',
    hex: '#A855F7',
    hoverHex: '#C084FC',
    glow: 'rgba(168, 85, 247, 0.28)',
    description: 'Avant-Garde High-Fashion & WebGL Spatial'
  },
  {
    id: 'hyper-crimson',
    name: 'Hyper Crimson',
    hex: '#FF2A55',
    hoverHex: '#FB7185',
    glow: 'rgba(255, 42, 85, 0.28)',
    description: 'Provocative Brutalist Motion & Velocity'
  },
  {
    id: 'liquid-amber',
    name: 'Liquid Amber',
    hex: '#FF9100',
    hoverHex: '#FFA726',
    glow: 'rgba(255, 145, 0, 0.28)',
    description: 'Warm Chronograph Glow & Executive Presence'
  }
];

const STORAGE_KEY = 'adzava_atelier_accent_color';

export function getStoredAccentColor(): string {
  if (typeof window === 'undefined') return '#FFD700';
  return localStorage.getItem(STORAGE_KEY) || '#FFD700';
}

export function applyAccentColor(hexColor: string) {
  if (typeof window === 'undefined') return;

  const hex = hexColor.trim();
  const root = document.documentElement;

  root.style.setProperty('--accent', hex);
  root.style.setProperty('--color-brand-yellow', hex);
  root.style.setProperty('--accent-glow', `${hex}44`);

  // Compute slight lighten for hover
  root.style.setProperty('--accent-hover', hex);

  localStorage.setItem(STORAGE_KEY, hex);
  window.dispatchEvent(new CustomEvent('adzava-accent-change', { detail: { hex } }));
}
