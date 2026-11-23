// src/pages/profile/SettingsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Bell, Sliders, Check } from 'lucide-react';
import AppHeader from '../../components/AppHeader.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [language, setLanguage] = useState('en');
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div className="min-h-full pb-28 bg-[#F5F5F7]">
      <AppHeader title="Settings" showBack />

      <div className="px-4 pt-4 space-y-4">
        {/* Language Selection */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="font-bold text-[13.5px] text-slate-900 flex items-center gap-2">
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
                  showToast(`Language set to ${lang.label}`, 'success');
                }}
                className={`p-2.5 rounded-xl text-[12px] font-bold border transition-colors cursor-pointer flex items-center justify-between ${
                  language === lang.id
                    ? 'bg-[#101417] text-white border-[#101417]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{lang.label}</span>
                {language === lang.id && <Check className="w-3.5 h-3.5 text-[#F43F43]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="font-bold text-[13.5px] text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#F43F43]" />
            <span>Dispatch Alert Channels</span>
          </h3>
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div>
                <span className="text-[13px] font-bold text-slate-800 block">Push Notifications</span>
                <span className="text-[11px] text-slate-400 block">Flight delays & chauffeur arrival alerts</span>
              </div>
              <input
                type="checkbox"
                checked={pushNotifs}
                onChange={(e) => setPushNotifs(e.target.checked)}
                className="w-4.5 h-4.5 rounded accent-[#F43F43] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
              <div>
                <span className="text-[13px] font-bold text-slate-800 block">SMS Text Messages</span>
                <span className="text-[11px] text-slate-400 block">Direct driver staging coordinate updates</span>
              </div>
              <input
                type="checkbox"
                checked={smsNotifs}
                onChange={(e) => setSmsNotifs(e.target.checked)}
                className="w-4.5 h-4.5 rounded accent-[#F43F43] cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Accessibility */}
        <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="font-bold text-[13.5px] text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#F43F43]" />
            <span>Accessibility & Motion</span>
          </h3>
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/70 transition-colors">
            <div>
              <span className="text-[13px] font-bold text-slate-800 block">Reduced Motion</span>
              <span className="text-[11px] text-slate-400 block">Minimize card animations & transitions</span>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => {
                setReducedMotion(e.target.checked);
                showToast(e.target.checked ? 'Reduced motion enabled' : 'Motion animations enabled', 'success');
              }}
              className="w-4.5 h-4.5 rounded accent-[#F43F43] cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
