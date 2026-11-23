// src/pages/profile/EditProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, CheckCircle2, Camera } from 'lucide-react';
import AppHeader from '../../components/AppHeader.jsx';
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
    showToast('Profile updated successfully', 'success');
    navigate('/profile');
  };

  return (
    <div className="min-h-full pb-28 bg-[#F5F5F7]">
      <AppHeader title="Edit Profile" showBack />

      <div className="px-4 pt-4 space-y-4">
        {/* Avatar Showcase */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs text-center space-y-3">
          <div className="relative w-20 h-20 rounded-full bg-slate-900 text-white font-bold text-[22px] flex items-center justify-center mx-auto shadow-md ring-4 ring-slate-100">
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            <button
              type="button"
              onClick={() => showToast('Photo upload tool opened', 'info')}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#F43F43] text-white flex items-center justify-center shadow-md ring-2 ring-white cursor-pointer hover:brightness-110 active:scale-95 transition-all"
              aria-label="Change photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-slate-900">{user.name}</h2>
            <p className="text-[11.5px] text-slate-400">Personal & Corporate Passenger Account</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs space-y-3.5">
          <div>
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Full Legal Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13.5px] text-slate-900 font-medium outline-none focus:border-[#F43F43] focus:bg-white transition-all"
              required
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13.5px] text-slate-900 font-medium outline-none focus:border-[#F43F43] focus:bg-white transition-all"
              required
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>Mobile Phone Number</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-3.5 text-[13.5px] text-slate-900 font-sans outline-none focus:border-[#F43F43] focus:bg-white transition-all"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 rounded-full bg-gradient-to-r from-[#F43F43] to-[#DC2626] text-white font-bold text-[13.5px] flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Save Profile Changes</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
