// src/components/common/GlassCard.jsx
import React from 'react';

export default function GlassCard({
  children,
  className = '',
  variant = 'default', // 'default' | 'elevated' | 'gold' | 'flat'
  onClick,
  ...rest
}) {
  const variantClass = {
    default: 'glass-panel',
    elevated: 'glass-panel-elevated',
    gold: 'glass-panel-gold',
    flat: 'bg-white/5 border border-white/10'
  }[variant] || 'glass-panel';

  const interactiveClass = onClick ? 'cursor-pointer hover:border-[#F43F43]/40 hover:bg-white/10 transition-all duration-200' : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-4 sm:p-5 relative overflow-hidden ${variantClass} ${interactiveClass} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
