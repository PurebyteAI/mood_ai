/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AcademicContext, PreferredStyle, CampusPreset, Theme, Language } from '../types';
import { TRANSLATIONS } from '../lib/i18n';
import { PenLine, Palette, Mic, Heart } from 'lucide-react';

interface ContextPickerProps {
  selectedContext: AcademicContext;
  onSelectContext: (ctx: AcademicContext) => void;
  selectedStyle: PreferredStyle;
  onSelectStyle: (style: PreferredStyle) => void;
  onChooseMode: (mode: 'write' | 'draw' | 'talk') => void;
  campus: CampusPreset | null;
  onOpenSupport: () => void;
  theme: Theme;
  language: Language;
}

const CONTEXT_ICONS: Record<AcademicContext, string> = {
  exam: '📝',
  deadline: '⏰',
  group: '👥',
  presentation: '🎙️',
  general: '📚',
};

export const ContextPicker: React.FC<ContextPickerProps> = ({
  selectedContext,
  onSelectContext,
  selectedStyle,
  onSelectStyle,
  onChooseMode,
  campus,
  onOpenSupport,
  theme,
  language,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const cardBg =
    theme === 'dark'
      ? 'bg-stone-900 border-stone-800 text-stone-100'
      : theme === 'romantic'
      ? 'bg-white border-rose-200 text-stone-900 shadow-xs'
      : 'bg-white border-stone-200 text-stone-900 shadow-xs';

  const selectedItemClass =
    theme === 'romantic'
      ? 'border-rose-500 bg-rose-600 text-white shadow-xs'
      : theme === 'dark'
      ? 'border-white bg-white text-stone-950 font-bold shadow-xs'
      : 'border-stone-900 bg-stone-900 text-white shadow-xs';

  const unselectedItemClass =
    theme === 'dark'
      ? 'border-stone-800 bg-stone-900/90 hover:border-stone-700 text-stone-200'
      : theme === 'romantic'
      ? 'border-rose-200 bg-white hover:border-rose-300 text-rose-950'
      : 'border-stone-200 bg-white hover:border-stone-400 text-stone-900';

  const contextsList: AcademicContext[] = ['exam', 'deadline', 'group', 'presentation', 'general'];
  const stylesList: PreferredStyle[] = ['study_tip', 'poem', 'motivation', 'humor', 'surprise'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 relative z-10">
      {/* Top Institutional Header: TU Dresden on Left, ScaDS.AI on Right */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200/80 dark:border-stone-800">
        {/* Top Left: TU Dresden */}
        <div className="flex items-center gap-3">
          <a
            href="https://tu-dresden.de"
            target="_blank"
            rel="noopener noreferrer"
            title="Technische Universität Dresden (TU Dresden)"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-white/95 border border-stone-200 dark:border-stone-300 shadow-xs hover:shadow-sm hover:border-blue-400 transition-all"
          >
            <img
              src="/assets/aistudio/TU_Dresden_5648b15f.png"
              alt="TU Dresden Logo"
              className="h-7 sm:h-8 w-auto object-contain group-hover:scale-102 transition-transform"
            />
          </a>
          <div className="hidden sm:block text-left">
            <span className="block text-[11px] font-bold text-stone-900 dark:text-stone-100 leading-tight">
              TU Dresden
            </span>
            <span className="text-[10px] opacity-60 leading-none">
              University of Technology
            </span>
          </div>
        </div>

        {/* Center Pill / Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Academic AI Research Initiative</span>
        </div>

        {/* Top Right: ScaDS.AI */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <span className="block text-[11px] font-bold text-stone-900 dark:text-stone-100 leading-tight">
              ScaDS.AI
            </span>
            <span className="text-[10px] opacity-60 leading-none">
              Dresden · Leipzig
            </span>
          </div>
          <a
            href="https://scads.ai"
            target="_blank"
            rel="noopener noreferrer"
            title="ScaDS.AI Center for Scalable Data Analytics and Artificial Intelligence"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-white/95 border border-stone-200 dark:border-stone-300 shadow-xs hover:shadow-sm hover:border-cyan-400 transition-all"
          >
            <img
              src="/assets/aistudio/logo_50577e3d.png"
              alt="ScaDS.AI Dresden Leipzig Logo"
              className="h-7 sm:h-8 w-auto object-contain group-hover:scale-102 transition-transform"
            />
          </a>
        </div>
      </div>

      {/* Top Banner */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div
          className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
            theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'
          }`}
        >
          {t.context.step1}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {t.context.title}
          {theme === 'romantic' && <span className="ml-1.5 text-rose-500">♡</span>}
        </h1>
        <p className="mt-2.5 text-xs sm:text-sm opacity-80 italic max-w-lg mx-auto leading-relaxed">
          &ldquo;{t.context.subtitle}&rdquo;
        </p>
      </div>

      {/* Context Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-10">
        {contextsList.map((ctxKey) => {
          const isSelected = selectedContext === ctxKey;
          const ctxInfo = t.contexts[ctxKey];
          return (
            <button
              key={ctxKey}
              onClick={() => onSelectContext(ctxKey)}
              className={`text-left p-4 rounded-xl border transition-all ${
                isSelected ? selectedItemClass : unselectedItemClass
              }`}
            >
              <div className="text-xl mb-1.5">{CONTEXT_ICONS[ctxKey]}</div>
              <div className="font-semibold text-sm">{ctxInfo.title}</div>
              <div className={`text-xs mt-1 leading-snug ${isSelected ? 'opacity-85' : 'opacity-65'}`}>
                {ctxInfo.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Style Preference */}
      <div className={`mb-12 rounded-xl border p-5 ${cardBg}`}>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold uppercase tracking-wider opacity-80">
            {t.context.toneTitle}
          </label>
          <span className="text-xs opacity-50">{t.context.toneStored}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {stylesList.map((styleKey) => {
            const isSelected = selectedStyle === styleKey;
            const styleInfo = t.styles[styleKey];
            return (
              <button
                key={styleKey}
                onClick={() => onSelectStyle(styleKey)}
                className={`px-3 py-2 text-xs rounded-lg text-left border transition-colors ${
                  isSelected
                    ? theme === 'romantic'
                      ? 'border-rose-400 bg-rose-50 text-rose-950 font-semibold'
                      : theme === 'dark'
                      ? 'border-stone-500 bg-stone-800 text-stone-100 font-semibold'
                      : 'border-stone-900 bg-stone-100 text-stone-900 font-semibold'
                    : 'border-transparent hover:border-stone-300 opacity-80'
                }`}
              >
                <div className="font-medium">{styleInfo.label}</div>
                <div className="text-[11px] opacity-60 mt-0.5">{styleInfo.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Choose Mode */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <div
          className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
            theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'
          }`}
        >
          {t.context.step2}
        </div>
        <h2 className="text-xl font-bold tracking-tight">
          {t.context.modeTitle}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Write */}
        <button
          onClick={() => onChooseMode('write')}
          className={`group text-left p-6 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between ${cardBg}`}
        >
          <div>
            <div
              className={`p-3 w-fit rounded-xl mb-4 transition-colors ${
                theme === 'romantic'
                  ? 'bg-rose-100 text-rose-700 group-hover:bg-rose-600 group-hover:text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 group-hover:bg-stone-900 group-hover:text-white'
              }`}
            >
              <PenLine className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold">{t.landing.writeTitle}</h3>
            <p className="mt-2 text-xs opacity-75 leading-relaxed">
              {t.landing.writeDesc}
            </p>
          </div>
          <div
            className={`mt-6 text-xs font-semibold flex items-center gap-1 ${
              theme === 'romantic' ? 'text-rose-600' : ''
            }`}
          >
            <span>{t.landing.writeCta} &rarr;</span>
          </div>
        </button>

        {/* Draw */}
        <button
          onClick={() => onChooseMode('draw')}
          className={`group text-left p-6 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between ${cardBg}`}
        >
          <div>
            <div
              className={`p-3 w-fit rounded-xl mb-4 transition-colors ${
                theme === 'romantic'
                  ? 'bg-rose-100 text-rose-700 group-hover:bg-rose-600 group-hover:text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 group-hover:bg-stone-900 group-hover:text-white'
              }`}
            >
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold">{t.landing.drawTitle}</h3>
            <p className="mt-2 text-xs opacity-75 leading-relaxed">
              {t.landing.drawDesc}
            </p>
          </div>
          <div
            className={`mt-6 text-xs font-semibold flex items-center gap-1 ${
              theme === 'romantic' ? 'text-rose-600' : ''
            }`}
          >
            <span>{t.landing.drawCta} &rarr;</span>
          </div>
        </button>

        {/* Talk */}
        <button
          onClick={() => onChooseMode('talk')}
          className={`group text-left p-6 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between ${cardBg}`}
        >
          <div>
            <div
              className={`p-2.5 w-fit rounded-xl mb-4 transition-all flex items-center justify-center relative overflow-hidden shadow-xs ${
                theme === 'romantic'
                  ? 'bg-rose-100 text-rose-700 group-hover:scale-105'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 group-hover:scale-105'
              }`}
            >
              <div className="w-6 h-6 rounded-full relative overflow-hidden flex items-center justify-center bg-gradient-to-tr from-cyan-500 via-emerald-400 to-amber-500 shadow-sm animate-pulse">
                <div className="flex items-center gap-0.5">
                  <div className="w-0.5 h-2.5 bg-white rounded-full shadow-xs"></div>
                  <div className="w-0.5 h-2.5 bg-white rounded-full shadow-xs"></div>
                </div>
              </div>
            </div>
            <h3 className="text-base font-bold">{t.landing.talkTitle}</h3>
            <p className="mt-2 text-xs opacity-75 leading-relaxed">
              {t.landing.talkDesc}
            </p>
          </div>
          <div
            className={`mt-6 text-xs font-semibold flex items-center gap-1 ${
              theme === 'romantic' ? 'text-rose-600' : ''
            }`}
          >
            <span>{t.landing.talkCta} &rarr;</span>
          </div>
        </button>
      </div>

      {/* Bottom Institutional Endorsement Bar (TU Dresden on Left, ScaDS.AI on Right) */}
      <div className={`mt-14 rounded-2xl border p-6 sm:p-7 shadow-xs ${cardBg}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-stone-100 dark:border-stone-800">
          {/* Bottom Left: TU Dresden */}
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <a
              href="https://tu-dresden.de"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white dark:bg-white/95 border border-stone-200 shadow-xs hover:shadow-sm hover:border-blue-400 transition-all group shrink-0"
              title="Technische Universität Dresden"
            >
              <img
                src="/assets/aistudio/TU_Dresden_5648b15f.png"
                alt="TU Dresden"
                className="h-8 sm:h-9 w-auto object-contain group-hover:scale-102 transition-transform"
              />
            </a>
            <div className="text-left">
              <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                Technische Universität Dresden
              </div>
              <div className="text-[11px] opacity-65 leading-snug">
                Student Well-being & Academic Support
              </div>
            </div>
          </div>

          {/* Bottom Center: Academic Trust Note */}
          <div className="text-center sm:max-w-xs text-[11px] opacity-70 leading-relaxed px-2">
            <span className="font-semibold block text-stone-900 dark:text-stone-200">
              Stateless Student Well-being Companion
            </span>
            <span>Zero accounts · Zero voice recording · Ephemeral session</span>
          </div>

          {/* Bottom Right: ScaDS.AI */}
          <div className="flex items-center gap-3.5 sm:flex-row-reverse text-left sm:text-right w-full sm:w-auto">
            <a
              href="https://scads.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white dark:bg-white/95 border border-stone-200 shadow-xs hover:shadow-sm hover:border-cyan-400 transition-all group shrink-0"
              title="ScaDS.AI Center for Scalable Data Analytics and Artificial Intelligence"
            >
              <img
                src="/assets/aistudio/logo_50577e3d.png"
                alt="ScaDS.AI Dresden Leipzig"
                className="h-8 sm:h-9 w-auto object-contain group-hover:scale-102 transition-transform"
              />
            </a>
            <div className="text-left sm:text-right">
              <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                ScaDS.AI Dresden/Leipzig
              </div>
              <div className="text-[11px] opacity-65 leading-snug">
                Center for Scalable Data Analytics & AI
              </div>
            </div>
          </div>
        </div>

        {/* Safety Notice Line */}
        <div className="mt-5 text-center text-xs opacity-65 flex flex-wrap items-center justify-center gap-2">
          <span>AI Mood Mirror is a student reflection companion. Never clinical advice.</span>
          <span className="hidden sm:inline">·</span>
          <button
            onClick={onOpenSupport}
            className="underline underline-offset-2 hover:opacity-100 font-semibold text-rose-600 dark:text-rose-400"
          >
            {t.context.needHelp}
          </button>
        </div>
      </div>
    </div>
  );
};
