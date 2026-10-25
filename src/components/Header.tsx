/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CampusPreset, Theme, Language } from '../types';
import { TRANSLATIONS } from '../lib/i18n';
import { Settings, Sun, Moon, Heart } from 'lucide-react';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  sessionCount: number;
  campus: CampusPreset | null;
  theme: Theme;
  language: Language;
  onOpenSettings: () => void;
  onOpenSupport: () => void;
  onOpenPrivacy: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  sessionCount,
  campus,
  theme,
  language,
  onOpenSettings,
  onOpenSupport,
  onOpenPrivacy,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Header background & border according to active theme
  const headerBg =
    theme === 'dark'
      ? 'bg-stone-900/90 border-stone-800 text-stone-100'
      : theme === 'romantic'
      ? 'bg-rose-50/90 border-rose-200 text-rose-950'
      : 'bg-stone-50/90 border-stone-200 text-stone-900';

  const linkClass =
    theme === 'dark'
      ? 'text-stone-400 hover:text-white'
      : theme === 'romantic'
      ? 'text-rose-700 hover:text-rose-950'
      : 'text-stone-600 hover:text-stone-900';

  const activeLinkClass =
    theme === 'dark'
      ? 'text-white font-semibold'
      : theme === 'romantic'
      ? 'text-rose-950 font-bold'
      : 'text-stone-950 font-semibold';

  const primaryBtnClass =
    theme === 'dark'
      ? 'text-stone-900 bg-white hover:bg-stone-100'
      : theme === 'romantic'
      ? 'text-white bg-rose-600 hover:bg-rose-700 shadow-rose-200 shadow-sm'
      : 'text-white bg-stone-900 hover:bg-stone-800 shadow-xs';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark & Affiliation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('context')}
            className="text-left text-lg font-bold tracking-tight whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity flex items-center gap-1.5"
            title="AI Mood Mirror"
          >
            <span>{t.appName}</span>
            {theme === 'romantic' && <span className="text-sm">💖</span>}
          </button>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-stone-200 dark:border-stone-800">
            <a
              href="https://tu-dresden.de"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 px-1.5 rounded bg-white dark:bg-white/95 border border-stone-200 hover:border-blue-400 transition-colors shadow-2xs"
              title="TU Dresden"
            >
              <img src="/assets/aistudio/TU_Dresden_5648b15f.png" alt="TU Dresden" className="h-4 w-auto object-contain" />
            </a>
            <span className="text-[10px] opacity-40 font-mono">×</span>
            <a
              href="https://scads.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 px-1.5 rounded bg-white dark:bg-white/95 border border-stone-200 hover:border-cyan-400 transition-colors shadow-2xs"
              title="ScaDS.AI"
            >
              <img src="/assets/aistudio/logo_50577e3d.png" alt="ScaDS.AI" className="h-4 w-auto object-contain" />
            </a>
          </div>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onNavigate('context')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              ['context', 'write', 'draw', 'talk', 'result'].includes(currentScreen)
                ? activeLinkClass
                : linkClass
            }`}
          >
            {t.nav.reflect}
          </button>
          {sessionCount > 0 && (
            <button
              onClick={() => onNavigate('summary')}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentScreen === 'summary' ? activeLinkClass : linkClass
              }`}
            >
              {t.nav.summary}
              <span className="text-xs opacity-60 font-mono">({sessionCount})</span>
            </button>
          )}
          <a
            href="/"
            className={`transition-colors whitespace-nowrap shrink-0 text-xs uppercase tracking-wider font-semibold opacity-75 hover:opacity-100 ${linkClass}`}
            title="Experience the scroll-driven video landing hero"
          >
            Story Hero &nearr;
          </a>
          <button
            onClick={onOpenPrivacy}
            className={`transition-colors whitespace-nowrap shrink-0 ${linkClass}`}
          >
            {t.nav.privacy}
          </button>
          <button
            onClick={onOpenSupport}
            className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 text-stone-500"
          >
            {t.nav.support}
          </button>
        </nav>

        {/* Zone 3: 1 primary action + Settings toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              theme === 'dark'
                ? 'border-stone-700 bg-stone-800 text-stone-200 hover:bg-stone-700'
                : theme === 'romantic'
                ? 'border-rose-300 bg-rose-100/70 text-rose-900 hover:bg-rose-200/70'
                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'
            }`}
            title="Appearance & Language Settings"
          >
            {theme === 'romantic' ? (
              <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            ) : theme === 'dark' ? (
              <Moon className="w-3.5 h-3.5 text-amber-300" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span className="uppercase font-mono text-[11px] font-semibold">{language}</span>
            <Settings className="w-3.5 h-3.5 opacity-60 ml-0.5" />
          </button>

          {sessionCount > 0 && currentScreen !== 'summary' ? (
            <button
              onClick={() => onNavigate('summary')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                theme === 'dark'
                  ? 'bg-stone-800 text-stone-100 hover:bg-stone-700'
                  : theme === 'romantic'
                  ? 'bg-rose-200/80 text-rose-950 hover:bg-rose-300/80'
                  : 'bg-stone-200/80 text-stone-900 hover:bg-stone-300/80'
              }`}
            >
              {t.nav.viewSummary} ({sessionCount})
            </button>
          ) : (
            <button
              onClick={() => onNavigate('context')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${primaryBtnClass}`}
            >
              {t.nav.newMirror}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
