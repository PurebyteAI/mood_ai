/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CampusPreset, AcademicContext, Theme, Language } from '../types';
import { TRANSLATIONS } from '../lib/i18n';
import {
  PenLine,
  Palette,
  Mic,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Heart,
} from 'lucide-react';

import heroImage from '../assets/images/hero_student_reflection_1792845187471.jpg';
import journalImage from '../assets/images/mode_express_journal_1792845188807.jpg';
import sketchImage from '../assets/images/mode_sketch_expressive_1792845189285.jpg';
import voiceImage from '../assets/images/mode_voice_reflection_1792845188620.jpg';

interface LandingPageProps {
  onStart: (context?: AcademicContext, mode?: 'write' | 'draw' | 'talk') => void;
  campus: CampusPreset | null;
  onSelectCampus: (slug: string) => void;
  onOpenPrivacy: () => void;
  onOpenSupport: () => void;
  theme: Theme;
  language: Language;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  campus,
  onSelectCampus,
  onOpenPrivacy,
  onOpenSupport,
  theme,
  language,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Theme-aware styles
  const cardBg =
    theme === 'dark'
      ? 'bg-stone-900 border-stone-800 text-stone-100'
      : theme === 'romantic'
      ? 'bg-white/95 border-rose-200 text-stone-900 shadow-rose-100 shadow-sm'
      : 'bg-white border-stone-200 text-stone-900';

  const subtleBorder =
    theme === 'dark'
      ? 'border-stone-800'
      : theme === 'romantic'
      ? 'border-rose-200'
      : 'border-stone-200';

  const sectionSubtleBg =
    theme === 'dark'
      ? 'bg-stone-900/60'
      : theme === 'romantic'
      ? 'bg-rose-100/50'
      : 'bg-stone-100/60';

