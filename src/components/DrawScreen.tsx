/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { AcademicContext, PreferredStyle, Theme, Language } from '../types';
import { TRANSLATIONS } from '../lib/i18n';
import { ArrowLeft, RotateCcw, Trash2, Send, Loader2 } from 'lucide-react';

interface DrawScreenProps {
  context: AcademicContext;
  preferredStyle: PreferredStyle;
  onBack: () => void;
  onSubmit: (drawingDataUrl: string) => Promise<void>;
  isLoading: boolean;
  theme: Theme;
  language: Language;
}

const PALETTE = [
  { name: 'Slate Ink', color: '#1e293b' },
  { name: 'Panic Coral', color: '#e11d48' },
  { name: 'Amber Ochre', color: '#d97706' },
  { name: 'Mindful Sage', color: '#059669' },
  { name: 'Calm Sky', color: '#0284c7' },
  { name: 'Burnt Clay', color: '#c2410c' },
  { name: 'Romantic Rose', color: '#f43f5e' },
  { name: 'Eraser', color: '#ffffff' },
];

export const DrawScreen: React.FC<DrawScreenProps> = ({
  context,
  preferredStyle,
  onBack,
  onSubmit,
  isLoading,
  theme,
  language,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState('#1e293b');
  const [brushSize, setBrushSize] = useState(9);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const cardBg =
    theme === 'dark'
      ? 'bg-stone-900 border-stone-800 text-stone-100'
      : theme === 'romantic'
      ? 'bg-white border-rose-200 text-stone-900 shadow-xs'
      : 'bg-white border-stone-200 text-stone-900 shadow-xs';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialData]);
  }, []);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), currentData]);
    setHasDrawn(true);
  };

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isLoading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.setPointerCapture(e.pointerId);
    setIsDrawing(true);

    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isLoading) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    try {
      const canvas = canvasRef.current;
      if (canvas && canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    saveToHistory();
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = history.slice(0, -1);
    const prevSnapshot = newHistory[newHistory.length - 1];
    ctx.putImageData(prevSnapshot, 0, 0);
    setHistory(newHistory);
    if (newHistory.length <= 1) {
      setHasDrawn(false);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
    setHasDrawn(false);
  };

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn || isLoading) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSubmit(dataUrl);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 relative z-10">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 text-xs font-semibold opacity-70 hover:opacity-100 transition-opacity disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.draw.back}
        </button>

        <div className="text-xs font-mono opacity-60">
          Context: <span className="font-semibold uppercase">{context}</span>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {t.draw.title}
          {theme === 'romantic' && <span className="ml-1.5 text-rose-500">♡</span>}
        </h1>
        <p className="mt-1 text-xs sm:text-sm opacity-75">
          {t.draw.subtitle}
        </p>
      </div>

      {/* Canvas Tooling Container */}
      <div className={`rounded-2xl border p-4 sm:p-6 flex flex-col items-center ${cardBg}`}>
        {/* Controls Toolbar */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
          {/* Palette */}
          <div className="flex items-center gap-2">
            {PALETTE.map((item) => (
              <button
                key={item.color}
                type="button"
                onClick={() => setColor(item.color)}
                title={item.name}
                className={`w-7 h-7 rounded-full border transition-transform ${
                  color === item.color
                    ? 'scale-115 ring-2 ring-stone-900 ring-offset-2'
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: item.color,
                  borderColor: item.color === '#ffffff' ? '#cbd5e1' : item.color,
                }}
              />
            ))}
          </div>

          {/* Brush Sizes */}
          <div
            className={`flex items-center gap-1 p-1 rounded-lg ${
              theme === 'dark' ? 'bg-stone-800' : 'bg-stone-100'
            }`}
          >
            {[
              { label: t.draw.fine, size: 3 },
              { label: t.draw.medium, size: 9 },
              { label: t.draw.heavy, size: 24 },
            ].map((b) => (
              <button
                key={b.size}
                type="button"
                onClick={() => setBrushSize(b.size)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                  brushSize === b.size
                    ? theme === 'dark'
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'bg-white text-stone-900 font-semibold shadow-xs'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Undo / Clear Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length <= 1 || isLoading}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 opacity-80 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
              title={t.draw.undo}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!hasDrawn || isLoading}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 opacity-80 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed"
              title={t.draw.clear}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 512x512 Canvas */}
        <div className="relative mt-4 border border-stone-300 rounded-xl overflow-hidden shadow-inner bg-white">
          <canvas
            ref={canvasRef}
            width={512}
            height={512}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerCancel={stopDrawing}
            className="w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] cursor-crosshair touch-none select-none"
          />
        </div>

        {/* Submit Bar */}
        <div className="w-full flex items-center justify-between mt-6 pt-4 border-t border-stone-100 dark:border-stone-800">
          <div className="text-xs opacity-50">
            {t.draw.specs}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!hasDrawn || isLoading}
            className={`inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs ${
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
                <span>{t.draw.interpreting}</span>
              </>
            ) : (
              <>
                <span>{t.draw.submit}</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
