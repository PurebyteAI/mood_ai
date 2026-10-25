/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Emotion = 'happiness' | 'sadness' | 'stress' | 'calmness' | 'anger' | 'curiosity';

export type AcademicContext = 'exam' | 'deadline' | 'group' | 'presentation' | 'general';

export type ResponseType = 'poem' | 'motivation' | 'humor' | 'study_tip' | 'redirect' | 'support';

export type Language = 'en' | 'fr' | 'it' | 'es' | 'zh' | 'de';

export type Theme = 'light' | 'dark' | 'romantic';

export type PreferredStyle = 'study_tip' | 'poem' | 'motivation' | 'humor' | 'surprise';

export type EmotionScores = Record<Emotion, number>;

export type VoiceAgentState =
  | 'GREETING'
  | 'LISTENING'
  | 'REFLECTING'
  | 'EXPLORING'
  | 'REFRAMING'
  | 'ACTION'
  | 'CLOSING'
  | 'SUPPORT';

export interface VoiceMessage {
  id: string;
  sender: 'student' | 'companion';
  text: string;
  state: VoiceAgentState;
  timestamp: number;
}

export interface VoiceTurnResponse {
  agentSpeech: string;
  nextState: VoiceAgentState;
  suggestedActions: string[];
  detectedMood?: string;
  isCrisis?: boolean;
}

export interface SupportResource {
  title: string;
  action: string;
  description: string;
  urgent?: boolean;
}

export interface SessionEntry {
  id: string;
  at: number; // timestamp
  mode: 'write' | 'draw' | 'talk';
  context: AcademicContext;
  emotions: EmotionScores;
  dominant: Emotion;
  responseType: ResponseType;
  responseText: string;
  artPrompt?: string;
  artDataUrl?: string;
  inputPreview?: string; // snippet or drawing thumbnail
  safety?: {
    level: 'none' | 'watch' | 'crisis';
    resources?: SupportResource[];
  };
}

export interface Session {
  id: string; // Anonymous 128-bit id generated in-memory per tab
  entries: SessionEntry[];
}

export interface CampusPreset {
  name: string;
  counseling: string;
  phone: string;
  portalUrl: string;
}

export interface ConfigResponse {
  app: string;
  version: string;
  limits: {
    maxTextChars: number;
    maxDrawingBytes: number;
    analysesPer10Min: number;
    artPerHour: number;
  };
  contextOptions: Array<{ id: AcademicContext; label: string; promptCue: string }>;
  responseStyles: Array<{ id: PreferredStyle; label: string; desc: string }>;
  campus: CampusPreset | null;
  supportResources: SupportResource[];
}

export interface AnalysisResponse {
  emotions: EmotionScores;
  dominant: Emotion;
  response: {
    type: ResponseType;
    text: string;
  };
  art_prompt: string;
  safety: {
    level: 'none' | 'watch' | 'crisis';
    resources?: SupportResource[];
  };
}
