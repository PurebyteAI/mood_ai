/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, ShieldCheck, Lock, Database, Trash2, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="text-base font-bold text-stone-900">Zero-Data Architecture & Privacy</h2>
              <p className="text-xs text-stone-500">How we protect your vulnerability by storing nothing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700 leading-relaxed">
          <div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-2">
              <Database className="w-4 h-4 text-stone-500" />
              1. The Backend Keeps No State
            </h3>
            <p>
              Unlike traditional journaling or wellness apps, our servers have <strong>no database, no disk files, and no persistent caches</strong> for user input. Your typed words, sketches, or voice snippets exist only in memory during the few seconds required to process the AI reflection.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-2">
              <Lock className="w-4 h-4 text-stone-500" />
              2. Strict Allow-List Logging
            </h3>
            <p>
              Standard server logs record URLs and headers. Our custom logging middleware strictly filters out request bodies, sketches, transcripts, and IP addresses. The only data logged is a random 8-character request ID, endpoint path, HTTP status, and response latency.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-stone-500" />
              3. Ephemeral Browser Tab Memory
            </h3>
            <p>
              Your session history (the trend chart, past reflections, and generated mood art) is stored strictly in client-side RAM for the active browser tab. <strong>The moment you close the tab or hit "Clear Session", everything is instantly and permanently destroyed.</strong>
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm text-stone-900 mb-1.5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-stone-500" />
              4. Client-Side Offline Exports
            </h3>
            <p>
              When you download a Mood Card PNG or export your session summary as a PDF, the rendering happens entirely inside your browser using HTML5 Canvas and offline PDF generation. Neither export sends data back to any server.
            </p>
          </div>

          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <h4 className="font-semibold text-stone-900 mb-1">Academic Well-Being Scope</h4>
            <p className="text-stone-600">
              AI Mood Mirror is strictly intended for adults (18+) experiencing the standard friction of academic life (exams, presentations, team projects). It does not provide medical treatment, psychotherapy, or clinical diagnoses.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
