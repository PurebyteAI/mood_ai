/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnalysisResponse, ConfigResponse, AcademicContext, PreferredStyle } from '../types';

// Anonymous 128-bit session ID generated in memory (never saved to database)
let inMemorySessionId: string | null = null;
export function getSessionId(): string {
  if (!inMemorySessionId) {
    inMemorySessionId = 'tab_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  return inMemorySessionId;
}

// Ephemeral bot-check token generated client-side
function getBotToken(): string {
  return 'token_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
}

function getDefaultHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'X-Session-Id': getSessionId(),
    'X-Bot-Token': getBotToken(),
    'Accept-Language': navigator.language || 'en',
  };
}

export async function fetchAppConfig(campusSlug?: string): Promise<ConfigResponse> {
  const query = campusSlug ? `?campus=${encodeURIComponent(campusSlug)}` : '';
  const res = await fetch(`/api/v1/config${query}`, {
    headers: getDefaultHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to load mirror configuration');
  }
  return res.json();
}

export async function analyzeText(
  text: string,
  context: AcademicContext,
  preferredStyle: PreferredStyle,
  language: string = 'en'
): Promise<AnalysisResponse> {
  const res = await fetch('/api/v1/analyze/text', {
    method: 'POST',
    headers: getDefaultHeaders(),
    body: JSON.stringify({
      text,
      context,
      language: language || 'en',
      preferredStyle,
    }),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    const message = errorJson.error?.message || 'The Mirror could not process your reflection. Please try again.';
    throw new Error(message);
  }

  return res.json();
}

export async function analyzeDrawing(
  drawingDataUrl: string,
  context: AcademicContext,
  preferredStyle: PreferredStyle,
  language: string = 'en'
): Promise<AnalysisResponse> {
  const res = await fetch('/api/v1/analyze/drawing', {
    method: 'POST',
    headers: getDefaultHeaders(),
    body: JSON.stringify({
      drawing: drawingDataUrl,
      context,
      language: language || 'en',
      preferredStyle,
    }),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    const message = errorJson.error?.message || 'Could not interpret sketch. Please try again.';
    throw new Error(message);
  }

  return res.json();
}

export async function generateMoodArt(artPrompt: string): Promise<string | null> {
  const res = await fetch('/api/v1/art', {
    method: 'POST',
    headers: getDefaultHeaders(),
    body: JSON.stringify({
      art_prompt: artPrompt,
    }),
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.imageDataUrl || null;
}

export async function synthesizeVoice(text: string): Promise<string | null> {
  try {
    const res = await fetch('/api/v1/voice/synthesize', {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify({
        text,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.audioDataUrl || null;
  } catch {
    return null;
  }
}

export async function sendVoiceTurn(params: {
  conversationHistory: Array<{ role: 'student' | 'companion'; text: string; state?: string }>;
  studentSpeech: string;
  currentState: import('../types').VoiceAgentState;
  context: AcademicContext;
  language: import('../types').Language;
}): Promise<import('../types').VoiceTurnResponse> {
  const res = await fetch('/api/v1/voice/turn', {
    method: 'POST',
    headers: getDefaultHeaders(),
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.error?.message || 'Voice turn failed');
  }

  return res.json();
}

