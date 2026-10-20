import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check, Sparkles, X } from 'lucide-react';
import { ACCENT_PRESETS, getStoredAccentColor, applyAccentColor, AccentPreset } from '../utils/accentTheme';

interface AccentSwitcherProps {
  compact?: boolean;
}

export const AccentSwitcher: React.FC<AccentSwitcherProps> = ({ compact = false }) => {
  const [currentAccent, setCurrentAccent] = useState<string>('#FFD700');
  const [isOpen, setIsOpen] = useState(false);
  const [customHex, setCustomHex] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  // Initialize and listen to custom event
  useEffect(() => {
    const saved = getStoredAccentColor();
    setCurrentAccent(saved);
    applyAccentColor(saved);

    const handleAccentChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ hex: string }>;
      if (customEvent.detail?.hex) {
        setCurrentAccent(customEvent.detail.hex);
      }
    };

    window.addEventListener('adzava-accent-change', handleAccentChange);
    return () => window.removeEventListener('adzava-accent-change', handleAccentChange);
  }, []);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const selectColor = (hex: string) => {
    setCurrentAccent(hex);
    applyAccentColor(hex);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let cleaned = customHex.trim();
    if (!cleaned) return;
    if (!cleaned.startsWith('#')) cleaned = `#${cleaned}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(cleaned) || /^#[0-9A-Fa-f]{3}$/.test(cleaned)) {
      selectColor(cleaned);
      setCustomHex('');
    }
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 text-[11px] font-mono uppercase tracking-wider text-white/80 transition-all cursor-pointer group"
        title="ADZAVA Accent Color Theme"
      >
        <span
          className="w-2.5 h-2.5 rounded-full border border-black/40 shadow-sm transition-transform group-hover:scale-125"
          style={{ backgroundColor: currentAccent }}
        />
        <span className="hidden md:inline text-white/70 group-hover:text-white">Accent</span>
        <Palette className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-[#09090b] border border-white/20 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.85)] z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" style={{ color: currentAccent }} />
              <span className="text-xs uppercase tracking-wider font-bold text-white">
                ADZAVA Accent Color
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-white/50 mb-3 leading-relaxed">
            Select a signature colorway for ADZAVA's typography, monogram, and action lighting.
          </p>

          {/* Presets Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {ACCENT_PRESETS.map((preset: AccentPreset) => {
              const isSelected = currentAccent.toLowerCase() === preset.hex.toLowerCase();
              return (
                <button
                  key={preset.id}
                  onClick={() => selectColor(preset.hex)}
                  className={`p-2 flex items-center gap-2 border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 border-white text-white'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/30 text-white/70 hover:text-white'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/40 flex items-center justify-center"
                    style={{ backgroundColor: preset.hex }}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 text-black stroke-[3]" />}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold truncate leading-tight">{preset.name}</div>
                    <div className="text-[9px] font-mono text-white/40">{preset.hex}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Hex Form */}
          <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-white/10">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1.5">
              Custom Hex Code
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="#00E5FF"
                value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                maxLength={7}
                className="flex-1 px-2.5 py-1 text-xs font-mono bg-black border border-white/20 text-white focus:outline-none focus:border-white placeholder:text-white/20"
              />
              <button
                type="submit"
                className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-white text-black hover:bg-white/90 transition-colors cursor-pointer"
              >
                Set
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
