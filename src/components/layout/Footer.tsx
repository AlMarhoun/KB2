import { Youtube } from 'lucide-react';
import type { Lang } from '../../lib/translations';
import { useT } from '../../lib/translations';

interface Props {
  language: Lang;
}

export default function Footer({ language }: Props) {
  const t = useT(language);
  const today = new Date().toLocaleDateString(language === 'ar' ? 'ar-KW' : 'en-GB', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <footer
      className="mt-16 pt-10 pb-24 md:pb-10 border-t"
      style={{ borderColor: 'var(--border)', color: 'var(--text-3)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <a
            href="https://t.me/Eng_AlMarhoun"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl transition-all hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
            style={{
              background: 'color-mix(in srgb, var(--text) 5%, transparent)',
              color: 'var(--text-2)',
            }}
            aria-label="Telegram"
            title="Telegram: @Eng_AlMarhoun"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>

          <a
            href="https://youtube.com/@mohammadalmarhoun?si=739Olv4MpSmD8-Cf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-2xl transition-all hover:scale-110 hover:shadow-lg hover:shadow-red-500/30"
            style={{
              background: 'color-mix(in srgb, var(--text) 5%, transparent)',
              color: 'var(--text-2)',
            }}
            aria-label="YouTube"
            title="YouTube: @mohammadalmarhoun"
          >
            <Youtube className="w-6 h-6" />
          </a>
        </div>

        {/* Disclaimer — softened framing per Round 4 spec */}
        <div
          className="text-xs text-center max-w-2xl mx-auto mb-4 leading-relaxed px-4 py-3 rounded-xl"
          style={{
            background: 'color-mix(in srgb, var(--text) 3%, transparent)',
            border: '1px solid var(--border)',
            color: 'var(--text-2)',
          }}
        >
          {t.footer.disclaimer}
        </div>

        {/* Copyright + meta */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs">
          <span>{t.footer.copyright}</span>
          <span className="opacity-50">·</span>
          <span>
            {t.about.lastUpdated}: {today} · v2.0
          </span>
          <span className="opacity-50">·</span>
          <span>{t.footer.madeIn}</span>
        </div>
      </div>
    </footer>
  );
}
