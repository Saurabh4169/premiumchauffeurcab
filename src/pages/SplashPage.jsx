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

  // Auto-dismiss splash screen after 2.2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);
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
    <div className="min-h-full flex flex-col justify-between p-6 bg-white text-slate-900 relative overflow-hidden">
      {/* Decorative ambient subtle circle */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#BE8A44]/10 blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {showSplash ? (
          /* Splash Screen */
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex-1 flex flex-col items-center justify-center text-center my-auto py-16 px-4"
          >
            {/* Official Company Logo */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[310px] mb-6 flex flex-col items-center justify-center relative"
            >
              {/* Soft luxury ambient glow behind the logo */}
              <div className="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full pointer-events-none scale-125" />
              
              <img
                src="/company-logo.png"
                alt="Premium Chauffeur's Nationwide Transportation Services"
                className="w-full h-auto object-contain drop-shadow-sm relative z-10"
              />
            </motion.div>

            {/* Nationwide Operating Hubs & Motto */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="space-y-2 relative z-10"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="h-[1px] w-6 bg-[#BE8A44]/40" />
                <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#555555] font-bold">
                  Lombard • Chicago • New York • Miami • LA
                </span>
                <span className="h-[1px] w-6 bg-[#BE8A44]/40" />
              </div>

              <p className="italic text-[#BE8A44] font-display text-[15px] font-semibold">
                "The car is there before you are."
              </p>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#555555] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>24/7 Lombard Dispatch · Fixed Written Quotes</span>
              </div>
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
            {/* Top Bar: Official Logo & Skip button */}
            <div className="flex justify-between items-center mb-4">
              <img
                src="/company-logo.png"
                alt="Premium Chauffeur"
                className="h-6 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="text-[13px] text-slate-500 hover:text-slate-900 font-semibold transition-colors cursor-pointer"
              >
                Skip
              </button>
            </div>

            {/* Slide Hero Graphic & Content (Cardless Premium Showcase) */}
            <div className="my-auto py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Cardless Floating Luxury Vehicle Showcase */}
                  <div className="relative w-full max-w-[340px] h-44 flex items-center justify-center mb-4 select-none">
                    {/* Ambient subtle warm backlight */}
                    <div className="absolute inset-0 bg-radial from-[#BE8A44]/15 via-amber-500/5 to-transparent blur-2xl rounded-full scale-110 pointer-events-none" />

                    {/* Floating S-Class Cutout */}
                    <motion.img
                      key={currentSlide}
                      initial={{ scale: 0.94, opacity: 0, x: 20 }}
                      animate={{ scale: 1, opacity: 1, x: 0 }}
                      exit={{ scale: 0.94, opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      src="/onboarding-car.png"
                      alt="Flagship Mercedes-Benz S-Class"
                      className="w-full max-h-[175px] object-contain drop-shadow-[0_16px_20px_rgba(0,0,0,0.20)] relative z-10"
                    />

                    {/* Floor contact shadow */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-3 bg-black/15 blur-md rounded-full pointer-events-none" />
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-white text-[10.5px] font-bold text-[#120F11] uppercase tracking-wider mb-2.5 border border-[#E2E2E2] shadow-2xs">
                    {slides[currentSlide].badge}
                  </span>

                  <h2 className="text-[26px] leading-[30px] font-display font-semibold text-[#120F11] mb-2">
                    {slides[currentSlide].title}{' '}
                    <span className="text-[#BE8A44] italic font-display block">
                      {slides[currentSlide].italicAccent}
                    </span>
                  </h2>

                  <p className="text-[13.5px] text-[#555555] max-w-[330px] leading-[19px] mb-3.5 font-normal">
                    {slides[currentSlide].description}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11.5px] font-bold">
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
                        ? 'w-7 bg-[#BE8A44]'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Action Buttons (Signature Red Gradient) */}
              <div className="space-y-2">
                {currentSlide < slides.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(prev => prev + 1)}
                    className="w-full h-12 rounded-[16px] bg-gradient-to-r from-[#BE8A44] to-[#A97633] hover:from-[#BE8A44] hover:to-[#A97633] active:scale-[0.98] text-white text-[15px] font-bold flex items-center justify-center gap-2 shadow-md shadow-[#BE8A44]/25 transition-all cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="w-full h-12 rounded-[16px] bg-gradient-to-r from-[#BE8A44] to-[#A97633] hover:from-[#BE8A44] hover:to-[#A97633] active:scale-[0.98] text-white text-[15px] font-bold flex items-center justify-center gap-2 shadow-md shadow-[#BE8A44]/25 transition-all cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="w-full py-2.5 text-center text-[13px] font-bold text-[#555555] hover:text-[#120F11] transition-colors cursor-pointer"
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
