/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnalysisResponse, AcademicContext, Emotion, SessionEntry, Theme, Language } from '../types';
import { EMOTION_COLORS, exportMoodCardPng } from '../lib/exportUtils';
import { generateMoodArt, synthesizeVoice } from '../lib/api';
import { TRANSLATIONS } from '../lib/i18n';
import {
  Volume2,
  VolumeX,
  Download,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Copy,
  Check,
  HeartHandshake,
  Loader2,
} from 'lucide-react';

interface ResultScreenProps {
  result: AnalysisResponse;
  context: AcademicContext;
  mode: 'write' | 'draw' | 'talk';
  inputPreview?: string;
  onNewReflection: () => void;
  onViewSummary: () => void;
  onOpenSupport: () => void;
  onSaveEntry: (entry: SessionEntry) => void;
  theme: Theme;
  language: Language;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  context,
  mode,
  inputPreview,
  onNewReflection,
  onViewSummary,
  onOpenSupport,
  onSaveEntry,
  theme,
  language,
}) => {
  const [artUrl, setArtUrl] = useState<string | null>(null);
  const [isGeneratingArt, setIsGeneratingArt] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isCrisis = result.safety?.level === 'crisis';
  const emotionsList: Emotion[] = ['stress', 'calmness', 'curiosity', 'sadness', 'happiness', 'anger'];

  const cardBg =
    theme === 'dark'
      ? 'bg-stone-900 border-stone-800 text-stone-100'
      : theme === 'romantic'
      ? 'bg-white border-rose-200 text-stone-900 shadow-xs'
      : 'bg-white border-stone-200 text-stone-900 shadow-xs';

  const handleListenVoice = async () => {
    if (isPlayingAudio) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    try {
      let soundSrc = audioUrl;
      if (!soundSrc) {
        soundSrc = await synthesizeVoice(result.response.text);
        if (soundSrc) setAudioUrl(soundSrc);
      }

      if (soundSrc) {
        const audio = new Audio(soundSrc);
        audio.onended = () => setIsPlayingAudio(false);
        audio.onerror = () => {
          fallbackBrowserSpeech(result.response.text);
        };
        setIsPlayingAudio(true);
        await audio.play();
      } else {
        fallbackBrowserSpeech(result.response.text);
      }
    } catch {
      fallbackBrowserSpeech(result.response.text);
    }
  };

  const fallbackBrowserSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      setIsPlayingAudio(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.lang =
      language === 'fr'
        ? 'fr-FR'
        : language === 'it'
        ? 'it-IT'
        : language === 'es'
        ? 'es-ES'
        : language === 'zh'
        ? 'zh-CN'
        : language === 'de'
        ? 'de-DE'
        : 'en-US';

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.response.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateArt = async () => {
    if (isGeneratingArt || artUrl || isCrisis) return;
    setIsGeneratingArt(true);
    try {
      const generated = await generateMoodArt(result.art_prompt);
      setArtUrl(generated);
    } finally {
      setIsGeneratingArt(false);
    }
  };

  const handleDownloadPng = async () => {
    const tempEntry: SessionEntry = {
      id: 'entry-' + Date.now(),
      at: Date.now(),
      mode,
      context,
      emotions: result.emotions,
      dominant: result.dominant,
      responseType: result.response.type,
      responseText: result.response.text,
      artPrompt: result.art_prompt,
      artDataUrl: artUrl || undefined,
      inputPreview,
      safety: result.safety,
    };
    await exportMoodCardPng(tempEntry);
  };

  const handleSaveAndSummarize = () => {
    const entry: SessionEntry = {
      id: 'entry-' + Date.now(),
      at: Date.now(),
      mode,
      context,
      emotions: result.emotions,
      dominant: result.dominant,
      responseType: result.response.type,
      responseText: result.response.text,
      artPrompt: result.art_prompt,
      artDataUrl: artUrl || undefined,
      inputPreview,
      safety: result.safety,
    };
    onSaveEntry(entry);
    onViewSummary();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 relative z-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div
            className={`text-xs font-semibold uppercase tracking-wider ${
              theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'
            }`}
          >
            {t.result.complete}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
            {t.result.reading}
            {theme === 'romantic' && <span className="ml-1.5 text-rose-500">♡</span>}
          </h1>
          <p className="text-xs opacity-60 mt-0.5">
            {t.result.disclaimer}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNewReflection}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              theme === 'dark'
                ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                : theme === 'romantic'
                ? 'bg-white border-rose-200 text-rose-900 hover:bg-rose-50'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t.result.newReflection}
          </button>
          <button
            onClick={handleSaveAndSummarize}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs ${
              theme === 'romantic'
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : theme === 'dark'
                ? 'bg-white text-stone-900 hover:bg-stone-100'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            <span>{t.result.summaryCta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Urgent Crisis Notice if triggered */}
      {isCrisis && (
        <div className="mb-8 p-6 bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-200 rounded-xl">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-rose-950 dark:text-rose-100">
                You matter, and support is right here for you.
              </h2>
              <p className="mt-1 text-sm text-rose-800 dark:text-rose-300 leading-relaxed">
                Academic challenges can feel crushing, but you do not have to carry this distress alone. Please reach out to someone who can listen right now:
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-rose-200 dark:border-stone-800">
                  <div className="font-semibold text-xs">Crisis Text Line</div>
                  <div className="text-sm font-bold text-rose-600 mt-0.5">Text HOME to 741741</div>
                  <div className="text-[11px] opacity-60 mt-1">Free, 24/7 confidential SMS support</div>
                </div>
                <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-rose-200 dark:border-stone-800">
                  <div className="font-semibold text-xs">988 Suicide & Crisis Lifeline</div>
                  <div className="text-sm font-bold text-rose-600 mt-0.5">Call or Text 988</div>
                  <div className="text-[11px] opacity-60 mt-1">Toll-free 24/7 mental health hotline</div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={onOpenSupport}
                  className="text-xs font-bold text-rose-900 dark:text-rose-300 underline underline-offset-4"
                >
                  View full helpline directory &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Emotion Scores (Left) and Reflection (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column: Emotion Breakdown */}
        <div className={`lg:col-span-5 rounded-2xl border p-6 flex flex-col justify-between ${cardBg}`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xs font-semibold opacity-60 uppercase tracking-wider">
                {t.result.dominantFeeling}
              </span>
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${EMOTION_COLORS[result.dominant]}25`,
                  color: EMOTION_COLORS[result.dominant],
                }}
              >
                {t.emotions[result.dominant]}
              </span>
            </div>

            {/* Six Emotion Bars */}
            <div className="mt-6 space-y-4">
              {emotionsList.map((emo) => {
                const score = Math.round(result.emotions[emo] || 0);
                return (
                  <div key={emo}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-medium opacity-85">{t.emotions[emo]}</span>
                      <span className="font-mono font-semibold tabular-nums">
                        {score}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${Math.max(3, score)}%`,
                          backgroundColor: EMOTION_COLORS[emo],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-800 text-[11px] opacity-50">
            Context: {context.toUpperCase()} · Mode: {mode.toUpperCase()}
          </div>
        </div>

        {/* Right Column: AI Reflection Box & Art */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Reflection Card */}
          <div className={`rounded-2xl border p-6 flex flex-col justify-between ${cardBg}`}>
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800 text-xs opacity-60">
                <span className="font-mono uppercase tracking-wider">
                  Reflection ({result.response.type.replace('_', ' ')})
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleListenVoice}
                    className="p-1 hover:opacity-100 transition-opacity"
                    title={t.result.listen}
                  >
                    {isPlayingAudio ? (
                      <VolumeX className="w-4 h-4 text-rose-500" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-1 hover:opacity-100 transition-opacity"
                    title={t.result.copy}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 text-base sm:text-lg leading-relaxed font-normal italic">
                "{result.response.text}"
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs opacity-60">
              <span>Kept strictly under 80 words</span>
              <button
                onClick={handleDownloadPng}
                className="font-semibold inline-flex items-center gap-1 hover:opacity-100"
              >
                <Download className="w-3.5 h-3.5" />
                {t.result.exportPng}
              </button>
            </div>
          </div>

          {/* Optional Mood Art Card */}
          {!isCrisis && (
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold">{t.result.visualizeArt}</h3>
                  <p className="text-xs opacity-60 mt-0.5">
                    {t.result.visualizeSubtitle}
                  </p>
                </div>

                {!artUrl && (
                  <button
                    onClick={handleGenerateArt}
                    disabled={isGeneratingArt}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50 ${
                      theme === 'romantic'
                        ? 'bg-rose-100 text-rose-900 hover:bg-rose-200'
                        : theme === 'dark'
                        ? 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                        : 'bg-stone-100 text-stone-900 hover:bg-stone-200'
                    }`}
                  >
                    {isGeneratingArt ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{t.result.generating}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles
                          className={`w-3.5 h-3.5 ${
                            theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'
                          }`}
                        />
                        <span>{t.result.generateArt}</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {artUrl ? (
                <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
                  <div className="w-36 h-36 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 shadow-sm shrink-0 bg-stone-100 dark:bg-stone-800">
                    <img
                      src={artUrl}
                      alt="Abstract mood art"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-xs opacity-75 leading-relaxed">
                    <p className="font-mono text-[11px] mb-2 opacity-60">Prompt blueprint:</p>
                    <p className="italic">"{result.art_prompt}"</p>
                    <div className="mt-4">
                      <a
                        href={artUrl}
                        download={`mood-art-${Date.now()}.png`}
                        className="text-xs font-semibold underline underline-offset-4 hover:opacity-100"
                      >
                        {t.result.downloadArt}
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`py-6 px-4 rounded-xl border text-center text-xs ${
                    theme === 'dark'
                      ? 'bg-stone-950 border-stone-800 text-stone-400'
                      : theme === 'romantic'
                      ? 'bg-rose-50/50 border-rose-100 text-rose-800'
                      : 'bg-stone-50 border-stone-100 text-stone-500'
                  }`}
                >
                  <p className="italic font-mono">"{result.art_prompt}"</p>
                  <p className="mt-2 text-[11px] opacity-70">
                    Click "{t.result.generateArt}" to render this visual wavelength into museum-quality print.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Safety and Support Link */}
      <div className="text-center text-xs opacity-60 pt-4">
        {t.result.talkHuman}{' '}
        <button
          onClick={onOpenSupport}
          className="font-semibold underline underline-offset-2 hover:opacity-100"
        >
          Campus & National Helpline Directory
        </button>
      </div>
    </div>
  );
};
