import { Globe, Moon, Sun, Clock } from 'lucide-react';
import Logo from '../ui/Logo';
import BetaBadge from '../ui/BetaBadge';
import { useT, type Lang } from '../../lib/translations';

interface Props {
  theme: 'dark' | 'light';
  language: Lang;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onOpenHistory: () => void;
}

export default function Header({
  theme,
  language,
  onToggleTheme,
  onToggleLanguage,
  onOpenHistory,
}: Props) {
  const t = useT(language);

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl border-b app-header safe-top"
      style={{
        background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Logo + Brand text + Beta badge — always visible, even on small screens */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="flex-shrink-0">
              <Logo size="md" />
            </div>
            <div className="leading-tight min-w-0 flex-1">
              <h1
                className="font-extrabold text-[13px] min-[380px]:text-sm sm:text-lg truncate flex items-center gap-1.5 sm:gap-2"
                style={{ color: 'var(--text)' }}
              >
                <span className="truncate">{t.brand}</span>
                <BetaBadge language={language} />
              </h1>
              <p
                className="hidden min-[380px]:block text-[11px] sm:text-xs font-medium opacity-70 truncate"
                style={{ color: 'var(--text-3)' }}
              >
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Actions — slightly smaller on mobile to keep the title visible */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={onOpenHistory}
              className="min-w-10 min-h-10 p-2 sm:p-2.5 rounded-xl transition-all hover:scale-105"
              style={{
                background: 'color-mix(in srgb, var(--text) 4%, transparent)',
                color: 'var(--text-2)',
              }}
              aria-label={t.nav.history}
              title={t.nav.history}
            >
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={onToggleLanguage}
              className="min-w-10 min-h-10 p-2 sm:p-2.5 rounded-xl transition-all hover:scale-105"
              style={{
                background: 'color-mix(in srgb, var(--text) 4%, transparent)',
                color: 'var(--text-2)',
              }}
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={onToggleTheme}
              className="min-w-10 min-h-10 p-2 sm:p-2.5 rounded-xl transition-all hover:scale-105"
              style={{
                background: 'color-mix(in srgb, var(--text) 4%, transparent)',
                color: theme === 'dark' ? '#FFCB47' : 'var(--text-2)',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
