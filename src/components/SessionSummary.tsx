/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SessionEntry, CampusPreset, Emotion, Theme, Language } from '../types';
import { EMOTION_COLORS, exportSessionPdf, exportMoodCardPng } from '../lib/exportUtils';
import { TRANSLATIONS } from '../lib/i18n';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  Download,
  Trash2,
  PlusCircle,
  TrendingDown,
  TrendingUp,
  Activity,
  PenLine,
  Palette,
  Mic,
} from 'lucide-react';

interface SessionSummaryProps {
  entries: SessionEntry[];
  campus: CampusPreset | null;
  onNewReflection: () => void;
  onClearSession: () => void;
  onOpenSupport: () => void;
  theme: Theme;
  language: Language;
}

type ChartViewType = 'progression' | 'stress_calm' | 'distribution';

export const SessionSummary: React.FC<SessionSummaryProps> = ({
  entries,
  campus,
  onNewReflection,
  onClearSession,
  onOpenSupport,
  theme,
  language,
}) => {
  const [chartView, setChartView] = useState<ChartViewType>('progression');
  const [activeEmotions, setActiveEmotions] = useState<Record<string, boolean>>({
    stress: true,
    calmness: true,
    curiosity: true,
    sadness: true,
    happiness: true,
  });

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const cardBg =
    theme === 'dark'
      ? 'bg-stone-900 border-stone-800 text-stone-100'
      : theme === 'romantic'
      ? 'bg-white border-rose-200 text-stone-900 shadow-xs'
      : 'bg-white border-stone-200 text-stone-900 shadow-xs';

  const chronologicalEntries = [...entries].reverse();

  const chartData = chronologicalEntries.map((entry, index) => {
    const timeFormatted = new Date(entry.at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return {
      index: index + 1,
      turn: `Turn ${index + 1}`,
      mode: entry.mode,
      context: entry.context,
      time: timeFormatted,
      dominant: entry.dominant,
      stress: entry.emotions.stress,
      calmness: entry.emotions.calmness,
      curiosity: entry.emotions.curiosity,
      sadness: entry.emotions.sadness,
      happiness: entry.emotions.happiness,
      anger: entry.emotions.anger,
    };
  });

  const emotionKeys: Emotion[] = ['stress', 'calmness', 'curiosity', 'happiness', 'sadness', 'anger'];
  const emotionAverages = emotionKeys.map((emo) => {
    if (entries.length === 0) return { emotion: emo, label: t.emotions[emo], value: 0, color: EMOTION_COLORS[emo] };
    const total = entries.reduce((acc, curr) => acc + (curr.emotions[emo] || 0), 0);
    return {
      emotion: emo,
      label: t.emotions[emo],
      value: Math.round(total / entries.length),
      color: EMOTION_COLORS[emo],
    };
  });

  const firstEntry = chronologicalEntries[0];
  const latestEntry = chronologicalEntries[chronologicalEntries.length - 1];
  let stressDelta = 0;
  let calmDelta = 0;
  if (firstEntry && latestEntry && entries.length > 1) {
    stressDelta = latestEntry.emotions.stress - firstEntry.emotions.stress;
    calmDelta = latestEntry.emotions.calmness - firstEntry.emotions.calmness;
  }

  const artEntries = entries.filter((e) => Boolean(e.artDataUrl));

  const handleExportPdf = () => {
    exportSessionPdf(entries, campus?.name);
  };

  const toggleEmotionFilter = (key: string) => {
    setActiveEmotions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const CustomProgressionTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-stone-900 text-stone-100 p-3.5 rounded-xl border border-stone-700 shadow-xl text-xs max-w-xs font-sans">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800">
            <span className="font-bold text-stone-200">{dataPoint.turn}</span>
            <span className="text-[11px] font-mono text-stone-400">
              {dataPoint.time} · {dataPoint.mode.toUpperCase()}
            </span>
          </div>

          <div className="text-[11px] text-stone-400 mb-2">
            Context: <span className="text-stone-200 capitalize font-medium">{dataPoint.context}</span>
            <span className="mx-1.5">·</span>
            Dominant: <span className="font-semibold text-amber-400">{t.emotions[dataPoint.dominant as Emotion]}</span>
          </div>

          <div className="space-y-1 mt-1">
            {payload.map((entry: any) => (
              <div key={entry.name} className="flex items-center justify-between gap-3 text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-stone-300">{entry.name}:</span>
                </div>
                <span className="font-mono font-semibold text-stone-100 tabular-nums">
                  {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 relative z-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div
            className={`text-xs font-semibold uppercase tracking-wider ${
              theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'
            }`}
          >
            {t.summary.visitMemory}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
            {t.summary.title}
            {theme === 'romantic' && <span className="ml-1.5 text-rose-500">♡</span>}
          </h1>
          <p className="text-xs opacity-60 mt-0.5">
            {t.summary.subtitle} · {entries.length} {t.summary.reflectionsCount.toLowerCase()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNewReflection}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs ${
              theme === 'romantic'
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : theme === 'dark'
                ? 'bg-white text-stone-900 hover:bg-stone-100'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            {t.summary.newReflection}
          </button>
          <button
            onClick={handleExportPdf}
            disabled={entries.length === 0}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 disabled:opacity-40 ${
              theme === 'dark'
                ? 'bg-stone-800 border-stone-700 text-stone-200 hover:bg-stone-700'
                : theme === 'romantic'
                ? 'bg-white border-rose-200 text-rose-900 hover:bg-rose-50'
                : 'bg-white border-stone-200 text-stone-800 hover:bg-stone-50'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            {t.summary.exportPdf}
          </button>
          <button
            onClick={onClearSession}
            className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-1.5"
            title="Wipe tab memory completely"
          >
            <Trash2 className="w-3.5 h-3.5" />
            {t.summary.clearSession}
          </button>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className={`text-center py-16 rounded-2xl border p-8 ${cardBg}`}>
          <Activity className="w-8 h-8 opacity-40 mx-auto mb-3" />
          <h2 className="text-base font-bold">{t.summary.emptyTitle}</h2>
          <p className="text-xs opacity-60 mt-1 max-w-sm mx-auto">
            {t.summary.emptyDesc}
          </p>
          <button
            onClick={onNewReflection}
            className={`mt-6 px-6 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
              theme === 'romantic'
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : theme === 'dark'
                ? 'bg-white text-stone-900 hover:bg-stone-100'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {t.summary.startFirst}
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Executive Session Metrics Strip */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border ${cardBg}`}>
            <div>
              <div className="text-[11px] font-mono opacity-50 uppercase tracking-wider">
                {t.summary.reflectionsCount}
              </div>
              <div className="text-xl font-bold mt-1 tabular-nums">
                {entries.length}
              </div>
              <div className="text-[11px] opacity-60 mt-0.5">
                {entries.filter((e) => e.mode === 'write').length} written ·{' '}
                {entries.filter((e) => e.mode === 'draw').length} sketched ·{' '}
                {entries.filter((e) => e.mode === 'talk').length} voiced
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono opacity-50 uppercase tracking-wider">
                {t.summary.latestDominant}
              </div>
              <div
                className="text-xl font-bold mt-1"
                style={{ color: EMOTION_COLORS[latestEntry.dominant] }}
              >
                {t.emotions[latestEntry.dominant]}
              </div>
              <div className="text-[11px] opacity-60 mt-0.5">
                {new Date(latestEntry.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono opacity-50 uppercase tracking-wider">
                {t.summary.stressTrajectory}
              </div>
              <div className="text-xl font-bold mt-1 flex items-center gap-1.5 tabular-nums">
                {entries.length > 1 ? (
                  <>
                    {stressDelta < 0 ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <TrendingDown className="w-4 h-4" />
                        {stressDelta}%
                      </span>
                    ) : stressDelta > 0 ? (
                      <span className="text-rose-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +{stressDelta}%
                      </span>
                    ) : (
                      <span className="opacity-70">Steady</span>
                    )}
                  </>
                ) : (
                  <span className="opacity-70 tabular-nums">{latestEntry.emotions.stress}%</span>
                )}
              </div>
              <div className="text-[11px] opacity-60 mt-0.5">
                {entries.length > 1
                  ? stressDelta < 0
                    ? 'Pressure easing'
                    : 'Shift in tension'
                  : 'Baseline intensity'}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono opacity-50 uppercase tracking-wider">
                {t.summary.calmnessShift}
              </div>
              <div className="text-xl font-bold mt-1 flex items-center gap-1.5 tabular-nums">
                {entries.length > 1 ? (
                  <>
                    {calmDelta > 0 ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +{calmDelta}%
                      </span>
                    ) : calmDelta < 0 ? (
                      <span className="opacity-70 flex items-center gap-1">
                        <TrendingDown className="w-4 h-4" />
                        {calmDelta}%
                      </span>
                    ) : (
                      <span className="opacity-70">0%</span>
                    )}
                  </>
                ) : (
                  <span className="opacity-70 tabular-nums">{latestEntry.emotions.calmness}%</span>
                )}
              </div>
              <div className="text-[11px] opacity-60 mt-0.5">
                {entries.length > 1 && calmDelta > 0 ? 'Mental space increasing' : 'Visit calibration'}
              </div>
            </div>
          </div>

          {/* Main Visual Chart Container */}
          <div className={`rounded-2xl border p-6 ${cardBg}`}>
            {/* Chart Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
              <div>
                <h2 className="text-sm font-bold flex items-center gap-2">
                  <Activity
                    className={`w-4 h-4 ${theme === 'romantic' ? 'text-rose-600' : 'text-amber-700'}`}
                  />
                  {t.summary.chartTitle}
                </h2>
                <p className="text-xs opacity-60 mt-0.5">
                  {t.summary.chartSubtitle}
                </p>
              </div>

              {/* View Selector Tabs */}
              <div
                className={`flex items-center gap-1 p-1 rounded-lg text-xs self-start sm:self-auto ${
                  theme === 'dark' ? 'bg-stone-800' : 'bg-stone-100'
                }`}
              >
                <button
                  onClick={() => setChartView('progression')}
                  className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                    chartView === 'progression'
                      ? theme === 'dark'
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'bg-white text-stone-900 font-semibold shadow-xs'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {t.summary.tabAll}
                </button>
                <button
                  onClick={() => setChartView('stress_calm')}
                  className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                    chartView === 'stress_calm'
                      ? theme === 'dark'
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'bg-white text-stone-900 font-semibold shadow-xs'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {t.summary.tabStressCalm}
                </button>
                <button
                  onClick={() => setChartView('distribution')}
                  className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                    chartView === 'distribution'
                      ? theme === 'dark'
                        ? 'bg-stone-900 text-white font-semibold'
                        : 'bg-white text-stone-900 font-semibold shadow-xs'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {t.summary.tabAverages}
                </button>
              </div>
            </div>

            {/* View 1: Multi-Emotion Spline Progression */}
            {chartView === 'progression' && (
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-4 flex-wrap text-xs">
                  <span className="text-[11px] opacity-50 font-mono">Toggle:</span>
                  {[
                    { key: 'stress', label: t.emotions.stress, color: EMOTION_COLORS.stress },
                    { key: 'calmness', label: t.emotions.calmness, color: EMOTION_COLORS.calmness },
                    { key: 'curiosity', label: t.emotions.curiosity, color: EMOTION_COLORS.curiosity },
                    { key: 'sadness', label: t.emotions.sadness, color: EMOTION_COLORS.sadness },
                    { key: 'happiness', label: t.emotions.happiness, color: EMOTION_COLORS.happiness },
                  ].map((filter) => {
                    const active = activeEmotions[filter.key];
                    return (
                      <button
                        key={filter.key}
                        onClick={() => toggleEmotionFilter(filter.key)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-all ${
                          active
                            ? theme === 'dark'
                              ? 'bg-stone-800 border-stone-700 text-stone-200 font-medium'
                              : 'bg-stone-50 border-stone-300 text-stone-800 font-medium'
                            : 'bg-transparent border-transparent opacity-40 line-through'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: active ? filter.color : '#cbd5e1' }}
                        />
                        <span>{filter.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme === 'dark' ? '#292524' : '#f1f5f9'}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="turn"
                        tick={{ fontSize: 11, fill: theme === 'dark' ? '#a8a29e' : '#64748b' }}
                        axisLine={{ stroke: theme === 'dark' ? '#44403c' : '#e2e8f0' }}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 11, fill: theme === 'dark' ? '#a8a29e' : '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <Tooltip content={<CustomProgressionTooltip />} />
                      <ReferenceLine
                        y={50}
                        stroke={theme === 'dark' ? '#44403c' : '#e2e8f0'}
                        strokeDasharray="4 4"
                      />

                      {activeEmotions.stress && (
                        <Line
                          type="monotone"
                          dataKey="stress"
                          name={t.emotions.stress}
                          stroke={EMOTION_COLORS.stress}
                          strokeWidth={2.5}
                          dot={{ r: 4, strokeWidth: 1.5, fill: '#ffffff' }}
                          activeDot={{ r: 6, fill: EMOTION_COLORS.stress }}
                        />
                      )}

                      {activeEmotions.calmness && (
                        <Line
                          type="monotone"
                          dataKey="calmness"
                          name={t.emotions.calmness}
                          stroke={EMOTION_COLORS.calmness}
                          strokeWidth={2.5}
                          dot={{ r: 4, strokeWidth: 1.5, fill: '#ffffff' }}
                          activeDot={{ r: 6, fill: EMOTION_COLORS.calmness }}
                        />
                      )}

                      {activeEmotions.curiosity && (
                        <Line
                          type="monotone"
                          dataKey="curiosity"
                          name={t.emotions.curiosity}
                          stroke={EMOTION_COLORS.curiosity}
                          strokeWidth={2}
                          dot={{ r: 3.5, fill: '#ffffff' }}
                          activeDot={{ r: 5, fill: EMOTION_COLORS.curiosity }}
                        />
                      )}

                      {activeEmotions.sadness && (
                        <Line
                          type="monotone"
                          dataKey="sadness"
                          name={t.emotions.sadness}
                          stroke={EMOTION_COLORS.sadness}
                          strokeWidth={2}
                          strokeDasharray="4 3"
                          dot={{ r: 3.5, fill: '#ffffff' }}
                          activeDot={{ r: 5, fill: EMOTION_COLORS.sadness }}
                        />
                      )}

                      {activeEmotions.happiness && (
                        <Line
                          type="monotone"
                          dataKey="happiness"
                          name={t.emotions.happiness}
                          stroke={EMOTION_COLORS.happiness}
                          strokeWidth={2}
                          dot={{ r: 3.5, fill: '#ffffff' }}
                          activeDot={{ r: 5, fill: EMOTION_COLORS.happiness }}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* View 2: Stress vs Calmness Delta */}
            {chartView === 'stress_calm' && (
              <div className="pt-4">
                <div className="text-xs opacity-60 mb-3 flex items-center justify-between">
                  <span>Direct comparison of academic tension vs grounding restoration</span>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                      {t.emotions.stress}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-sky-500" />
                      {t.emotions.calmness}
                    </span>
                  </div>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={EMOTION_COLORS.stress} stopOpacity={0.4} />
                          <stop offset="95%" stopColor={EMOTION_COLORS.stress} stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="calmGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={EMOTION_COLORS.calmness} stopOpacity={0.4} />
                          <stop offset="95%" stopColor={EMOTION_COLORS.calmness} stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme === 'dark' ? '#292524' : '#f1f5f9'}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="turn"
                        tick={{ fontSize: 11, fill: theme === 'dark' ? '#a8a29e' : '#64748b' }}
                        axisLine={{ stroke: theme === 'dark' ? '#44403c' : '#e2e8f0' }}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 11, fill: theme === 'dark' ? '#a8a29e' : '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <Tooltip content={<CustomProgressionTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="stress"
                        name={t.emotions.stress}
                        stroke={EMOTION_COLORS.stress}
                        fill="url(#stressGrad)"
                        strokeWidth={2.5}
                      />
                      <Area
                        type="monotone"
                        dataKey="calmness"
                        name={t.emotions.calmness}
                        stroke={EMOTION_COLORS.calmness}
                        fill="url(#calmGrad)"
                        strokeWidth={2.5}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* View 3: Session Averages Distribution */}
            {chartView === 'distribution' && (
              <div className="pt-4">
                <div className="text-xs opacity-60 mb-3">
                  Average score across all {entries.length} reflections in this visit
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emotionAverages} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme === 'dark' ? '#292524' : '#f1f5f9'}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: theme === 'dark' ? '#a8a29e' : '#64748b' }}
                        axisLine={{ stroke: theme === 'dark' ? '#44403c' : '#e2e8f0' }}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 11, fill: theme === 'dark' ? '#a8a29e' : '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <Tooltip
                        formatter={(val: any) => [`${val}%`, 'Session Mean']}
                        contentStyle={{
                          backgroundColor: '#1c1917',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {emotionAverages.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* Generated Mood Art Gallery */}
          {artEntries.length > 0 && (
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold">{t.summary.galleryTitle}</h2>
                <span className="text-xs opacity-50 font-mono">
                  {artEntries.length} piece{artEntries.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {artEntries.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 group"
                  >
                    <div className="aspect-square w-full overflow-hidden">
                      <img
                        src={item.artDataUrl}
                        alt="Mood art piece"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-xs font-semibold">
                        {t.emotions[item.dominant]} ({item.context})
                      </div>
                      <div className="text-[11px] opacity-50 mt-0.5">
                        {new Date(item.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="mt-2 flex justify-between items-center pt-2 border-t border-stone-100 dark:border-stone-800">
                        <a
                          href={item.artDataUrl}
                          download={`mood-art-${idx + 1}.png`}
                          className="text-xs font-semibold hover:opacity-75"
                        >
                          Download PNG
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Entries List */}
          <div className={`rounded-2xl border p-6 ${cardBg}`}>
            <h2 className="text-sm font-bold mb-4">{t.summary.chronoTitle}</h2>
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {entries.map((entry, index) => {
                const turnNumber = entries.length - index;
                return (
                  <div key={entry.id || index} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">#{turnNumber}</span>
                        <span className="uppercase font-mono text-[11px] opacity-60 flex items-center gap-1">
                          {entry.mode === 'write' && <PenLine className="w-3 h-3" />}
                          {entry.mode === 'draw' && <Palette className="w-3 h-3" />}
                          {entry.mode === 'talk' && <Mic className="w-3 h-3" />}
                          {entry.mode} · {entry.context}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="opacity-50 text-[11px]">
                          {new Date(entry.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button
                          onClick={() => exportMoodCardPng(entry)}
                          className="font-semibold hover:opacity-75"
                        >
                          Card PNG
                        </button>
                      </div>
                    </div>

                    <div className="mt-1 text-xs opacity-75 flex items-center gap-3 flex-wrap">
                      <span>
                        Dominant: <strong>{t.emotions[entry.dominant]}</strong>
                      </span>
                      <span>·</span>
                      <span className="tabular-nums">Stress: {entry.emotions.stress}%</span>
                      <span>·</span>
                      <span className="tabular-nums">Calm: {entry.emotions.calmness}%</span>
                      <span>·</span>
                      <span className="tabular-nums">Curiosity: {entry.emotions.curiosity}%</span>
                    </div>

                    <div className="mt-2 text-sm italic p-3 rounded-lg border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
                      "{entry.responseText}"
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Clear Session Footer Callout */}
      <div className="mt-12 text-center text-xs opacity-50">
        {t.summary.wipeNotice}
      </div>
    </div>
  );
};
