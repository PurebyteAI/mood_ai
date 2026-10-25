/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  AcademicContext,
  PreferredStyle,
  SessionEntry,
  AnalysisResponse,
  CampusPreset,
  SupportResource,
  Theme,
  Language,
} from './types';
import { fetchAppConfig, analyzeText, analyzeDrawing } from './lib/api';
import { Header } from './components/Header';
import { ContextPicker } from './components/ContextPicker';
import { WriteScreen } from './components/WriteScreen';
import { DrawScreen } from './components/DrawScreen';
import { TalkScreen } from './components/TalkScreen';
import { ResultScreen } from './components/ResultScreen';
import { SessionSummary } from './components/SessionSummary';
import { SupportModal } from './components/SupportModal';
import { PrivacyModal } from './components/PrivacyModal';
import { SettingsModal } from './components/SettingsModal';
import { RomanticHearts } from './components/RomanticHearts';
import { AlertCircle } from 'lucide-react';

export default function App() {
  // Directly open reflection window: context selector or specific mode
  const [screen, setScreen] = useState<'context' | 'write' | 'draw' | 'talk' | 'result' | 'summary'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlMode = params.get('mode');
      if (urlMode === 'write' || urlMode === 'draw' || urlMode === 'talk') {
        return urlMode;
      }
    }
    return 'context';
  });

  const [mode, setMode] = useState<'write' | 'draw' | 'talk'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlMode = params.get('mode');
      if (urlMode === 'write' || urlMode === 'draw' || urlMode === 'talk') {
        return urlMode;
      }
    }
    return 'write';
  });

  const [context, setContext] = useState<AcademicContext>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlContext = params.get('context') as AcademicContext | null;
      if (urlContext && ['exams', 'deadlines', 'presentation', 'group_work', 'general'].includes(urlContext)) {
        return urlContext;
      }
    }
    return 'general';
  });

  const [style, setStyle] = useState<PreferredStyle>('study_tip');

  // Appearance & Language Preferences with localStorage sync
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mood_mirror_theme') as Theme | null;
      if (saved && ['light', 'dark', 'romantic'].includes(saved)) return saved;
    }
    return 'light';
  });

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mood_mirror_lang') as Language | null;
      if (saved && ['en', 'fr', 'es', 'it', 'de', 'zh'].includes(saved)) return saved;
    }
    return 'en';
  });

  // Ephemeral in-tab session storage (disappears when tab closes)
  const [sessionEntries, setSessionEntries] = useState<SessionEntry[]>([]);
  const [currentResult, setCurrentResult] = useState<AnalysisResponse | null>(null);
  const [inputPreview, setInputPreview] = useState<string | undefined>(undefined);

  // Configuration and support
  const [campus, setCampus] = useState<CampusPreset | null>(null);
  const [supportResources, setSupportResources] = useState<SupportResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync theme with data-theme on root html and localStorage
  useEffect(() => {
    localStorage.setItem('mood_mirror_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('mood_mirror_lang', language);
  }, [language]);

  // Warn before closing tab if entries exist
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (sessionEntries.length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [sessionEntries]);

  // Load app config on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const campusParam = params.get('campus') || undefined;
    loadConfig(campusParam);
    if (params.get('modal') === 'privacy') {
      setIsPrivacyOpen(true);
    }
  }, []);

  const loadConfig = async (campusSlug?: string) => {
    try {
      const config = await fetchAppConfig(campusSlug);
      setCampus(config.campus);
      setSupportResources(config.supportResources);
    } catch (err) {
      console.warn('Config load note:', err);
    }
  };

  const handleSelectCampus = (slug: string) => {
    loadConfig(slug || undefined);
    const url = new URL(window.location.href);
    if (slug) {
      url.searchParams.set('campus', slug);
    } else {
      url.searchParams.delete('campus');
    }
    window.history.replaceState({}, '', url.toString());
  };

  const handleChooseMode = (chosenMode: 'write' | 'draw' | 'talk') => {
    setMode(chosenMode);
    setScreen(chosenMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Text Reflection
  const handleSubmitText = async (text: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setInputPreview(text.slice(0, 120));
    try {
      const result = await analyzeText(text, context, style, language);
      setCurrentResult(result);
      setScreen('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to analyze text reflection');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Drawing Reflection
  const handleSubmitDrawing = async (drawingDataUrl: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setInputPreview(drawingDataUrl);
    try {
      const result = await analyzeDrawing(drawingDataUrl, context, style, language);
      setCurrentResult(result);
      setScreen('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to interpret sketch');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Voice Transcript
  const handleSubmitVoiceTranscript = async (spokenText: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setInputPreview(spokenText.slice(0, 120));
    try {
      const result = await analyzeText(spokenText, context, style, language);
      setCurrentResult(result);
      setScreen('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to interpret spoken reflection');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEntry = (entry: SessionEntry) => {
    setSessionEntries((prev) => {
      if (prev.some((e) => e.id === entry.id || e.responseText === entry.responseText)) {
        return prev;
      }
      return [entry, ...prev];
    });
  };

  const handleClearSession = () => {
    if (window.confirm('Wipe this session? All in-tab reflections, charts, and art will be immediately erased.')) {
      setSessionEntries([]);
      setCurrentResult(null);
      setScreen('context');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Theme-based main wrapper styling
  const mainWrapperClass =
    theme === 'dark'
      ? 'bg-stone-950 text-stone-100'
      : theme === 'romantic'
      ? 'bg-rose-50/60 text-stone-900 selection:bg-rose-200 selection:text-rose-900'
      : 'bg-stone-50 text-stone-900 selection:bg-amber-100 selection:text-amber-900';

  return (
    <div
      data-theme={theme}
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 relative ${mainWrapperClass}`}
    >
      {/* Floating romantic hearts animation when romantic theme is selected */}
      <RomanticHearts active={theme === 'romantic'} />

      {/* Top Header conforming to Top Bar Contract */}
      <Header
        currentScreen={screen}
        onNavigate={(target) => {
          setErrorMessage(null);
          setScreen(target as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        sessionCount={sessionEntries.length}
        campus={campus}
        theme={theme}
        language={language}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Global Toast Error if occurred */}
      {errorMessage && (
        <div className="max-w-3xl mx-auto px-4 pt-4 w-full relative z-10">
          <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-800 dark:text-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="font-semibold underline ml-4 hover:text-rose-950"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main View Router - Directly reflection workflow */}
      <main className="flex-1 relative z-10">

        {screen === 'context' && (
          <ContextPicker
            selectedContext={context}
            onSelectContext={setContext}
            selectedStyle={style}
            onSelectStyle={setStyle}
            onChooseMode={handleChooseMode}
            campus={campus}
            onOpenSupport={() => setIsSupportOpen(true)}
            theme={theme}
            language={language}
          />
        )}

        {screen === 'write' && (
          <WriteScreen
            context={context}
            preferredStyle={style}
            onBack={() => setScreen('context')}
            onSubmit={handleSubmitText}
            isLoading={isLoading}
            theme={theme}
            language={language}
          />
        )}

        {screen === 'draw' && (
          <DrawScreen
            context={context}
            preferredStyle={style}
            onBack={() => setScreen('context')}
            onSubmit={handleSubmitDrawing}
            isLoading={isLoading}
            theme={theme}
            language={language}
          />
        )}

        {screen === 'talk' && (
          <TalkScreen
            context={context}
            preferredStyle={style}
            onBack={() => setScreen('context')}
            onSubmitTranscript={handleSubmitVoiceTranscript}
            isLoading={isLoading}
            theme={theme}
            language={language}
          />
        )}

        {screen === 'result' && currentResult && (
          <ResultScreen
            result={currentResult}
            context={context}
            mode={mode}
            inputPreview={inputPreview}
            onNewReflection={() => {
              const exists = sessionEntries.some(
                (e) => e.responseText === currentResult.response.text
              );
              if (!exists) {
                handleSaveEntry({
                  id: 'entry-' + Date.now(),
                  at: Date.now(),
                  mode,
                  context,
                  emotions: currentResult.emotions,
                  dominant: currentResult.dominant,
                  responseType: currentResult.response.type,
                  responseText: currentResult.response.text,
                  artPrompt: currentResult.art_prompt,
                  safety: currentResult.safety,
                });
              }
              setScreen('context');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewSummary={() => {
              setScreen('summary');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSupport={() => setIsSupportOpen(true)}
            onSaveEntry={handleSaveEntry}
            theme={theme}
            language={language}
          />
        )}

        {screen === 'summary' && (
          <SessionSummary
            entries={sessionEntries}
            campus={campus}
            onNewReflection={() => {
              setScreen('context');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClearSession={handleClearSession}
            onOpenSupport={() => setIsSupportOpen(true)}
            theme={theme}
            language={language}
          />
        )}
      </main>

      {/* Settings Modal (Appearance & Language) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        onSelectTheme={setTheme}
        language={language}
        onSelectLanguage={setLanguage}
        campus={campus}
        onSelectCampus={handleSelectCampus}
      />

      {/* Support & Crisis Modal */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        campus={campus}
        resources={supportResources}
      />

      {/* Privacy Architecture Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
