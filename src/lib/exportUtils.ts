/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import { SessionEntry, Emotion } from '../types';

export const EMOTION_COLORS: Record<Emotion, string> = {
  happiness: '#f59e0b', // warm amber
  sadness: '#64748b',   // slate blue
  stress: '#f43f5e',    // coral rose
  calmness: '#0ea5e9',  // serene sky
  anger: '#ea580c',     // warm terracotta
  curiosity: '#10b981', // emerald sage
};

export const EMOTION_LABELS: Record<Emotion, string> = {
  happiness: 'Happiness',
  sadness: 'Sadness',
  stress: 'Academic Stress',
  calmness: 'Calmness',
  anger: 'Frustration / Anger',
  curiosity: 'Curiosity / Drive',
};

/**
 * Renders an offscreen high-res PNG card of a single reflection result and initiates download.
 */
export async function exportMoodCardPng(entry: SessionEntry): Promise<void> {
  const canvas = document.createElement('canvas');
  const scale = 2; // High DPI
  const width = 640;
  const height = 820;

  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.scale(scale, scale);

  // Background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#fcfbf7');
  gradient.addColorStop(1, '#f5f3ef');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Subtle border
  ctx.strokeStyle = '#e7e5e4';
  ctx.lineWidth = 1;
  ctx.strokeRect(16, 16, width - 32, height - 32);

  // Brand Header
  ctx.fillStyle = '#78716c';
  ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('AI MOOD MIRROR FOR STUDENTS', 36, 52);

  const dateStr = new Date(entry.at).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  ctx.textAlign = 'right';
  ctx.fillText(dateStr, width - 36, 52);
  ctx.textAlign = 'left';

  // Divider
  ctx.strokeStyle = '#e7e5e4';
  ctx.beginPath();
  ctx.moveTo(36, 68);
  ctx.lineTo(width - 36, 68);
  ctx.stroke();

  // Context & Dominant Mood
  ctx.fillStyle = '#44403c';
  ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Context: ${entry.context.toUpperCase()} · Mode: ${entry.mode.toUpperCase()}`, 36, 96);

  ctx.fillStyle = '#1c1917';
  ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Mirror's Reading: ${EMOTION_LABELS[entry.dominant]}`, 36, 130);

  // Emotion Bars
  const emotions: Emotion[] = ['stress', 'calmness', 'sadness', 'curiosity', 'happiness', 'anger'];
  let startY = 160;
  const barWidth = width - 72;

  emotions.forEach((emo) => {
    const score = entry.emotions[emo] || 0;
    ctx.fillStyle = '#57534e';
    ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(EMOTION_LABELS[emo], 36, startY + 12);

    ctx.textAlign = 'right';
    ctx.font = '600 12px "IBM Plex Mono", monospace';
    ctx.fillText(`${Math.round(score)}%`, width - 36, startY + 12);
    ctx.textAlign = 'left';

    // Bar background
    ctx.fillStyle = '#e7e5e4';
    ctx.beginPath();
    ctx.roundRect(36, startY + 18, barWidth, 6, 3);
    ctx.fill();

    // Bar fill
    ctx.fillStyle = EMOTION_COLORS[emo];
    ctx.beginPath();
    const fillW = Math.max(4, (barWidth * score) / 100);
    ctx.roundRect(36, startY + 18, fillW, 6, 3);
    ctx.fill();

    startY += 36;
  });

  // Reflection Text Box
  startY += 10;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#e7e5e4';
  ctx.beginPath();
  ctx.roundRect(36, startY, barWidth, 140, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#a8a29e';
  ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`REFLECTION (${entry.responseType.toUpperCase()}):`, 52, startY + 26);

  ctx.fillStyle = '#292524';
  ctx.font = 'italic 14px "Plus Jakarta Sans", sans-serif';
  
  // Wrap reflection text
  const words = entry.responseText.split(' ');
  let line = '';
  let lineY = startY + 50;
  const maxLineWidth = barWidth - 32;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxLineWidth && i > 0) {
      ctx.fillText(line, 52, lineY);
      line = words[i] + ' ';
      lineY += 22;
      if (lineY > startY + 125) break;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 52, lineY);

  // If art exists, draw thumbnail or art box
  startY += 160;
  if (entry.artDataUrl) {
    try {
      const img = new Image();
      img.src = entry.artDataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(36, startY, 140, 140, 8);
      ctx.clip();
      ctx.drawImage(img, 36, startY, 140, 140);
      ctx.restore();

      ctx.fillStyle = '#44403c';
      ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Generated Mood Art', 190, startY + 30);

      ctx.fillStyle = '#78716c';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Abstract emotional wavelength visualization', 190, startY + 52);
    } catch {
      // fallback if art drawing fails
    }
  }

  // Footer Note
  ctx.fillStyle = '#a8a29e';
  ctx.font = '11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Client-side export · Zero user data saved on server · Reflection only, not diagnostic', 36, height - 32);

  // Trigger download
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `mood-mirror-reflection-${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}

/**
 * Builds an offline client-side PDF of all reflections in this visit.
 */
export function exportSessionPdf(entries: SessionEntry[], campusName?: string): void {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'letter',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 50;

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(30, 41, 59);
  doc.text('AI Mood Mirror for Students - Session Summary', 40, y);

  y += 20;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Exported: ${new Date().toLocaleString()} · ${campusName ? `Campus: ${campusName} · ` : ''}Stateless Session (${entries.length} reflections)`,
    40,
    y
  );

  y += 10;
  doc.setDrawColor(226, 232, 240);
  doc.line(40, y, pageWidth - 40, y);
  y += 24;

  if (entries.length === 0) {
    doc.setFontSize(12);
    doc.text('No reflections recorded in this session.', 40, y);
    doc.save('mood-mirror-session.pdf');
    return;
  }

  entries.forEach((entry, idx) => {
    // Check if new page needed
    if (y > 660) {
      doc.addPage();
      y = 50;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(
      `#${idx + 1}. [${entry.context.toUpperCase()}] Mode: ${entry.mode.toUpperCase()} · ${new Date(entry.at).toLocaleTimeString()}`,
      40,
      y
    );

    y += 16;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    doc.text(
      `Dominant Mood: ${EMOTION_LABELS[entry.dominant]} | Stress: ${entry.emotions.stress}% | Calmness: ${entry.emotions.calmness}% | Curiosity: ${entry.emotions.curiosity}%`,
      40,
      y
    );

    y += 16;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10.5);
    doc.setTextColor(71, 85, 105);

    const splitText = doc.splitTextToSize(`"${entry.responseText}"`, pageWidth - 80);
    doc.text(splitText, 40, y);
    y += splitText.length * 14 + 14;

    doc.setDrawColor(241, 245, 249);
    doc.line(40, y, pageWidth - 40, y);
    y += 18;
  });

  // Footer note
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Notice: AI Mood Mirror is an academic self-reflection tool, not medical or clinical advice. All data wiped on tab close.',
    40,
    760
  );

  doc.save(`mood-mirror-session-${Date.now()}.pdf`);
}
