// src/components/agent/AgentFab.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAgentStore } from '../../store/agentStore.js';
import { useApp } from '../../context/AppContext.jsx';

export default function AgentFab({ frameRef }) {
  const location = useLocation();
  const {
    isOpen,
    openAgent,
    unreadRepliesCount,
    fabPosition,
    setFabPosition,
    fabOpenCount
  } = useAgentStore();
  const { compareList } = useApp();

  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const controls = useAnimation();

  // Route visibility rules (hidden on /support per design rules)
  const isHiddenRoute = (() => {
    const p = location.pathname;
    if (p === '/' || p === '/auth' || p === '/ai' || p.startsWith('/book') || p.startsWith('/dispatch')) {
      return true;
    }
    if (p === '/support' || p === '/support/request' || p === '/support/chat' || p === '/compare') {
      return true;
    }
    return false;
  })();

  // First 3 app opens: show tooltip & soft pulse (respecting prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (fabOpenCount < 3 && !prefersReducedMotion) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [fabOpenCount]);

  // Adjust for CompareTray or StickyCta collision
  const compareTrayVisible = compareList && compareList.ids && compareList.ids.length > 0;
  const collisionShiftY = compareTrayVisible ? -64 : 0;

  // On release: snap to nearest left (12px) or right (12px margin)
  const handleDragStart = (e, info) => {
    setIsDragging(true);
    setShowTooltip(false);
    dragStartPos.current = { x: info.point.x, y: info.point.y };
  };

  const handleDragEnd = (e, info) => {
    setIsDragging(false);
    const movedDistance = Math.hypot(
      info.point.x - dragStartPos.current.x,
      info.point.y - dragStartPos.current.y
    );

    // If movement < 6px, treat as click
    if (movedDistance < 6) {
      openAgent();
      return;
    }

    // Snap to nearest frame edge
    if (frameRef && frameRef.current) {
      const frameRect = frameRef.current.getBoundingClientRect();
      const frameWidth = frameRect.width;
      const fabCenterX = info.point.x - frameRect.left;

      // Nearest horizontal edge
      const snapToRight = fabCenterX > frameWidth / 2;
      const targetX = snapToRight ? 0 : -(frameWidth - 56 - 28); // offset relative to default right: 16px

      const newPos = { x: targetX, y: fabPosition.y + info.offset.y };
      setFabPosition(newPos);

      controls.start({
        x: targetX,
        y: newPos.y,
        transition: { type: 'spring', stiffness: 400, damping: 32 }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openAgent();
    } else if (e.shiftKey) {
      // Shift + Arrows moves FAB by 16px
      let dx = 0;
      let dy = 0;
      if (e.key === 'ArrowLeft') dx = -16;
      if (e.key === 'ArrowRight') dx = 16;
      if (e.key === 'ArrowUp') dy = -16;
      if (e.key === 'ArrowDown') dy = 16;

      if (dx !== 0 || dy !== 0) {
        e.preventDefault();
        const nextPos = { x: fabPosition.x + dx, y: fabPosition.y + dy };
        setFabPosition(nextPos);
      }
    }
  };

  if (isHiddenRoute || isOpen) {
    return null;
  }

  return (
    <div
      className="absolute bottom-[96px] right-4 pointer-events-auto"
      style={{
        zIndex: 45,
        transform: `translateY(${collisionShiftY}px)`,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Tooltip Bubble for first 3 opens */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          className="absolute right-0 bottom-[64px] bg-[#120F11] text-white px-3 py-1.5 rounded-[12px] shadow-lg whitespace-nowrap text-[12px] font-semibold flex items-center gap-1.5 pointer-events-none"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F43F43]" />
          <span>Ask AI · Book or ask anything</span>
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[#120F11] rotate-45" />
        </motion.div>
      )}

      {/* Draggable FAB (52px size) */}
      <motion.button
        type="button"
        drag
        dragConstraints={frameRef}
        dragMomentum={false}
        dragElastic={0.1}
        animate={controls}
        initial={{ x: fabPosition.x, y: fabPosition.y }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={() => {
          if (!isDragging) openAgent();
        }}
        onKeyDown={handleKeyDown}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.08, boxShadow: '0 12px 28px rgba(244, 63, 67, 0.45)' }}
        aria-label="Open AI assistant"
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white ring-2 ring-white focus:outline-none focus:ring-4 focus:ring-[#F43F43] cursor-grab active:cursor-grabbing relative transition-shadow"
        style={{
          background: 'linear-gradient(180deg, #F84146 0%, #EC3A40 100%)',
          boxShadow: '0 8px 20px rgba(244, 63, 67, 0.35)',
          touchAction: 'none'
        }}
      >
        <Sparkles className="w-5 h-5 text-white" />

        {/* Pulse ring animation on first 3 opens */}
        {fabOpenCount < 3 && (
          <span className="absolute inset-0 rounded-full border-2 border-[#F43F43] animate-ping opacity-40 pointer-events-none" />
        )}

        {/* Unread reply dot */}
        {unreadRepliesCount > 0 && (
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center p-0.5">
            <span className="w-full h-full bg-[#120F11] rounded-full animate-pulse" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
