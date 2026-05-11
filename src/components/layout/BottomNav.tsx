import { Home, TrendingUp, Calculator, BarChart3 } from 'lucide-react';
import type { Lang } from '../../lib/translations';
import { useT } from '../../lib/translations';
import { haptic } from '../../lib/utils';

export type Module = 'home' | 'ex-price' | 'dividend' | 'average-cost';

interface Props {
  active: Module;
  onChange: (m: Module) => void;
  language: Lang;
}

export default function BottomNav({ active, onChange, language }: Props) {
  const t = useT(language);
  const items: Array<{ id: Module; icon: React.ComponentType<{ className?: string }>; label: string }> = [
    { id: 'home', icon: Home, label: t.nav.home },
    { id: 'ex-price', icon: TrendingUp, label: t.nav.exPrice },
    { id: 'dividend', icon: Calculator, label: t.nav.dividend },
    { id: 'average-cost', icon: BarChart3, label: t.nav.averageCost },
  ];

  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-2">
        <div
          className="flex justify-center gap-2 p-1.5 rounded-2xl backdrop-blur-md"
          style={{
            background: 'color-mix(in srgb, var(--surface) 70%, transparent)',
            border: '1px solid var(--border)',
          }}
        >
          {items.map(({ id, icon: Icon, label }) => {
            const isActive = id === active;
            return (
              <button
                key={id}
                onClick={() => {
                  haptic(8);
                  onChange(id);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all min-h-11 ${
                  isActive ? 'shadow-lg' : 'hover:scale-[1.02]'
                }`}
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, #0A84FF, #6366F1)',
                        color: '#fff',
                        boxShadow: '0 10px 28px rgba(10,132,255,.35)',
                      }
                    : { color: 'var(--text-2)' }
                }
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl border-t nav-shell"
        style={{
          background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
          borderColor: 'var(--border)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex justify-around items-center px-2 py-2.5">
          {items.map(({ id, icon: Icon, label }) => {
            const isActive = id === active;
            return (
              <button
                key={id}
                onClick={() => {
                  haptic(10);
                  onChange(id);
                }}
                className="flex flex-col items-center gap-1 py-2 px-2 rounded-2xl transition-all flex-1 min-w-0 min-h-[58px]"
                style={
                  isActive
                    ? {
                        background: 'linear-gradient(135deg, color-mix(in srgb, #0A84FF 18%, transparent), color-mix(in srgb, #6366F1 12%, transparent))',
                        color: '#0A84FF',
                        border: '1px solid color-mix(in srgb, #0A84FF 22%, transparent)',
                      }
                    : { color: 'var(--text-3)' }
                }
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-bold truncate max-w-full">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
