import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, RotateCcw, Clock } from 'lucide-react';
import type { Lang } from '../../lib/translations';
import { useT } from '../../lib/translations';
import { type HistoryEntry, clearHistory, deleteEntry } from '../../lib/storage';
import { formatRelativeTime, haptic } from '../../lib/utils';
import { useState, useEffect } from 'react';
import { loadHistory } from '../../lib/storage';

interface Props {
  open: boolean;
  onClose: () => void;
  language: Lang;
  onRestore: (entry: HistoryEntry) => void;
}

export default function HistoryDrawer({ open, onClose, language, onRestore }: Props) {
  const t = useT(language);
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    if (open) setEntries(loadHistory());
  }, [open]);

  const handleClear = () => {
    haptic(15);
    clearHistory();
    setEntries([]);
  };

  const handleDelete = (id: string) => {
    haptic(8);
    deleteEntry(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const typeLabel = (type: HistoryEntry['type']) => {
    if (type === 'ex-price') return t.nav.exPrice;
    if (type === 'dividend') return t.nav.dividend;
    return t.nav.averageCost;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: language === 'ar' ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: language === 'ar' ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed top-0 bottom-0 w-full sm:w-[420px] z-50 flex flex-col"
            style={{
              background: 'var(--bg)',
              borderInlineEnd: '1px solid var(--border)',
              [language === 'ar' ? 'left' : 'right']: 0,
            } as React.CSSProperties}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-5 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
                <h2 className="font-extrabold text-lg" style={{ color: 'var(--text)' }}>
                  {t.history.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                aria-label="Close"
              >
                <X className="w-5 h-5" style={{ color: 'var(--text-2)' }} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              {entries.length === 0 ? (
                <div
                  className="text-center py-20 px-6 text-sm font-medium"
                  style={{ color: 'var(--text-3)' }}
                >
                  {t.history.empty}
                </div>
              ) : (
                <ul className="space-y-2">
                  {entries.map((e) => (
                    <li
                      key={e.id}
                      className="card p-4 group"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span
                          className="text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md"
                          style={{
                            background: 'color-mix(in srgb, var(--brand-primary) 14%, transparent)',
                            color: 'var(--brand-primary)',
                          }}
                        >
                          {typeLabel(e.type)}
                        </span>
                        <span className="text-xs opacity-60" style={{ color: 'var(--text-3)' }}>
                          {formatRelativeTime(e.timestamp, language, t.history)}
                        </span>
                      </div>
                      <div
                        className="font-extrabold text-base num-tabular mb-3"
                        dir="ltr"
                        style={{ color: 'var(--text)' }}
                      >
                        {e.resultPreview}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            haptic(8);
                            onRestore(e);
                            onClose();
                          }}
                          className="btn btn-primary text-xs flex-1 py-2"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          {t.history.restore}
                        </button>
                        <button
                          onClick={() => handleDelete(e.id)}
                          className="btn btn-ghost text-xs py-2"
                          aria-label={t.history.delete}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Clear */}
            {entries.length > 0 && (
              <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <button
                  onClick={handleClear}
                  className="btn btn-ghost text-sm w-full text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                  {t.history.clear}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
