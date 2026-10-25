/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AcademicContext, PreferredStyle, Theme, Language, VoiceAgentState, VoiceMessage } from '../types';
import { TRANSLATIONS } from '../lib/i18n';
import { sendVoiceTurn } from '../lib/api';
import { CompanionAvatar } from './CompanionAvatar';
import {
  ArrowLeft,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Square,
  Sparkles,
  AlertCircle,
  PhoneCall,
  CheckCircle2,
  RotateCcw,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Keyboard,
  RefreshCw,
  Lock,
} from 'lucide-react';

interface TalkScreenProps {
  context: AcademicContext;
  preferredStyle: PreferredStyle;
  onBack: () => void;
  onSubmitTranscript: (spokenText: string) => Promise<void>;
  isLoading: boolean;
  theme: Theme;
  language: Language;
}

const STATE_LABELS: Record<VoiceAgentState, { label: string; desc: string; color: string }> = {
  GREETING: { label: 'Greeting', desc: 'Opening check-in', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  LISTENING: { label: 'Listening', desc: 'Hearing your thoughts without interruption', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  REFLECTING: { label: 'Reflecting', desc: 'Reflecting what you shared', color: 'bg-sky-500/10 text-sky-600 border-sky-500/20' },
  EXPLORING: { label: 'Exploring', desc: 'One gentle question at a time', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' },
  REFRAMING: { label: 'Reframing', desc: 'Finding a compassionate perspective', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  ACTION: { label: 'Next Step', desc: 'A bite-sized, low-pressure reset', color: 'bg-teal-500/10 text-teal-600 border-teal-500/20' },
  CLOSING: { label: 'Closing', desc: 'Ready to wrap up or reflect', color: 'bg-stone-500/10 text-stone-600 border-stone-500/20' },
  SUPPORT: { label: 'Campus Support', desc: 'Dedicated professional resources', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
};

export const TalkScreen: React.FC<TalkScreenProps> = ({
  context,
  preferredStyle,
  onBack,
  onSubmitTranscript,
  isLoading,
  theme,
  language,
}) => {
  const [sessionActive, setSessionActive] = useState(false);
  const [isTextOnlyMode, setIsTextOnlyMode] = useState(false);
  const [currentState, setCurrentState] = useState<VoiceAgentState>('GREETING');
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isSpeakingAgent, setIsSpeakingAgent] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 min session cap
  const [isProcessingTurn, setIsProcessingTurn] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<string[]>([]);
  const [micError, setMicError] = useState<string | null>(null);
  const [detectedMood, setDetectedMood] = useState<string>('calm');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const cardBg =
    theme === 'dark'
      ? 'bg-stone-900 border-stone-800 text-stone-100'
      : theme === 'romantic'
      ? 'bg-white border-rose-200 text-stone-900 shadow-xs'
      : 'bg-white border-stone-200 text-stone-900 shadow-xs';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Auto-scroll transcript
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentInput]);

  // Session timer
  useEffect(() => {
    let timer: any = null;
    if (sessionActive) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            endSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sessionActive]);

  // Clean-up on unmount
  useEffect(() => {
    return () => {
      endSession();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Barge-in: interrupt agent audio
  const stopAgentAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingAgent(false);
  };

  // Play companion speech using client speech synthesis (zero latency)
  const speakCompanionText = (text: string) => {
    if (!soundEnabled || !('speechSynthesis' in window)) return;

    stopAgentAudio();

    const utterance = new SpeechSynthesisUtterance(text);
    const langCode =
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

    utterance.lang = langCode;
    utterance.rate = 0.95; // Calm, thoughtful pace
    utterance.pitch = 1.0;

    // Pick a natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) => v.lang.startsWith(language));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => setIsSpeakingAgent(true);
    utterance.onend = () => setIsSpeakingAgent(false);
    utterance.onerror = () => setIsSpeakingAgent(false);

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Waveform visualization
  const startWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 40;
      const barWidth = canvas.width / numBars - 2;
      let x = 0;

      for (let i = 0; i < numBars; i++) {
        const val = dataArray[i * 2] || 0;
        const percent = val / 255;
        const barHeight = Math.max(4, percent * canvas.height * 0.9);

        ctx.fillStyle =
          theme === 'romantic'
            ? percent > 0.4
              ? '#f43f5e'
              : '#fda4af'
            : theme === 'dark'
            ? percent > 0.4
              ? '#38bdf8'
              : '#334155'
            : percent > 0.4
            ? '#0ea5e9'
            : '#cbd5e1';

        ctx.beginPath();
        const y = (canvas.height - barHeight) / 2;
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();

        x += barWidth + 2;
      }
    };

    render();
  };

  // Fetch initial greeting turn
  const triggerGreeting = async () => {
    setIsProcessingTurn(true);
    try {
      const greetingRes = await sendVoiceTurn({
        conversationHistory: [],
        studentSpeech: '',
        currentState: 'GREETING',
        context,
        language,
      });

      const greetingMsg: VoiceMessage = {
        id: 'msg-' + Date.now(),
        sender: 'companion',
        text: greetingRes.agentSpeech,
        state: 'GREETING',
        timestamp: Date.now(),
      };

      setMessages([greetingMsg]);
      setCurrentState(greetingRes.nextState);
      setSuggestedActions(greetingRes.suggestedActions);
      speakCompanionText(greetingRes.agentSpeech);
    } catch (e) {
      console.warn('Initial turn failed, using local greeting:', e);
      const fallbackText = "Hey, what's been on your mind today with study life?";
      setMessages([
        {
          id: 'msg-' + Date.now(),
          sender: 'companion',
          text: fallbackText,
          state: 'GREETING',
          timestamp: Date.now(),
        },
      ]);
      speakCompanionText(fallbackText);
    } finally {
      setIsProcessingTurn(false);
    }
  };

  // Start 1-to-1 conversation in Voice or Text mode
  const startSession = async (mode: 'voice' | 'text' = 'voice') => {
    setMicError(null);

    if (mode === 'text') {
      setIsTextOnlyMode(true);
      setSessionActive(true);
      setCurrentState('LISTENING');
      await triggerGreeting();
      return;
    }

    // Voice mode
    setIsTextOnlyMode(false);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Your browser does not support microphone capture. You can continue in Text Mode.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      analyserRef.current = analyser;

      startWaveform();

      // Start Web Speech Recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
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
          // Barge-in: if user starts speaking, stop companion audio immediately
          stopAgentAudio();

          let spoken = '';
          for (let i = 0; i < event.results.length; i++) {
            spoken += event.results[i][0].transcript + ' ';
          }
          setCurrentInput(spoken.trim());
        };

        recognition.onerror = (e: any) => {
          if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
            console.warn('Speech recognition permission denied:', e.error);
            setMicError('Speech recognition was denied access. You can continue typing in Text Mode.');
            setIsTextOnlyMode(true);
          } else if (e.error !== 'no-speech') {
            console.warn('Speech recognition notice:', e.error);
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
      }

      setSessionActive(true);
      setCurrentState('LISTENING');
      await triggerGreeting();
    } catch (err: any) {
      console.error('Microphone error:', err);
      const isDenied =
        err.name === 'NotAllowedError' ||
        err.name === 'PermissionDeniedError' ||
        (err.message && (err.message.toLowerCase().includes('permission') || err.message.toLowerCase().includes('denied')));

      if (isDenied) {
        setMicError('Microphone permission was blocked or denied. To speak aloud, allow microphone access in your browser (lock icon in address bar) and click Retry. Or tap "Continue in Text Mode" below to talk right now.');
      } else {
        setMicError(err.message || 'Microphone access is unavailable on this device. You can chat using Text Mode.');
      }
    }
  };

  // Stop session
  const endSession = () => {
    setSessionActive(false);
    stopAgentAudio();

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
  };

  // Submit student turn (spoken or selected action pill)
  const handleSendTurn = async (spokenOverride?: string) => {
    const textToSend = (spokenOverride || currentInput).trim();
    if (!textToSend || isProcessingTurn) return;

    stopAgentAudio();
    setCurrentInput('');

    const userMsg: VoiceMessage = {
      id: 'msg-' + Date.now(),
      sender: 'student',
      text: textToSend,
      state: currentState,
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsProcessingTurn(true);

    try {
      const historyPayload = newHistory.map((m) => ({
        role: m.sender === 'student' ? ('student' as const) : ('companion' as const),
        text: m.text,
        state: m.state,
      }));

      const turnRes = await sendVoiceTurn({
        conversationHistory: historyPayload,
        studentSpeech: textToSend,
        currentState,
        context,
        language,
      });

      const companionMsg: VoiceMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'companion',
        text: turnRes.agentSpeech,
        state: turnRes.nextState,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, companionMsg]);
      setCurrentState(turnRes.nextState);
      setSuggestedActions(turnRes.suggestedActions);
      if (turnRes.detectedMood) setDetectedMood(turnRes.detectedMood);

      speakCompanionText(turnRes.agentSpeech);
    } catch (err: any) {
      console.error('Error in conversation turn:', err);
      const fallbackReply = "I hear you. Take a gentle breath—we can take this one small step at a time.";
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-' + Date.now(),
          sender: 'companion',
          text: fallbackReply,
          state: 'EXPLORING',
          timestamp: Date.now(),
        },
      ]);
      speakCompanionText(fallbackReply);
    } finally {
      setIsProcessingTurn(false);
    }
  };

  // Generate reflection summary and finish
  const handleFinishAndReflect = async () => {
    endSession();
    // Gather student concerns into summary
    const studentWords = messages
      .filter((m) => m.sender === 'student')
      .map((m) => m.text)
      .join(' ');

    const fullTranscript = studentWords || 'Voice reflection session';
    await onSubmitTranscript(fullTranscript);
  };

  const stateInfo = STATE_LABELS[currentState] || STATE_LABELS.LISTENING;

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
          {t.talk.back}
        </button>

        <div className="flex items-center gap-3 text-xs font-mono opacity-80">
          <span className="hidden sm:inline">
            Context: <span className="font-semibold uppercase">{context}</span>
          </span>
          {sessionActive && (
            <span className="text-amber-600 font-semibold px-2 py-0.5 rounded-md bg-amber-500/10">
              {formatTime(timeRemaining)}
            </span>
          )}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (soundEnabled) stopAgentAudio();
            }}
            title={soundEnabled ? 'Mute companion voice' : 'Enable companion voice'}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5 text-stone-400" />}
          </button>
        </div>
      </div>

      {/* Title & Philosophy */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 border border-sky-500/20">
            Feature 3 · 1-to-1 Voice Companion
          </span>
          <span className="text-[11px] opacity-60">Zero Recording · Ephemeral Session</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Talk with your AI Study Companion
          {theme === 'romantic' && <span className="ml-1.5 text-rose-500">♡</span>}
        </h1>
        <p className="mt-2 text-xs sm:text-sm opacity-75 leading-relaxed">
          A calm, supportive peer friend to talk through exam stress, deadlines, presentation fears, or difficult study days. Listens, reflects, and helps you reframe one thought at a time.
        </p>
      </div>

      {micError && (
        <div className="mb-6 p-4 sm:p-5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-100 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="font-semibold text-sm text-amber-900 dark:text-amber-200">
                Microphone Access Notice
              </div>
              <p className="leading-relaxed opacity-90">{micError}</p>
              
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => startSession('voice')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Microphone</span>
                </button>

                <button
                  type="button"
                  onClick={() => startSession('text')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 font-semibold rounded-lg text-xs transition-colors shadow-xs"
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>Continue in Text Mode (No Mic Needed)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMicError(null)}
                  className="px-2.5 py-1.5 opacity-60 hover:opacity-100 text-xs transition-opacity"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Companion Interactive Stage */}
      <div className={`rounded-2xl border p-6 sm:p-8 flex flex-col ${cardBg}`}>
        {/* Status / State Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border ${stateInfo.color}`}>
              {stateInfo.label}
            </span>
            <span className="text-xs opacity-60 hidden sm:inline">{stateInfo.desc}</span>
          </div>

          {sessionActive && (
            <div className="flex items-center gap-2 text-xs font-mono">
              {isTextOnlyMode ? (
                <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Keyboard className="w-3.5 h-3.5 text-stone-500" />
                    Text Mode Active
                  </span>
                  <button
                    onClick={() => startSession('voice')}
                    className="text-[11px] underline text-sky-600 dark:text-sky-400 hover:opacity-80 inline-flex items-center gap-1 ml-1"
                  >
                    <Mic className="w-3 h-3" />
                    Try Mic
                  </button>
                </div>
              ) : isSpeakingAgent ? (
                <span className="text-sky-600 font-semibold flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  Companion speaking (tap anywhere to interrupt)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Mic listening
                </span>
              )}
            </div>
          )}
        </div>

        {/* Animated 3D Living AI Orb Avatar */}
        <div className="w-full flex flex-col items-center justify-center my-2 mb-5">
          <CompanionAvatar
            sessionActive={sessionActive}
            state={currentState}
            isSpeakingAgent={isSpeakingAgent}
            isProcessingTurn={isProcessingTurn}
            analyser={analyserRef.current}
            theme={theme}
            onTap={() => {
              if (!sessionActive) startSession('voice');
            }}
          />
        </div>

        {/* Start / Stop Call Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
          {!sessionActive ? (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => startSession('voice')}
                disabled={isLoading}
                className={`inline-flex items-center gap-2.5 px-7 py-3.5 font-semibold text-sm rounded-2xl transition-all shadow-md group hover:scale-102 ${
                  theme === 'romantic'
                    ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200'
                    : theme === 'dark'
                    ? 'bg-white text-stone-900 hover:bg-stone-100'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <Mic className="w-4 h-4" />
                <span>Talk with Voice</span>
              </button>

              <button
                onClick={() => startSession('text')}
                disabled={isLoading}
                className={`inline-flex items-center gap-2 px-5 py-3 font-medium text-xs sm:text-sm rounded-2xl border transition-all hover:scale-102 ${
                  theme === 'romantic'
                    ? 'border-rose-200 bg-white text-rose-900 hover:bg-rose-50'
                    : theme === 'dark'
                    ? 'border-stone-800 bg-stone-900 text-stone-200 hover:bg-stone-800'
                    : 'border-stone-200 bg-white text-stone-800 hover:bg-stone-100'
                }`}
              >
                <Keyboard className="w-4 h-4 opacity-70" />
                <span>Type in Text Mode</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={endSession}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-xl transition-all shadow-sm"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
                <span>Pause Session</span>
              </button>

              <button
                onClick={handleFinishAndReflect}
                disabled={messages.length < 2 || isLoading}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm disabled:opacity-40"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Wrap Up & Reflect</span>
              </button>
            </div>
          )}
        </div>

        {/* Spoken Turn Dialogue Log */}
        {messages.length > 0 && (
          <div className="mt-2 mb-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider opacity-60 mb-2 flex items-center justify-between">
              <span>Spoken Conversation</span>
              <span className="text-[10px] font-mono opacity-50">Turn-aware Dialogue</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto p-4 rounded-xl border border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-950/40">
              {messages.map((msg) => {
                const isStudent = msg.sender === 'student';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] font-mono opacity-50 mb-1 px-1">
                      {isStudent ? 'You' : 'Companion'}
                    </div>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                        isStudent
                          ? theme === 'romantic'
                            ? 'bg-rose-600 text-white rounded-br-xs'
                            : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-br-xs'
                          : theme === 'romantic'
                          ? 'bg-white border border-rose-200 text-stone-900 rounded-bl-xs'
                          : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-bl-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Suggested Response Pills */}
        {sessionActive && suggestedActions.length > 0 && (
          <div className="mb-4">
            <div className="text-[10px] font-mono uppercase tracking-wider opacity-50 mb-1.5">
              Suggested next steps:
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSendTurn(action)}
                  disabled={isProcessingTurn}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    theme === 'romantic'
                      ? 'border-rose-200 bg-white hover:bg-rose-50 text-rose-900'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-stone-400 text-stone-700 dark:text-stone-200'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Spoken Input Box (Editable or spoken) */}
        {sessionActive && (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendTurn();
                }}
                placeholder={
                  isProcessingTurn
                    ? 'Companion is thinking...'
                    : 'Speak naturally or type your reply...'
                }
                disabled={isProcessingTurn}
                className={`flex-1 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none ${
                  theme === 'dark'
                    ? 'bg-stone-950 border-stone-800 text-stone-100 focus:border-stone-600'
                    : theme === 'romantic'
                    ? 'bg-white border-rose-200 text-stone-900 focus:border-rose-400'
                    : 'bg-white border-stone-200 text-stone-900 focus:border-stone-900'
                }`}
              />

              <button
                onClick={() => handleSendTurn()}
                disabled={!currentInput.trim() || isProcessingTurn}
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-colors disabled:opacity-40 ${
                  theme === 'romantic'
                    ? 'bg-rose-600 text-white hover:bg-rose-700'
                    : theme === 'dark'
                    ? 'bg-white text-stone-900 hover:bg-stone-100'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Crisis Support Card if SUPPORT state */}
        {currentState === 'SUPPORT' && (
          <div className="mt-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs">
            <div className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5 mb-2">
              <PhoneCall className="w-4 h-4 text-rose-600" />
              Immediate Support Resources
            </div>
            <p className="text-rose-800 dark:text-rose-300 mb-3">
              You are not alone. Please reach out right now:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-medium">
              <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-rose-200 dark:border-rose-800">
                <div className="font-bold">988 Lifeline</div>
                <div className="text-stone-600 dark:text-stone-300 text-[11px]">Call or text 988 (Free, 24/7)</div>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-stone-900 border border-rose-200 dark:border-rose-800">
                <div className="font-bold">Crisis Text Line</div>
                <div className="text-stone-600 dark:text-stone-300 text-[11px]">Text HOME to 741741</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Privacy Guarantee */}
        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] opacity-60">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Short-lived RAM audio session · No audio saved on any server</span>
          </div>
          <div>Barge-in / Interruptible</div>
        </div>
      </div>
    </div>
  );
};
