// src/layouts/AppShell.jsx
import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import BottomTabBar from '../components/BottomTabBar.jsx';
import CompareTray from '../components/CompareTray.jsx';
import ToastContainer from '../components/common/Toast.jsx';
import AgentFab from '../components/agent/AgentFab.jsx';
import AgentSheet from '../components/agent/AgentSheet.jsx';

export default function AppShell() {
  const frameRef = useRef(null);

  return (
    <div className="shell-backdrop">
      <div id="app-frame" className="app-frame" ref={frameRef}>
        {/* Scroll area where all customer routes render */}
        <div id="app-scroll" className="app-scroll">
          <Outlet />
        </div>

        {/* Tab bar and sticky CTA bars render here */}
        <div id="app-bars">
          <BottomTabBar />
        </div>

        {/* Floating AI Assistant (FAB) */}
        <AgentFab frameRef={frameRef} />

        {/* Compare Tray (appears above tab bar when items are selected) */}
        <CompareTray />

        {/* Overlay Root where sheets, dialogs, toasts, and popovers render */}
        <div id="app-overlay-root" />

        {/* Floating AI Assistant Chat Sheet */}
        <AgentSheet />

        {/* Toasts Container */}
        <ToastContainer />

        {/* Home Indicator (only on desktop preview) */}
        <div className="home-indicator" aria-hidden="true" />
      </div>
    </div>
  );
}
