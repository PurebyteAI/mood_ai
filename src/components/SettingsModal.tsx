/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Theme, Language, CampusPreset } from '../types';
import { TRANSLATIONS } from '../lib/i18n';
import { X, Sun, Moon, Heart, Globe, Sparkles, Check, School, Shield } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onSelectTheme: (theme: Theme) => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  campus: CampusPreset | null;
  onSelectCampus: (slug: string) => void;
}

const LANGUAGES: Array<{ code: Language; name: string; nativeName: string; flag: string }> = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: 'Mandarin', nativeName: '中文', flag: '🇨🇳' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onSelectTheme,
  language,
  onSelectLanguage,
  campus,
  onSelectCampus,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col transition-all">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-stone-200/80 text-stone-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">{t.settings.title}</h2>
              <p className="text-xs text-stone-500">{t.settings.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Appearance Section */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-600" />
                {t.settings.appearance}
              </h3>
              <span className="text-[11px] font-mono text-stone-400">3 Themes</span>
            </div>
            <p className="text-xs text-stone-500 mb-3">{t.settings.appearanceDesc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Light Theme */}
              <button
                type="button"
                onClick={() => onSelectTheme('light')}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  theme === 'light'
                    ? 'border-stone-900 bg-stone-50 ring-2 ring-stone-900/10'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-md bg-amber-100 text-amber-800">
                    <Sun className="w-4 h-4" />
                  </div>
                  {theme === 'light' && <Check className="w-4 h-4 text-stone-900" />}
                </div>
                <div className="font-semibold text-xs text-stone-900">{t.settings.themeLight}</div>
                <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                  {t.settings.themeLightDesc}
                </div>
              </button>

              {/* Dark Theme */}
              <button
                type="button"
                onClick={() => onSelectTheme('dark')}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  theme === 'dark'
                    ? 'border-stone-900 bg-stone-900 text-white ring-2 ring-stone-900/20'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-900 text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-md bg-stone-800 text-stone-200">
                    <Moon className="w-4 h-4" />
                  </div>
                  {theme === 'dark' && <Check className="w-4 h-4 text-amber-400" />}
                </div>
                <div className="font-semibold text-xs text-white">{t.settings.themeDark}</div>
                <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                  {t.settings.themeDarkDesc}
                </div>
              </button>

              {/* Romantic Theme (Pink with Hearts) */}
              <button
                type="button"
                onClick={() => onSelectTheme('romantic')}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  theme === 'romantic'
                    ? 'border-rose-400 bg-rose-50 ring-2 ring-rose-400/30'
                    : 'border-rose-200 hover:border-rose-300 bg-rose-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-md bg-rose-200 text-rose-700">
                    <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                  </div>
                  {theme === 'romantic' && <Check className="w-4 h-4 text-rose-700" />}
                </div>
                <div className="font-semibold text-xs text-rose-950 flex items-center gap-1">
                  <span>{t.settings.themeRomantic}</span>
                  <span>💖</span>
                </div>
                <div className="text-[11px] text-rose-700 mt-0.5 leading-snug">
                  {t.settings.themeRomanticDesc}
                </div>
              </button>
            </div>
          </div>

          {/* Language Section */}
          <div className="pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                {t.settings.language}
              </h3>
              <span className="text-[11px] font-mono text-stone-400">6 Languages</span>
            </div>
            <p className="text-xs text-stone-500 mb-3">{t.settings.languageDesc}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => onSelectLanguage(lang.code)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{lang.flag}</span>
                      <div>
                        <div className="font-semibold text-xs">{lang.nativeName}</div>
                        <div
                          className={`text-[10px] ${
                            isSelected ? 'text-stone-300' : 'text-stone-400'
                          }`}
                        >
                          {lang.name}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Campus Preset Selection */}
          <div className="pt-4 border-t border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2 mb-1">
              <School className="w-4 h-4 text-stone-600" />
              University & Campus Preset
            </h3>
            <p className="text-xs text-stone-500 mb-3">
              Loads your institution's specific mental health hotline and well-being clinic.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: '', label: 'General University' },
                { id: 'tudresden', label: 'TU Dresden' },
                { id: 'mit', label: 'MIT' },
                { id: 'oxford', label: 'University of Oxford' },
                { id: 'stanford', label: 'Stanford' },
                { id: 'berkeley', label: 'UC Berkeley' },
                { id: 'cambridge', label: 'Cambridge' },
              ].map((c) => {
                const isSelected =
                  (c.id === '' && !campus) ||
                  (campus && c.id && campus.name.toLowerCase().includes(c.id));
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onSelectCampus(c.id)}
                    className={`px-3 py-1.5 rounded-lg border transition-colors ${
                      isSelected
                        ? 'bg-stone-900 border-stone-900 text-white font-semibold'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-400 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            Stateless in-browser configuration
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-xs"
          >
            {t.settings.close}
          </button>
        </div>
      </div>
    </div>
  );
};
