// src/pages/SplashPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Plane, Users, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Button from '../components/common/Button.jsx';

export default function SplashPage() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-dismiss splash screen after 1.8s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const slides = [
    {
      id: 1,
      badge: 'Fixed Written Quotes',
      title: 'Flat-Rate. All-In.',
      italicAccent: 'Zero Surprises.',
      description: 'Tolls, parking, staging wait time and chauffeur gratuity are 100% included in your written quote. No meters, no peak surge pricing.',
      icon: ShieldCheck,
      perk: 'All-inclusive written guarantee'
    },
    {
      id: 2,
      badge: 'Precision Aviation Radar',
      title: 'Flight-Tracked.',
      italicAccent: 'Buffer Guaranteed.',
      description: "Our Lombard dispatch team monitors your incoming flight radar in real time. 60 min complimentary wait domestic, 90 min international.",
      icon: Plane,
      perk: 'Complimentary 60m gate wait'
    },
    {
      id: 3,
      badge: 'Lombard HQ Dispatch',
      title: 'Real People.',
      italicAccent: 'Every Call.',
      description: '24/7 dispatch answered by real logistics coordinators. Background-checked, professionally suited executive chauffeurs dispatched with buffer time.',
      icon: Users,
      perk: 'The car is there before you are'
    }
  ];

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-[#f8f9fb] text-slate-900 relative overflow-hidden">
      {/* Decorative ambient subtle circle */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-red-100/30 blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {showSplash ? (
          /* Splash Screen */
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex-1 flex flex-col items-center justify-center text-center my-auto py-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 rounded-3xl bg-slate-900 p-0.5 shadow-2xl mb-6 flex items-center justify-center"
            >
              <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center">
                <Sparkles className="w-9 h-9 text-[#F43F43] animate-pulse" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-slate-500 block mb-2 font-bold">
                Lombard • Chicago • New York • Miami • LA
              </span>
              <h1 className="text-[28px] leading-[32px] font-display font-semibold text-[#101417] tracking-tight">
                Premium Chauffeur
              </h1>
              <p className="italic text-[#F43F43] font-display text-[16px] mt-1 font-semibold">
                "The car is there before you are."
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* Onboarding 3-Slide Carousel */
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col justify-between py-4"
          >
            {/* Top Bar: Skip button */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                Premium Chauffeur Services
              </span>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="text-[13px] text-slate-500 hover:text-slate-900 font-medium transition-colors cursor-pointer"
              >
                Skip
              </button>
            </div>

            {/* Slide Hero Graphic & Content */}
            <div className="my-auto py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Hero Graphic Card with Vehicle Image */}
                  <div className="w-full max-w-[280px] h-40 rounded-3xl bg-white border border-slate-200/80 p-3 shadow-md flex items-center justify-center mb-6 relative overflow-hidden">
                    <img
                      src="/fleet/bmw-m550i.webp"
                      alt="Chauffeured Luxury"
                      onError={(e) => {
                        e.currentTarget.src = '/fleet/mercedes-s-class.webp';
                      }}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-red-50 text-[#F43F43] flex items-center justify-center">
                      {React.createElement(slides[currentSlide].icon, {
                        className: 'w-4 h-4'
                      })}
                    </div>
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-3 border border-slate-200">
                    {slides[currentSlide].badge}
                  </span>

                  <h2 className="text-[28px] leading-[32px] font-display font-semibold text-[#101417] mb-2">
                    {slides[currentSlide].title}{' '}
                    <span className="text-[#F43F43] italic font-display block">
                      {slides[currentSlide].italicAccent}
                    </span>
                  </h2>

                  <p className="text-[14px] text-[#6B7075] max-w-[320px] leading-[20px] mb-4 font-normal">
                    {slides[currentSlide].description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{slides[currentSlide].perk}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Controls: Dots & Navigation Button */}
            <div className="mt-4 space-y-3">
              {/* Slide Dots Indicator */}
              <div className="flex justify-center items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === index
                        ? 'w-7 bg-[#F43F43]'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {currentSlide < slides.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(prev => prev + 1)}
                    className="w-full h-12 btn-primary rounded-[14px] font-semibold text-[15px] text-[#101417] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate('/auth')}
                    className="w-full h-12 btn-primary rounded-[14px] font-semibold text-[15px] text-[#101417] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="w-full py-2.5 text-center text-[13px] font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Explore as Guest
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
