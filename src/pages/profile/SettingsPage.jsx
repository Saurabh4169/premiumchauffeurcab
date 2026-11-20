// src/pages/profile/SettingsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Bell, Sliders, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [language, setLanguage] = useState('en');
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div className="min-h-full pb-28 bg-[#f8f9fb]">
      <div className="sticky top-0 z-30 px-4 h-[52px] bg-white/95 backdrop-blur-md border-b border-slate-200 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200 transition-all cursor-pointer shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-sans font-bold text-[16px] text-slate-900">
          Preferences & Settings
        </h1>
        <div className="w-10" />
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* Language Selection */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-3">
          <h3 className="font-bold text-[14px] text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#F43F43]" />
            <span>Application Language</span>
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'en', label: 'English (US)' },
              { id: 'es', label: 'Español' },
              { id: 'fr', label: 'Français' },
              { id: 'de', label: 'Deutsch' }
            ].map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => {
                  setLanguage(lang.id);
                  showToast(`Language set to ${lang.label}`, 'gold');
                }}
                className={`p-2.5 rounded-xl text-[12px] font-bold border transition-colors cursor-pointer flex items-center justify-between ${
                  language === lang.id
                    ? 'bg-[#111114] text-white border-[#111114]'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <span>{lang.label}</span>
                {language === lang.id && <Check className="w-3.5 h-3.5 text-[#F43F43]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-3">
          <h3 className="font-bold text-[14px] text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#F43F43]" />
            <span>Dispatch Alert Channels</span>
          </h3>
          <div className="space-y-2.5">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="text-[13px] font-bold text-slate-800 block">Push Notifications</span>
                <span className="text-[11px] text-slate-400 block">Flight delays & chauffeur arrival alerts</span>
              </div>
              <input
                type="checkbox"
                checked={pushNotifs}
                onChange={(e) => setPushNotifs(e.target.checked)}
                className="w-5 h-5 rounded accent-[#F43F43]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="text-[13px] font-bold text-slate-800 block">SMS Text Messages</span>
                <span className="text-[11px] text-slate-400 block">Direct driver staging coordinate updates</span>
              </div>
              <input
                type="checkbox"
                checked={smsNotifs}
                onChange={(e) => setSmsNotifs(e.target.checked)}
                className="w-5 h-5 rounded accent-[#F43F43]"
              />
            </label>
          </div>
        </div>

        {/* Accessibility */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-3">
          <h3 className="font-bold text-[14px] text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#F43F43]" />
            <span>Accessibility & Motion</span>
          </h3>
          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
            <div>
              <span className="text-[13px] font-bold text-slate-800 block">Reduced Motion</span>
              <span className="text-[11px] text-slate-400 block">Minimize card animations & transitions</span>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => {
                setReducedMotion(e.target.checked);
                showToast(e.target.checked ? 'Reduced motion enabled' : 'Motion animations enabled', 'gold');
              }}
              className="w-5 h-5 rounded accent-[#F43F43]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
