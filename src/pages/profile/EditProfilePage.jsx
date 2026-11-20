// src/pages/profile/EditProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user, setUser, showToast } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      email,
      phone
    }));
    showToast('Profile updated', 'gold');
    navigate('/profile');
  };

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
          Edit Profile
        </h1>
        <div className="w-10" />
      </div>

      <div className="px-4 pt-4">
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-5 border border-slate-200 space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13px] text-slate-900 font-medium outline-none focus:border-[#F43F43]"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13px] text-slate-900 font-medium outline-none focus:border-[#F43F43]"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
              Mobile Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13px] text-slate-900 font-sans outline-none focus:border-[#F43F43]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#F84146] via-[#F43F43] to-[#EC3A40] text-slate-950 font-bold text-[13px] flex items-center justify-center gap-1.5 shadow-md shadow-[#F43F43]/20 cursor-pointer pt-0.5"
          >
            <span>Save Profile Changes</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
