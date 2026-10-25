/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { AcademicContext, PreferredStyle, Theme, Language } from '../types';
import { TRANSLATIONS } from '../lib/i18n';
import { ArrowLeft, Send, Loader2, Mic, Square, Sparkles } from 'lucide-react';

interface WriteScreenProps {
  context: AcademicContext;
  preferredStyle: PreferredStyle;
  onBack: () => void;
  onSubmit: (text: string) => Promise<void>;
  isLoading: boolean;
  theme: Theme;
  language: Language;
}

const STARTER_PROMPTS: Record<Language, Record<AcademicContext, string[]>> = {
  en: {
    exam: [
      "I've been staring at the same revision notes for 3 hours and none of it is sticking.",
      "My exam is in 48 hours and my heart won't stop racing whenever I think about the formula sheet.",
      "I'm terrified that all my studying will evaporate the minute I flip open the test paper.",
    ],
    deadline: [
      "The 11:59 PM deadline is tonight and my code still has 4 unexplained compiler errors.",
      "I still need 1,500 words on this literature review and my brain feels completely depleted.",
      "I procrastinated until the final day and now I'm drowning in panic and coffee.",
    ],
    group: [
      "One teammate hasn't replied to messages for 4 days and our demo is on Thursday.",
      "I feel like I'm doing 80% of the project while everyone else just agrees silently.",
      "Our team had an argument over who writes the final report and the tension is horrible.",
    ],
    presentation: [
      "I have to present in front of 60 peers and my professor tomorrow and my hands shake just thinking about it.",
      "I'm afraid I'll freeze during Q&A and look like I don't know my own research.",
      "Public speaking has always terrified me and this presentation is 30% of my final grade.",
    ],
    general: [
      "I feel like everyone around me understands the coursework effortlessly while I struggle to keep up.",
      "I can't seem to wake up with any motivation for lectures this week.",
      "I'm questioning whether I even belong in this degree program.",
    ],
  },
  fr: {
    exam: [
      "Je fixe mes fiches de révision depuis 3 heures et rien ne rentre dans ma tête.",
      "Mon partiel est dans deux jours et mon cœur s'emballe dès que j'y pense.",
      "J'ai peur d'avoir un trou noir dès que je retournerai la feuille d'examen.",
    ],
    deadline: [
      "Le devoir est à rendre ce soir à 23h59 et rien ne fonctionne comme prévu.",
      "Il me manque encore 1 500 mots sur ce mémoire et mon cerveau est vide.",
    ],
    group: [
      "Un membre du groupe ne répond plus depuis 4 jours alors qu'on rend jeudi.",
      "J'ai l'impression de faire 80 % du travail pendant que les autres acquiescent.",
    ],
    presentation: [
      "Je dois présenter devant 50 étudiants et le professeur demain matin, mes mains tremblent.",
    ],
    general: [
      "J'ai l'impression que tout le monde comprend sauf moi dans cet amphi.",
    ],
  },
  it: {
    exam: [
      "Fisso gli appunti da tre ore e non riesco a memorizzare più nulla.",
      "L'esame è tra due giorni e ho l'ansia a mille al solo pensiero.",
    ],
    deadline: [
      "La consegna scade a mezzanotte e la tesina è ancora a metà.",
    ],
    group: [
      "Un compagno di gruppo è sparito da giorni e il progetto è in ritardo.",
    ],
    presentation: [
      "Ho l'orale domani mattina e ho paura di fare scena muta davanti alla commissione.",
    ],
    general: [
      "Mi sento costantemente un passo indietro rispetto a tutti gli altri.",
    ],
  },
  es: {
    exam: [
      "Llevo horas mirando los apuntes y siento que no retengo nada de información.",
      "El examen es pasado mañana y no puedo calmar los nervios.",
    ],
    deadline: [
      "La entrega cierra a las 23:59 y mi código sigue dando fallos absurdos.",
    ],
    group: [
      "Siento que estoy haciendo todo el trabajo del equipo en solitario.",
    ],
    presentation: [
      "Tengo que exponer mañana y me aterra quedarme en blanco.",
    ],
    general: [
      "Tengo una falta de motivación tremenda con las asignaturas de este semestre.",
    ],
  },
  zh: {
    exam: [
      "我盯着复习资料看了三个小时，脑子里依然一片空白。",
      "后天就要考试了，一想到那些公式心跳就快得止不住。",
    ],
    deadline: [
      "今晚 23:59 就要交大作业，我的程序还在报错。",
    ],
    group: [
      "小组里的搭档已经失联好几天了，答辩就剩两天。",
    ],
    presentation: [
      "明天要在全班和导师面前展示，光是想想手心就在冒汗。",
    ],
    general: [
      "看着周围同学都学得很轻松，我常常怀疑自己是否适合这个专业。",
    ],
  },
  de: {
    exam: [
      "Ich starre seit Stunden auf meine Skripte und nichts bleibt mehr hängen.",
      "Die Klausur ist übermorgen und mein Herz rast bei jedem Gedanken daran.",
    ],
    deadline: [
      "Die Abgabe ist heute um 23:59 Uhr und mein Code kompiliert immer noch nicht.",
    ],
    group: [
      "Ein Gruppenmitglied meldet sich seit Tagen nicht mehr und die Präsentation steht an.",
    ],
    presentation: [
      "Ich muss morgen vor dem ganzen Hörsaal vortragen und zittere schon jetzt.",
    ],
    general: [
      "Ich habe das Gefühl, allen anderen fällt das Studium viel leichter als mir.",
    ],
  },
};

