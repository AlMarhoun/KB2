import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Header from './components/layout/Header';
import BottomNav, { type Module } from './components/layout/BottomNav';
import Footer from './components/layout/Footer';
import SplashScreen from './components/layout/SplashScreen';
import HomePage from './components/home/HomePage';
import ExPriceCalculator from './components/calculators/ExPriceCalculator';
import DividendCalculator from './components/calculators/DividendCalculator';
import AverageCostCalculator from './components/calculators/AverageCostCalculator';
import HistoryDrawer from './components/shared/HistoryDrawer';

import {
  getStoredLang,
  getStoredTheme,
  setStoredLang,
  setStoredTheme,
  type HistoryEntry,
} from './lib/storage';
import { decodeStateFromUrl, clearUrlState } from './lib/url-state';
import type { Lang } from './lib/translations';

export default function App() {
  // ====== Theme + Language ======
  const [theme, setTheme] = useState<'dark' | 'light'>(() => getStoredTheme());
  const [language, setLanguage] = useState<Lang>(() => getStoredLang());
  const [activeModule, setActiveModule] = useState<Module>('home');
  const [historyOpen, setHistoryOpen] = useState(false);
  const [exampleInputs, setExampleInputs] = useState<Record<string, string> | undefined>();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const splashDuration = reducedMotion ? 550 : 2100;
    const timer = window.setTimeout(() => setShowSplash(false), splashDuration);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    setStoredTheme(theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#050510' : '#FAFAFB');
  }, [theme]);

  // Apply language + dir to <html>
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    setStoredLang(language);
  }, [language]);

  // ====== Read URL state on mount ======
  useEffect(() => {
    const state = decodeStateFromUrl();
    if (state) {
      setActiveModule(state.type);
      setExampleInputs(state.inputs);
    }
  }, []);

  // ====== Handlers ======
  const handleNavigate = (m: Module) => {
    if (m !== activeModule) {
      setActiveModule(m);
      setExampleInputs(undefined);
      clearUrlState();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoadExample = (
    type: Exclude<Module, 'home'>,
    inputs: Record<string, string>,
  ) => {
    setActiveModule(type);
    setExampleInputs(inputs);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestoreFromHistory = (entry: HistoryEntry) => {
    setActiveModule(entry.type);
    const inputs: Record<string, string> = {};
    Object.entries(entry.inputs).forEach(([k, v]) => {
      inputs[k] = String(v);
    });
    setExampleInputs(inputs);
  };

  const moduleKey = `${activeModule}-${JSON.stringify(exampleInputs || {})}`;

  return (
    <div className="min-h-screen relative app-shell" style={{ background: 'var(--bg)' }}>
      <AnimatePresence>{showSplash && <SplashScreen reducedMotion={reducedMotion} />}</AnimatePresence>

      {/* Atmospheric background glow */}
      <div className="bg-atmos" aria-hidden />

      {/* Header */}
      <Header
        theme={theme}
        language={language}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        onToggleLanguage={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
        onOpenHistory={() => setHistoryOpen(true)}
      />

      {/* Desktop nav */}
      <BottomNav active={activeModule} onChange={handleNavigate} language={language} />

      {/* Main content with route transitions */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-10 main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={moduleKey}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.3, ease: 'easeOut' }}
          >
            {activeModule === 'home' && (
              <HomePage
                language={language}
                onNavigate={handleNavigate}
                onLoadExample={handleLoadExample}
              />
            )}
            {activeModule === 'ex-price' && (
              <ExPriceCalculator language={language} initialInputs={exampleInputs} />
            )}
            {activeModule === 'dividend' && (
              <DividendCalculator language={language} initialInputs={exampleInputs} />
            )}
            {activeModule === 'average-cost' && (
              <AverageCostCalculator language={language} initialInputs={exampleInputs} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* History drawer */}
      <HistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        language={language}
        onRestore={handleRestoreFromHistory}
      />

      {/* Toast notifications */}
      <Toaster
        theme={theme}
        position="top-center"
        richColors
        toastOptions={{
          style: {
            fontFamily: language === 'ar' ? 'Cairo, sans-serif' : 'Inter, sans-serif',
            fontWeight: 700,
          },
        }}
      />

      {/* Vercel analytics + Core Web Vitals */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
