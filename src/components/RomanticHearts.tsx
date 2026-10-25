/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';

interface RomanticHeartsProps {
  active: boolean;
}

export const RomanticHearts: React.FC<RomanticHeartsProps> = ({ active }) => {
  if (!active) return null;

  // Generate 18 gentle floating hearts with varying sizes, speeds, and positions
  const hearts = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98%
      size: Math.random() * 16 + 12, // 12px to 28px
      duration: Math.random() * 12 + 10, // 10s to 22s
      delay: Math.random() * 8, // 0s to 8s
      opacity: Math.random() * 0.35 + 0.15,
      symbol: i % 3 === 0 ? '💖' : i % 3 === 1 ? '🌸' : '♡',
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      <style>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(105vh) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: var(--target-opacity);
          }
          85% {
            opacity: var(--target-opacity);
          }
          100% {
            transform: translateY(-10vh) scale(1.15) rotate(20deg);
            opacity: 0;
          }
        }
      `}</style>
      {hearts.map((h) => (
        <span
          key={h.id}
          style={
            {
              position: 'absolute',
              left: `${h.left}%`,
              bottom: '-50px',
              fontSize: `${h.size}px`,
              animation: `floatHeart ${h.duration}s infinite linear`,
              animationDelay: `${h.delay}s`,
              '--target-opacity': h.opacity,
              filter: 'drop-shadow(0 2px 4px rgba(244, 63, 94, 0.2))',
            } as any
          }
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
};
