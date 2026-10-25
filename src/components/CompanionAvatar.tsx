/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { VoiceAgentState, Theme } from '../types';

interface CompanionAvatarProps {
  sessionActive: boolean;
  state: VoiceAgentState;
  isSpeakingAgent: boolean;
  isProcessingTurn: boolean;
  analyser: AnalyserNode | null;
  theme: Theme;
  onTap?: () => void;
}

export const CompanionAvatar: React.FC<CompanionAvatarProps> = ({
  sessionActive,
  state,
  isSpeakingAgent,
  isProcessingTurn,
  analyser,
  theme,
  onTap,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [eyeState, setEyeState] = useState<{
    blinkScale: number;
    lookX: number;
    lookY: number;
    isSmiling: boolean;
  }>({
    blinkScale: 1,
    lookX: 0,
    lookY: 0,
    isSmiling: false,
  });

  const animFrameRef = useRef<number | null>(null);
  const baseImgRef = useRef<HTMLImageElement | null>(null);
  const imgLoadedRef = useRef(false);

  // Preload reference avatar image
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/aistudio/image_5ede51b7.png';
    img.onload = () => {
      baseImgRef.current = img;
      imgLoadedRef.current = true;
    };
    if (img.complete && img.naturalWidth > 0) {
      baseImgRef.current = img;
      imgLoadedRef.current = true;
    }
  }, []);

  // Natural blinking & looking micro-saccades loop
  useEffect(() => {
    let blinkTimeout: any = null;
    let gazeTimeout: any = null;

    const scheduleBlink = () => {
      const delay = Math.random() * 3000 + 2500; // 2.5s to 5.5s
      blinkTimeout = setTimeout(() => {
        // Blink down
        setEyeState((prev) => ({ ...prev, blinkScale: 0.1 }));
        setTimeout(() => {
          // Blink up
          setEyeState((prev) => ({ ...prev, blinkScale: 1 }));

          // 25% chance of double-blink
          if (Math.random() < 0.25) {
            setTimeout(() => {
              setEyeState((prev) => ({ ...prev, blinkScale: 0.1 }));
              setTimeout(() => {
                setEyeState((prev) => ({ ...prev, blinkScale: 1 }));
              }, 110);
            }, 120);
          }

          scheduleBlink();
        }, 130);
      }, delay);
    };

    const scheduleGaze = () => {
      const delay = Math.random() * 4000 + 2000;
      gazeTimeout = setTimeout(() => {
        if (state === 'EXPLORING' || isProcessingTurn) {
          // Looking upward thoughtfully
          setEyeState((prev) => ({ ...prev, lookX: 1.5, lookY: -2.5 }));
        } else if (state === 'LISTENING') {
          // Attentive forward gaze with slight lean
          setEyeState((prev) => ({ ...prev, lookX: 0, lookY: 0.5 }));
        } else {
          // Gentle idle drift
          const rx = (Math.random() - 0.5) * 3;
          const ry = (Math.random() - 0.5) * 2;
          setEyeState((prev) => ({ ...prev, lookX: rx, lookY: ry }));
        }
        scheduleGaze();
      }, delay);
    };

    scheduleBlink();
    scheduleGaze();

    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(gazeTimeout);
    };
  }, [state, isProcessingTurn]);

  // Main high-performance render loop (Canvas + audio reactivity)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rot1 = 0;
    let rot2 = 0;
    let pulseTime = 0;
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      pulseTime += 0.04;

      // 1. Calculate live audio intensity
      let volume = 0;
      if (analyser && dataArray && sessionActive && !isSpeakingAgent) {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        const count = Math.min(32, dataArray.length);
        for (let i = 0; i < count; i++) {
          sum += dataArray[i];
        }
        volume = Math.min(1, (sum / count) / 120);
      } else if (isSpeakingAgent) {
        // Simulated rhythmic speech bounce
        volume = 0.35 + Math.sin(pulseTime * 5) * 0.25 + Math.sin(pulseTime * 11) * 0.15;
      } else if (isProcessingTurn) {
        // Thinking pulse
        volume = 0.2 + Math.sin(pulseTime * 4) * 0.15;
      } else {
        // Subtle resting breath
        volume = 0.05 + Math.sin(pulseTime * 1.5) * 0.03;
      }
      setAudioLevel(volume);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const baseRadius = (w / 2) * 0.72;
      const reactiveRadius = baseRadius * (1 + volume * 0.12);

      ctx.clearRect(0, 0, w, h);

      // --- LAYER 1: Ambient Outer Aura Glow ---
      const auraGradient = ctx.createRadialGradient(cx, cy, baseRadius * 0.4, cx, cy, w / 2);
      if (theme === 'romantic') {
        auraGradient.addColorStop(0, `rgba(244, 63, 94, ${0.35 + volume * 0.3})`);
        auraGradient.addColorStop(0.5, `rgba(251, 113, 133, ${0.15 + volume * 0.2})`);
        auraGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      } else if (state === 'LISTENING') {
        auraGradient.addColorStop(0, `rgba(16, 185, 129, ${0.3 + volume * 0.4})`);
        auraGradient.addColorStop(0.5, `rgba(6, 182, 212, ${0.2 + volume * 0.3})`);
        auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else if (isSpeakingAgent) {
        auraGradient.addColorStop(0, `rgba(14, 165, 233, ${0.4 + volume * 0.3})`);
        auraGradient.addColorStop(0.6, `rgba(230, 126, 34, ${0.25 + volume * 0.2})`);
        auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        auraGradient.addColorStop(0, `rgba(22, 160, 133, ${0.25 + volume * 0.2})`);
        auraGradient.addColorStop(0.6, `rgba(99, 102, 241, ${0.15 + volume * 0.15})`);
        auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(cx, cy, w / 2, 0, Math.PI * 2);
      ctx.fill();

      // --- LAYER 2: Draw the authentic Orb Texture from reference image ---
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, reactiveRadius, 0, Math.PI * 2);
      ctx.clip();

      if (imgLoadedRef.current && baseImgRef.current) {
        // The orb in image_5ede51b7.png (972x729) is centered at x=486, y=365 with radius ~190px.
        // We crop cleanly within 420x420, perfectly skipping any corner watermarks!
        const cropX = 276;
        const cropY = 155;
        const cropSize = 420;

        ctx.drawImage(
          baseImgRef.current,
          cropX,
          cropY,
          cropSize,
          cropSize,
          cx - reactiveRadius,
          cy - reactiveRadius,
          reactiveRadius * 2,
          reactiveRadius * 2
        );
      } else {
        // Fallback procedural sphere if image is still loading
        const fallbackGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, reactiveRadius);
        fallbackGrad.addColorStop(0, '#00dfa2');
        fallbackGrad.addColorStop(0.4, '#0284c7');
        fallbackGrad.addColorStop(0.7, '#7c3aed');
        fallbackGrad.addColorStop(0.9, '#ea580c');
        fallbackGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = fallbackGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // --- LAYER 3: Swirling Fluid Motion Overlays ---
      // Adds live rotational fluid motion to the orb ribbons
      ctx.globalCompositeOperation = 'screen';

      rot1 += 0.015 + volume * 0.02;
      rot2 -= 0.012 + volume * 0.02;

      // Swirl layer 1: Amber/Orange/Cyan flowing ribbon
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot1);
      const swirlGrad1 = ctx.createConicGradient(0, 0, 0);
      swirlGrad1.addColorStop(0, 'rgba(234, 88, 12, 0)');
      swirlGrad1.addColorStop(0.25, `rgba(249, 115, 22, ${0.45 + volume * 0.2})`);
      swirlGrad1.addColorStop(0.5, 'rgba(168, 85, 247, 0)');
      swirlGrad1.addColorStop(0.75, `rgba(6, 182, 212, ${0.5 + volume * 0.25})`);
      swirlGrad1.addColorStop(1, 'rgba(234, 88, 12, 0)');
      ctx.fillStyle = swirlGrad1;
      ctx.fillRect(-reactiveRadius, -reactiveRadius, reactiveRadius * 2, reactiveRadius * 2);
      ctx.restore();

      // Swirl layer 2: Counter-rotating ethereal wave
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot2);
      const swirlGrad2 = ctx.createConicGradient(Math.PI / 2, 0, 0);
      swirlGrad2.addColorStop(0, 'rgba(56, 189, 248, 0)');
      swirlGrad2.addColorStop(0.3, `rgba(16, 185, 129, ${0.35 + volume * 0.3})`);
      swirlGrad2.addColorStop(0.6, 'rgba(239, 68, 68, 0)');
      swirlGrad2.addColorStop(0.85, `rgba(139, 92, 246, ${0.4 + volume * 0.2})`);
      swirlGrad2.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = swirlGrad2;
      ctx.fillRect(-reactiveRadius, -reactiveRadius, reactiveRadius * 2, reactiveRadius * 2);
      ctx.restore();

      // --- LAYER 4: Glowing Inner Teal Core Bloom ---
      ctx.globalCompositeOperation = 'source-over';
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, reactiveRadius * 0.45);
      coreGrad.addColorStop(0, `rgba(52, 211, 153, ${0.7 + volume * 0.25})`);
      coreGrad.addColorStop(0.5, `rgba(16, 185, 129, ${0.4 + volume * 0.2})`);
      coreGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, reactiveRadius * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Soft vignette on the outer edge
      const edgeVignette = ctx.createRadialGradient(cx, cy, reactiveRadius * 0.7, cx, cy, reactiveRadius);
      edgeVignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      edgeVignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = edgeVignette;
      ctx.beginPath();
      ctx.arc(cx, cy, reactiveRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // Restore clip

      // --- LAYER 5: The Living Glowing White Pill Eyes (..) ---
      // Two vertical rounded capsule eyes right in the core
      ctx.save();
      const eyeSpacing = 16 * (reactiveRadius / baseRadius);
      const eyeWidth = 7.5 * (reactiveRadius / baseRadius);
      const eyeBaseHeight = 19 * (reactiveRadius / baseRadius);
      const eyeHeight = Math.max(2, eyeBaseHeight * eyeState.blinkScale);

      // Eye center coordinates with micro-saccades
      const lookOffsetX = eyeState.lookX * 1.5;
      const lookOffsetY = eyeState.lookY * 1.5;
      const leftEyeX = cx - eyeSpacing / 2 + lookOffsetX;
      const rightEyeX = cx + eyeSpacing / 2 + lookOffsetX;
      const eyeY = cy - 2 + lookOffsetY;

      // Glow around the eyes
      ctx.shadowColor = theme === 'romantic' ? '#f43f5e' : '#34d399';
      ctx.shadowBlur = 12 + volume * 8;
      ctx.fillStyle = '#ffffff';

      // Left Pill Eye
      ctx.beginPath();
      ctx.roundRect(
        leftEyeX - eyeWidth / 2,
        eyeY - eyeHeight / 2,
        eyeWidth,
        eyeHeight,
        eyeWidth / 2
      );
      ctx.fill();

      // Right Pill Eye
      ctx.beginPath();
      ctx.roundRect(
        rightEyeX - eyeWidth / 2,
        eyeY - eyeHeight / 2,
        eyeWidth,
        eyeHeight,
        eyeWidth / 2
      );
      ctx.fill();

      ctx.restore();

      // --- LAYER 6: Audio Sonic Ripple Wave (When user speaks) ---
      if (volume > 0.15 && sessionActive) {
        ctx.save();
        ctx.strokeStyle =
          theme === 'romantic'
            ? `rgba(244, 63, 94, ${volume * 0.6})`
            : `rgba(6, 182, 212, ${volume * 0.6})`;
        ctx.lineWidth = 2 + volume * 3;
        ctx.beginPath();
        const rippleR = reactiveRadius + (pulseTime * 20) % 28;
        ctx.arc(cx, cy, rippleR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [sessionActive, isSpeakingAgent, isProcessingTurn, analyser, theme, eyeState]);

  // State status descriptor
  const getStatusText = () => {
    if (!sessionActive) return 'Tap to start conversation';
    if (isSpeakingAgent) return 'Companion speaking...';
    if (isProcessingTurn) return 'Companion reflecting...';
    if (audioLevel > 0.2) return 'Listening to your voice...';
    return 'Listening quietly...';
  };

  return (
    <div
      ref={containerRef}
      onClick={onTap}
      className="relative flex flex-col items-center justify-center cursor-pointer select-none py-2 group"
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className={`absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full blur-3xl transition-all duration-700 pointer-events-none -z-10 ${
          theme === 'romantic'
            ? 'bg-rose-500/25'
            : isSpeakingAgent
            ? 'bg-sky-500/30'
            : isProcessingTurn
            ? 'bg-purple-500/30'
            : sessionActive
            ? 'bg-emerald-500/25'
            : 'bg-teal-500/15'
        }`}
        style={{
          transform: `scale(${1 + audioLevel * 0.3})`,
        }}
      />

      {/* Floating Levitation Container */}
      <div
        className="relative transition-transform duration-300 ease-out group-hover:scale-103"
        style={{
          animation: 'floatOrb 4.5s ease-in-out infinite',
        }}
      >
        {/* Animated Sonic Rings */}
        {sessionActive && (
          <div
            className={`absolute inset-0 -m-3 rounded-full border transition-opacity duration-300 pointer-events-none ${
              theme === 'romantic'
                ? 'border-rose-400/40'
                : 'border-cyan-400/40'
            }`}
            style={{
              transform: `scale(${1 + audioLevel * 0.22})`,
              opacity: audioLevel > 0.1 ? 0.8 : 0.2,
            }}
          />
        )}

        {/* 60fps Motion Canvas */}
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          className="w-48 h-48 sm:w-56 sm:h-56 rounded-full drop-shadow-2xl"
        />

        {/* Floating Heart Particles in Romantic Theme */}
        {theme === 'romantic' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <span
              className="absolute top-2 left-6 text-rose-400 text-xs opacity-75 animate-bounce"
              style={{ animationDuration: '2.5s' }}
            >
              ♡
            </span>
            <span
              className="absolute bottom-4 right-8 text-rose-500 text-sm opacity-80 animate-pulse"
              style={{ animationDuration: '3s' }}
            >
              ♥
            </span>
          </div>
        )}
      </div>

      {/* Expression / State Subtitle */}
      <div className="mt-3 flex items-center gap-2 text-xs font-mono tracking-wide opacity-80">
        <span
          className={`w-2 h-2 rounded-full transition-colors ${
            !sessionActive
              ? 'bg-stone-400'
              : isSpeakingAgent
              ? 'bg-sky-500 animate-ping'
              : isProcessingTurn
              ? 'bg-purple-500 animate-pulse'
              : audioLevel > 0.18
              ? 'bg-emerald-500 animate-pulse'
              : 'bg-emerald-400'
          }`}
        />
        <span className="font-medium">{getStatusText()}</span>
      </div>

      {/* CSS Floating Keyframes */}
      <style>{`
        @keyframes floatOrb {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(1.5deg);
          }
        }
      `}</style>
    </div>
  );
};