export const WriteScreen: React.FC<WriteScreenProps> = ({
  context,
  preferredStyle,
  onBack,
  onSubmit,
  isLoading,
  theme,
  language,
}) => {
  const [text, setText] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  const [dictationError, setDictationError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const maxChars = 1000;
  const remainingChars = maxChars - text.length;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const cardBg =
    theme === 'dark'
      ? 'bg-stone-900 border-stone-800 text-stone-100'
      : theme === 'romantic'
      ? 'bg-white border-rose-200 text-stone-900 shadow-xs'
      : 'bg-white border-stone-200 text-stone-900 shadow-xs';

  const starters =
    STARTER_PROMPTS[language]?.[context] || STARTER_PROMPTS.en[context] || [];

  useEffect(() => {
    return () => {
      stopDictation();
    };
  }, []);

  const startDictation = () => {
    setDictationError(null);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setDictationError('Voice dictation is not supported in this browser. Please type directly.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang =
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

      recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = 0; i < event.results.length; i++) {
          interim += event.results[i][0].transcript + ' ';
        }
        const cleaned = interim.trim();
        if (cleaned) {
          setText((prev) => {
            // If already ends with text, add space
            const base = prev.trim();
            const combined = base ? `${base} ${cleaned}` : cleaned;
            return combined.slice(0, maxChars);
          });
        }
      };

      recognition.onerror = (e: any) => {
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          console.warn('Dictation mic permission denied:', e.error);
          setDictationError('Microphone permission was denied. Please click the lock icon in the browser address bar to allow microphone access, or type directly below.');
          setIsDictating(false);
        } else if (e.error !== 'no-speech') {
          console.warn('Dictation notice:', e.error);
        }
      };

      recognition.onend = () => {
        setIsDictating(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsDictating(true);
    } catch (err: any) {
      console.error('Dictation start error:', err);
      const isDenied =
        err.name === 'NotAllowedError' ||
        (err.message && (err.message.toLowerCase().includes('permission') || err.message.toLowerCase().includes('denied')));
      if (isDenied) {
        setDictationError('Microphone permission was denied. Please allow microphone in your browser address bar (lock icon) to dictate, or type directly.');
      } else {
        setDictationError('Microphone dictation unavailable: ' + (err.message || 'Please type directly.'));
      }
    }
  };

  const stopDictation = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
    setIsDictating(false);
  };

  const toggleDictation = () => {
    if (isDictating) {
      stopDictation();
    } else {
      startDictation();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    stopDictation();
    onSubmit(text.trim());
  };

  const handleUseStarter = (starter: string) => {
    setText(starter);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 relative z-10">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 text-xs font-semibold opacity-70 hover:opacity-100 transition-opacity disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.write.back}
        </button>

        <div className="text-xs font-mono opacity-60">
          Context: <span className="font-semibold uppercase">{context}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            Write & Dictate
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {t.write.title}
          {theme === 'romantic' && <span className="ml-1.5 text-rose-500">♡</span>}
        </h1>
        <p className="mt-2 text-xs sm:text-sm opacity-75">
          Type freely or tap the microphone to speak your thoughts aloud. All processed in ephemeral memory.
        </p>
      </div>

      {dictationError && (
        <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between gap-2">
          <span>{dictationError}</span>
          <button
            type="button"
            onClick={() => setDictationError(null)}
            className="text-xs px-2 py-0.5 rounded opacity-60 hover:opacity-100 hover:bg-amber-500/20"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Starter Prompts */}
      {starters.length > 0 && (
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">
            {t.write.spark}
          </div>
          <div className="flex flex-col gap-2">
            {starters.map((starter, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleUseStarter(starter)}
                disabled={isLoading}
                className={`text-left p-2.5 rounded-lg border text-xs transition-colors ${
                  theme === 'dark'
                    ? 'border-stone-800 bg-stone-900/80 hover:bg-stone-800 text-stone-300'
                    : theme === 'romantic'
                    ? 'border-rose-200 bg-white hover:bg-rose-50 text-rose-950'
                    : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-600'
                }`}
              >
                "{starter}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Text Area Form */}
      <form onSubmit={handleSubmit} className={`rounded-2xl border p-5 ${cardBg}`}>
        {/* Dictation bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-stone-800">
          <button
            type="button"
            onClick={toggleDictation}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isDictating
                ? 'bg-rose-500 text-white animate-pulse shadow-sm'
                : theme === 'romantic'
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700'
            }`}
          >
            {isDictating ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Dictation (Listening...)</span>
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dictate with Voice</span>
              </>
            )}
          </button>

          {isDictating && (
            <div className="flex items-center gap-1.5 text-xs text-rose-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Microphone live</span>
            </div>
          )}
        </div>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, maxChars))}
            placeholder={isDictating ? 'Listening to your voice... Speak naturally...' : t.write.placeholder}
            rows={7}
            disabled={isLoading}
            className="w-full resize-none border-0 p-0 placeholder:opacity-40 focus:ring-0 sm:text-sm sm:leading-6 font-sans bg-transparent"
            autoFocus
          />
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="text-xs font-mono opacity-50">
            <span className={remainingChars < 50 ? 'text-amber-600 font-bold' : ''}>
              {text.length}
            </span>
            {' / '}{maxChars} {t.write.chars}
          </div>

          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs ${
              theme === 'romantic'
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : theme === 'dark'
                ? 'bg-white text-stone-900 hover:bg-stone-100'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{t.write.reflecting}</span>
              </>
            ) : (
              <>
                <span>{t.write.reflectNow}</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center text-xs opacity-50">
        {t.write.inTransit}
      </div>
    </div>
  );
};

