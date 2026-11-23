// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export default function AuthPage() {
  const navigate = useNavigate();
  const { setUser, showToast } = useApp();

  const [mode, setMode] = useState('register'); // 'register' | 'login'
  const [email, setEmail] = useState('brayanrichard@gmai.com');
  const [password, setPassword] = useState('LuxuryChauffeur2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Compute password strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { label: 'Empty', score: 0, color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { label: 'Weak', score: 1, color: 'bg-red-400' };
    if (score === 2 || score === 3) return { label: 'Fair', score: 2, color: 'bg-amber-400' };
    return { label: 'Strong', score: 3, color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms && mode === 'register') {
      showToast('Please agree to the Terms of Service to continue', 'error');
      return;
    }

    setUser(prev => ({
      ...prev,
      isAuthenticated: true,
      email: email,
      name: email.split('@')[0].replace('.', ' ')
    }));

    showToast(mode === 'register' ? 'Account created successfully!' : 'Welcome back!', 'success');
    navigate('/home');
  };

  const handleGuest = () => {
    setUser(prev => ({
      ...prev,
      isAuthenticated: false,
      name: 'Guest Passenger',
      email: 'guest@meridian.com'
    }));
    showToast('Browsing as Guest. You can still request fixed quotes.', 'gold');
    navigate('/home');
  };

  return (
    <div className="min-h-full px-4 py-4 flex flex-col justify-between bg-white relative">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 flex items-center justify-center text-[#120F11] border border-[#E2E2E2] transition-all cursor-pointer shadow-xs"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
            className="text-[13px] font-semibold text-[#BE8A44] hover:underline cursor-pointer"
          >
            {mode === 'register' ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        {/* Playfair Display Headline (Display 28/32, gold accent, no red) */}
        <div className="mb-3">
          <h1 className="text-[28px] leading-[32px] font-display font-semibold text-[#120F11] tracking-tight">
            {mode === 'register' ? (
              <>
                Let's create <br />
                <span className="text-[#BE8A44] italic">your account</span>
              </>
            ) : (
              <>
                Welcome back, <br />
                <span className="text-[#BE8A44] italic">sign in</span>
              </>
            )}
          </h1>
          <p className="text-[13px] text-[#555555] mt-1 font-medium leading-[18px]">
            Get started and hit the road with premium chauffeur services.
          </p>
        </div>

        {/* Hero Illustration / Car Showcase */}
        <div className="h-32 w-full rounded-[16px] bg-white border border-[#E2E2E2] shadow-xs my-3 flex items-center justify-center relative overflow-hidden p-2">
          <img
            src="/fleet/luxury-red-sedan.webp"
            alt="Luxury Chauffeur Sedan"
            onError={(e) => {
              e.currentTarget.src = '/fleet/mercedes-s-class.webp';
            }}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Form Fields (Inputs 48px high, radius 14) */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email input */}
          <div>
            <label className="text-[12px] font-semibold text-[#120F11] block mb-1">
              Email address
            </label>
            <div className="relative flex items-center h-12 rounded-[14px] px-3.5 border border-[#E2E2E2] bg-white shadow-xs focus-within:border-[var(--accent)] transition-all">
              <Mail className="w-4 h-4 text-[#555555] mr-2.5 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-transparent text-[#120F11] placeholder:text-[#555555] text-[15px] outline-none font-medium"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="text-[12px] font-semibold text-[#120F11] block mb-1">
              Password
            </label>
            <div className="relative flex items-center h-12 rounded-[14px] px-3.5 border border-[#E2E2E2] bg-white shadow-xs focus-within:border-[var(--accent)] transition-all">
              <Lock className="w-4 h-4 text-[#555555] mr-2.5 shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent text-[#120F11] placeholder:text-[#555555] text-[15px] outline-none font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Password Strength Meter */}
          {mode === 'register' && (
            <div className="pt-0.5">
              <div className="flex items-center justify-between text-[11px] mb-1 px-1 font-medium">
                <span className="text-[#555555]">Password strength</span>
                <span className={`font-semibold ${
                  strength.label === 'Strong' ? 'text-emerald-600' : strength.label === 'Fair' ? 'text-[var(--accent)]' : 'text-red-500'
                }`}>
                  {strength.label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 h-1 w-full">
                <div className={`rounded-full transition-all duration-300 ${strength.score >= 1 ? strength.color : 'bg-slate-200'}`} />
                <div className={`rounded-full transition-all duration-300 ${strength.score >= 2 ? strength.color : 'bg-slate-200'}`} />
                <div className={`rounded-full transition-all duration-300 ${strength.score >= 3 ? strength.color : 'bg-slate-200'}`} />
              </div>
            </div>
          )}

          {/* Terms Checkbox */}
          {mode === 'register' && (
            <div className="pt-1 flex items-start gap-2">
              <button
                type="button"
                onClick={() => setAgreeTerms(!agreeTerms)}
                className={`w-4.5 h-4.5 rounded-[6px] flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                  agreeTerms
                    ? 'bg-[#120F11] text-white'
                    : 'border border-slate-300 bg-white'
                }`}
                aria-label="Agree to terms"
              >
                {agreeTerms && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
              <p className="text-[12px] text-[#555555] leading-snug">
                By continuing you agree to the <span className="text-[#120F11] font-semibold underline">Terms of Service</span> and <span className="text-[#120F11] font-semibold underline">Privacy Policy</span>.
              </p>
            </div>
          )}

          {/* Primary Submit Button (48px high, radius 14, text 15/600) */}
          <div className="pt-2">
            <button
              type="submit"
              className="btn-primary w-full h-12 rounded-[14px] flex items-center justify-center gap-2 text-[15px] font-semibold text-[#120F11] cursor-pointer"
            >
              <span>{mode === 'register' ? 'Sign Up' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </form>

        {/* OR Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-[#E2E2E2]" />
          <span className="text-[11px] font-semibold text-[#555555] uppercase tracking-[0.04em]">OR</span>
          <div className="flex-1 h-px bg-[#E2E2E2]" />
        </div>

        {/* Social Buttons (44px high) */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleGuest}
            className="h-11 rounded-[14px] bg-white border border-[#E2E2E2] shadow-xs flex items-center justify-center gap-2 text-[13px] font-semibold text-[#120F11] hover:bg-slate-50 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={handleGuest}
            className="h-11 rounded-[14px] bg-white border border-[#E2E2E2] shadow-xs flex items-center justify-center gap-2 text-[13px] font-semibold text-[#120F11] hover:bg-slate-50 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 fill-[#120F11]" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.74 1.02-1.77.91-2.8-.88.04-1.95.59-2.58 1.33-.56.64-.99 1.69-.86 2.7.99.08 1.92-.49 2.53-1.23z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>
      </div>

      {/* Guest bypass */}
      <div className="pt-3 text-center">
        <button
          type="button"
          onClick={handleGuest}
          className="text-[13px] font-semibold text-[#555555] hover:text-[var(--accent)] transition-colors cursor-pointer"
        >
          Continue as Guest &rarr;
        </button>
      </div>
    </div>
  );
}
