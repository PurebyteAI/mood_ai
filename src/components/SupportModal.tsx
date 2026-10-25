/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SupportResource, CampusPreset } from '../types';
import { X, Phone, HeartHandshake, ExternalLink, ShieldAlert } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  campus: CampusPreset | null;
  resources: SupportResource[];
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  campus,
  resources,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-amber-50/70 border-b border-amber-200/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HeartHandshake className="w-5 h-5 text-amber-800" />
            <div>
              <h2 className="text-base font-bold text-stone-900">Student Support & Helplines</h2>
              <p className="text-xs text-stone-500">Free, confidential assistance available 24/7</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-100">
            <strong>Important note:</strong> AI Mood Mirror is a reflective tool for daily academic stressors, not clinical diagnosis or medical care. If you are experiencing overwhelming panic, depressive episodes, or thoughts of self-harm, please connect with real human support immediately.
          </div>

          {campus && (
            <div className="p-4 rounded-xl bg-amber-100/50 border border-amber-200">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800">
                Your Campus Support
              </div>
              <h3 className="font-bold text-stone-900 text-sm mt-0.5">{campus.counseling}</h3>
              <p className="text-xs text-stone-700 mt-1">Direct student mental health hotline:</p>
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={`tel:${campus.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-3 py-1.5 bg-stone-900 text-white font-semibold text-xs rounded-lg inline-flex items-center gap-1.5 hover:bg-stone-800"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {campus.phone}
                </a>
                {campus.portalUrl && (
                  <a
                    href={campus.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-white border border-stone-300 text-stone-700 font-semibold text-xs rounded-lg inline-flex items-center gap-1 hover:bg-stone-50"
                  >
                    <span>Campus Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              National & Global Hotlines
            </div>

            {resources.map((res, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-stone-900">{res.title}</h4>
                  <span className="text-xs font-mono font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                    {res.action}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1 leading-snug">{res.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
