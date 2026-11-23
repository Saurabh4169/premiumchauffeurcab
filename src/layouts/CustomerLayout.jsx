// src/layouts/CustomerLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomTabBar from '../components/BottomTabBar.jsx';
import ToastContainer from '../components/common/Toast.jsx';

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-white text-[#12100F] relative overflow-x-hidden flex flex-col justify-center items-center py-0 md:py-6 antialiased">
      {/* Toast notifications container */}
      <ToastContainer />

      {/* Centered Phone Simulator (Max 430px, calibrated for 390px viewport) */}
      <div className="w-full min-h-screen md:min-h-[880px] md:max-h-[920px] max-w-[430px] bg-[#FAF5ED] md:rounded-[50px] md:border-[10px] md:border-[#120F11] md:shadow-[0_25px_70px_rgba(0,0,0,0.12),0_10px_25px_rgba(0,0,0,0.06)] flex flex-col relative overflow-hidden ring-1 ring-black/5">
        {/* Screen Content Scroll Area (96px padding bottom to clear 64px tab bar + 8px margin + safe area) */}
        <main className="flex-1 overflow-y-auto pb-24 relative bg-[#FAF5ED]">
          <Outlet />
        </main>

        {/* Floating Glass Bottom Tab Bar */}
        <BottomTabBar />

        {/* iOS Home Indicator Bar */}
        <div className="w-full py-1.5 flex justify-center shrink-0 z-40 bg-transparent pointer-events-none">
          <div className="w-32 h-1 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