  const primaryBtnClass =
    theme === 'dark'
      ? 'bg-white text-stone-900 hover:bg-stone-100'
      : theme === 'romantic'
      ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200 shadow-md'
      : 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Institutional Partner Bar: TU Dresden on Left, ScaDS.AI on Right */}
      <div className={`border-b py-3 px-4 sm:px-6 lg:px-8 ${subtleBorder} bg-white/60 dark:bg-stone-900/60 backdrop-blur-xs`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Top Left: TU Dresden */}
          <div className="flex items-center gap-3">
            <a
              href="https://tu-dresden.de"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 px-2.5 rounded-xl bg-white dark:bg-white/95 border border-stone-200 shadow-2xs hover:shadow-xs hover:border-blue-400 transition-all shrink-0"
              title="TU Dresden (Dresden University of Technology)"
            >
              <img
                src="/assets/aistudio/TU_Dresden_5648b15f.png"
                alt="TU Dresden Logo"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </a>
            <span className="text-[11px] font-medium opacity-70 hidden sm:inline">
              TU Dresden · University of Technology
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Academic AI Research Initiative</span>
          </div>

          {/* Top Right: ScaDS.AI */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-medium opacity-70 hidden sm:inline text-right">
              ScaDS.AI Dresden/Leipzig
            </span>
            <a
              href="https://scads.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 px-2.5 rounded-xl bg-white dark:bg-white/95 border border-stone-200 shadow-2xs hover:shadow-xs hover:border-cyan-400 transition-all shrink-0"
              title="ScaDS.AI Center for Scalable Data Analytics and Artificial Intelligence"
            >
              <img
                src="/assets/aistudio/logo_50577e3d.png"
                alt="ScaDS.AI Logo"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b ${subtleBorder}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Proposition */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Campus Selector pill / strip */}
              <div className="flex items-center gap-2 mb-6 text-xs text-stone-500 flex-wrap">
                <span className="font-medium">{t.landing.campusPreset}</span>
                <div
                  className={`inline-flex rounded-lg border p-0.5 text-xs ${
                    theme === 'dark'
                      ? 'border-stone-700 bg-stone-800'
                      : theme === 'romantic'
                      ? 'border-rose-300 bg-white'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  {[
                    { id: '', label: 'General' },
                    { id: 'tudresden', label: 'TU Dresden' },
                    { id: 'mit', label: 'MIT' },
                    { id: 'oxford', label: 'Oxford' },
                    { id: 'stanford', label: 'Stanford' },
                    { id: 'berkeley', label: 'Berkeley' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => onSelectCampus(preset.id)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        (preset.id === '' && !campus) ||
                        (campus && preset.id && campus.name.toLowerCase().includes(preset.id))
                          ? theme === 'romantic'
                            ? 'bg-rose-600 text-white font-medium'
                            : theme === 'dark'
                            ? 'bg-white text-stone-900 font-medium'
                            : 'bg-stone-900 text-white font-medium'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                {t.landing.heroTitle}
                {theme === 'romantic' && <span className="inline-block ml-2 text-rose-500">♡</span>}
              </h1>

              <p className="mt-6 text-base sm:text-lg opacity-85 leading-relaxed max-w-2xl italic">
                &ldquo;{t.landing.heroSubtitle}&rdquo;
              </p>

              {/* Three Non-Negotiables Callout */}
              <div
                className={`mt-6 py-3 px-4 rounded-xl border max-w-xl ${
                  theme === 'dark'
                    ? 'bg-stone-800/80 border-stone-700 text-stone-200'
                    : theme === 'romantic'
                    ? 'bg-white/80 border-rose-200 text-rose-950'
                    : 'bg-stone-100/80 border-stone-200 text-stone-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    {theme === 'romantic' ? (
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <span>{t.landing.noLogin}</span>
                  </div>
                  <span className="hidden sm:inline opacity-30">|</span>
                  <div className="flex items-center gap-1.5">
                    {theme === 'romantic' ? (
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <span>{t.landing.zeroStorage}</span>
                  </div>
                  <span className="hidden sm:inline opacity-30">|</span>
                  <div className="flex items-center gap-1.5">
                    {theme === 'romantic' ? (
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <span>{t.landing.wipedOnClose}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onStart()}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold rounded-xl transition-all ${primaryBtnClass}`}
                >
                  <span>{t.landing.openMirror}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenPrivacy}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium rounded-xl border transition-colors ${
                    theme === 'dark'
                      ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                      : theme === 'romantic'
                      ? 'bg-white border-rose-300 text-rose-900 hover:bg-rose-50'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {t.landing.readPromise}
                </button>
              </div>

              {campus && (
                <div className="mt-6 text-xs opacity-70">
                  Campus support active: <span className="font-semibold">{campus.counseling}</span> ({campus.phone})
                </div>
              )}
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5">
              <div
                className={`relative rounded-2xl overflow-hidden border shadow-md ${
                  theme === 'dark'
                    ? 'border-stone-700 bg-stone-800'
                    : theme === 'romantic'
                    ? 'border-rose-300 bg-rose-50'
                    : 'border-stone-200 bg-stone-100'
                }`}
              >
                <img
                  src={heroImage}
                  alt="University student taking a reflective mindful breath"
                  className="w-full h-auto object-cover aspect-4/3 lg:aspect-auto max-h-[460px]"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs uppercase tracking-wider text-stone-300 font-mono">
                    Academic Well-being
                  </div>
                  <p className="text-xs sm:text-sm font-medium mt-1 text-stone-100 italic">
                    {t.landing.academicQuote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mode Showcase Section */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-2xl mb-12">
          <div
            className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
              theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'
            }`}
          >
            {t.landing.threeWays}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t.landing.threeWaysSubtitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mode 1: Write */}
          <div
            onClick={() => onStart('general', 'write')}
            className={`group cursor-pointer rounded-2xl border overflow-hidden transition-all hover:shadow-md flex flex-col ${cardBg}`}
          >
            <div className="relative h-48 overflow-hidden bg-stone-100">
              <img
                src={journalImage}
                alt="Student journal and pen on desk"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div
                className={`absolute top-3 left-3 p-2 rounded-lg text-white ${
                  theme === 'romantic' ? 'bg-rose-600/90' : 'bg-stone-900/80'
                }`}
              >
                <PenLine className="w-5 h-5" />
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{t.landing.writeTitle}</h3>
                <p className="mt-2 text-xs sm:text-sm opacity-75 leading-relaxed">
                  {t.landing.writeDesc}
                </p>
              </div>
              <div
                className={`mt-6 flex items-center gap-1.5 text-xs font-semibold ${
                  theme === 'romantic' ? 'text-rose-600' : 'text-stone-900 dark:text-stone-100'
                }`}
              >
                <span>{t.landing.writeCta}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Mode 2: Draw */}
          <div
            onClick={() => onStart('deadline', 'draw')}
            className={`group cursor-pointer rounded-2xl border overflow-hidden transition-all hover:shadow-md flex flex-col ${cardBg}`}
          >
            <div className="relative h-48 overflow-hidden bg-stone-100">
              <img
                src={sketchImage}
                alt="Abstract expressive charcoal and pastel sketch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div
                className={`absolute top-3 left-3 p-2 rounded-lg text-white ${
                  theme === 'romantic' ? 'bg-rose-600/90' : 'bg-stone-900/80'
                }`}
              >
                <Palette className="w-5 h-5" />
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{t.landing.drawTitle}</h3>
                <p className="mt-2 text-xs sm:text-sm opacity-75 leading-relaxed">
                  {t.landing.drawDesc}
                </p>
              </div>
              <div
                className={`mt-6 flex items-center gap-1.5 text-xs font-semibold ${
                  theme === 'romantic' ? 'text-rose-600' : 'text-stone-900 dark:text-stone-100'
                }`}
              >
                <span>{t.landing.drawCta}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Mode 3: Talk */}
          <div
            onClick={() => onStart('presentation', 'talk')}
            className={`group cursor-pointer rounded-2xl border overflow-hidden transition-all hover:shadow-md flex flex-col ${cardBg}`}
          >
            <div className="relative h-48 overflow-hidden bg-stone-100">
              <img
                src={voiceImage}
                alt="Mindful audio recording studio setup"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div
                className={`absolute top-3 left-3 p-2 rounded-lg text-white ${
                  theme === 'romantic' ? 'bg-rose-600/90' : 'bg-stone-900/80'
                }`}
              >
                <Mic className="w-5 h-5" />
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{t.landing.talkTitle}</h3>
                <p className="mt-2 text-xs sm:text-sm opacity-75 leading-relaxed">
                  {t.landing.talkDesc}
                </p>
              </div>
              <div
                className={`mt-6 flex items-center gap-1.5 text-xs font-semibold ${
                  theme === 'romantic' ? 'text-rose-600' : 'text-stone-900 dark:text-stone-100'
                }`}
              >
                <span>{t.landing.talkCta}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Situations Bento Grid */}
      <section className={`py-16 border-y ${subtleBorder} ${sectionSubtleBg} relative z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <div
              className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'
              }`}
            >
              {t.landing.situationsTitle}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t.landing.situationsSubtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => onStart('exam')}
              className={`p-6 rounded-xl border cursor-pointer hover:border-stone-400 transition-all ${cardBg}`}
            >
              <div className="text-xs font-mono opacity-50 uppercase tracking-wider">01</div>
              <h3 className="mt-2 text-base font-bold">{t.landing.sitExamTitle}</h3>
              <p className="mt-2 text-xs opacity-75 leading-relaxed">{t.landing.sitExamDesc}</p>
              <div
                className={`mt-4 text-xs font-semibold ${
                  theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'
                }`}
              >
                {t.landing.sitExamOffer}
              </div>
            </div>

            <div
              onClick={() => onStart('deadline')}
              className={`p-6 rounded-xl border cursor-pointer hover:border-stone-400 transition-all ${cardBg}`}
            >
              <div className="text-xs font-mono opacity-50 uppercase tracking-wider">02</div>
              <h3 className="mt-2 text-base font-bold">{t.landing.sitDeadlineTitle}</h3>
              <p className="mt-2 text-xs opacity-75 leading-relaxed">{t.landing.sitDeadlineDesc}</p>
              <div
                className={`mt-4 text-xs font-semibold ${
                  theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'
                }`}
              >
                {t.landing.sitDeadlineOffer}
              </div>
            </div>

            <div
              onClick={() => onStart('group')}
              className={`p-6 rounded-xl border cursor-pointer hover:border-stone-400 transition-all ${cardBg}`}
            >
              <div className="text-xs font-mono opacity-50 uppercase tracking-wider">03</div>
              <h3 className="mt-2 text-base font-bold">{t.landing.sitGroupTitle}</h3>
              <p className="mt-2 text-xs opacity-75 leading-relaxed">{t.landing.sitGroupDesc}</p>
              <div
                className={`mt-4 text-xs font-semibold ${
                  theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'
                }`}
              >
                {t.landing.sitGroupOffer}
              </div>
            </div>

            <div
              onClick={() => onStart('presentation')}
              className={`p-6 rounded-xl border cursor-pointer hover:border-stone-400 transition-all ${cardBg}`}
            >
              <div className="text-xs font-mono opacity-50 uppercase tracking-wider">04</div>
              <h3 className="mt-2 text-base font-bold">{t.landing.sitPresTitle}</h3>
              <p className="mt-2 text-xs opacity-75 leading-relaxed">{t.landing.sitPresDesc}</p>
              <div
                className={`mt-4 text-xs font-semibold ${
                  theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'
                }`}
              >
                {t.landing.sitPresOffer}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zero Storage & Privacy Architecture */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md mb-4 border border-emerald-200/60 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Stateless Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {t.landing.privacyHeading}
            </h2>
            <p className="mt-4 opacity-80 text-sm leading-relaxed">
              {t.landing.privacyLead}
            </p>

            <ul className="mt-6 space-y-3 text-sm opacity-90">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 shrink-0"></span>
                <span>{t.landing.privacyRule1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 shrink-0"></span>
                <span>{t.landing.privacyRule2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 shrink-0"></span>
                <span>{t.landing.privacyRule3}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 shrink-0"></span>
                <span>{t.landing.privacyRule4}</span>
              </li>
            </ul>

            <div className="mt-8">
              <button
                onClick={onOpenPrivacy}
                className="text-xs font-semibold underline underline-offset-4 hover:opacity-75 transition-opacity"
              >
                {t.landing.inspectDoc}
              </button>
            </div>
          </div>

          <div
            className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 font-mono text-xs shadow-xl border ${
              theme === 'dark'
                ? 'bg-stone-950 text-stone-300 border-stone-800'
                : 'bg-stone-900 text-stone-200 border-stone-800'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-stone-400">
              <span>privacy_invariants.json</span>
              <span className="text-emerald-400">VERIFIED STATELESS</span>
            </div>
            <pre className="mt-4 overflow-x-auto leading-relaxed">
{`{
  "database": null,
  "user_accounts": false,
  "request_body_logging": false,
  "session_lifecycle": "ephemeral_browser_tab_only",
  "active_language": "${language}",
  "active_theme": "${theme}",
  "client_exports": "100% offline (HTML5 Canvas & jsPDF)",
  "compliance": "academic_reflection_only_not_clinical"
}`}
            </pre>
            <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span>Anonymous Salted Token Bucket</span>
              <span>Rotates every 60 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Crisis Guardrail Banner */}
      <section
        className={`border-y py-10 relative z-10 ${
          theme === 'romantic'
            ? 'bg-rose-100/70 border-rose-200'
            : theme === 'dark'
            ? 'bg-stone-900 border-stone-800'
            : 'bg-amber-50/70 border-amber-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-xl shrink-0 mt-0.5 ${
                theme === 'romantic'
                  ? 'bg-rose-200 text-rose-800'
                  : 'bg-amber-100 text-amber-900 dark:bg-stone-800 dark:text-amber-400'
              }`}
            >
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold">Crisis & Safety Protection</h3>
              <p className="mt-1 text-xs sm:text-sm opacity-75 max-w-2xl">
                The Mirror is a mindful academic reflection companion, never a clinical substitute. If serious distress is detected, playful tones are paused and you are connected directly with 24/7 counselors.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenSupport}
            className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              theme === 'romantic'
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : 'bg-amber-200/90 text-amber-950 hover:bg-amber-300 dark:bg-stone-800 dark:text-stone-100'
            }`}
          >
            View Emergency Resources
          </button>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold tracking-tight">
          {t.landing.readyTitle}
        </h2>
        <p className="mt-3 opacity-75 text-sm sm:text-base max-w-xl mx-auto">
          {t.landing.readySubtitle}
        </p>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => onStart()}
            className={`inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl transition-all ${primaryBtnClass}`}
          >
            <span>{t.landing.startCta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Bottom Institutional Endorsement (TU Dresden on Left, ScaDS.AI on Right) */}
      <section className={`border-t py-10 ${sectionSubtleBg} relative z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Bottom Left: TU Dresden */}
            <div className="flex items-center gap-4">
              <a
                href="https://tu-dresden.de"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-white/95 border border-stone-200 shadow-xs hover:shadow-sm hover:border-blue-400 transition-all shrink-0"
                title="TU Dresden"
              >
                <img
                  src="/assets/aistudio/TU_Dresden_5648b15f.png"
                  alt="TU Dresden Logo"
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </a>
              <div>
                <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  Technische Universität Dresden
                </div>
                <div className="text-xs opacity-65 leading-snug">
                  Dresden University of Technology · Student Well-being Initiative
                </div>
              </div>
            </div>

            {/* Bottom Center: Privacy summary */}
            <div className="text-center text-xs opacity-70 max-w-sm">
              <div className="font-semibold text-stone-900 dark:text-stone-100">Academic Privacy Standard</div>
              <div>Stateless, zero-login student reflection companion. No personal session data saved.</div>
            </div>

            {/* Bottom Right: ScaDS.AI */}
            <div className="flex items-center gap-4 md:flex-row-reverse text-left md:text-right">
              <a
                href="https://scads.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-white/95 border border-stone-200 shadow-xs hover:shadow-sm hover:border-cyan-400 transition-all shrink-0"
                title="ScaDS.AI Dresden Leipzig"
              >
                <img
                  src="/assets/aistudio/logo_50577e3d.png"
                  alt="ScaDS.AI Logo"
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </a>
              <div>
                <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  ScaDS.AI Dresden/Leipzig
                </div>
                <div className="text-xs opacity-65 leading-snug">
                  Center for Scalable Data Analytics & Artificial Intelligence
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className={`mt-auto border-t py-8 text-xs opacity-60 ${subtleBorder} relative z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{t.appName}</span>
            <span aria-hidden="true">·</span>
            <span>Created for Academic Well-being</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:opacity-100 transition-opacity">
              {t.nav.privacy}
            </button>
            <button onClick={onOpenSupport} className="hover:opacity-100 transition-opacity">
              {t.nav.support}
            </button>
            <span>Students 18+</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
