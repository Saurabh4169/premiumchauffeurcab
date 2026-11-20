// src/components/common/Badge.jsx
import React from 'react';

export default function Badge({
  children,
  variant = 'accent', // 'accent' | 'success' | 'warning' | 'danger' | 'dark' | 'glass' | 'neutral'
  size = 'md', // 'sm' | 'md'
  icon: Icon,
  className = ''
}) {
  const variantStyles = {
    accent: 'bg-[var(--accent-tint)] text-[var(--accent)] border-[var(--accent)]/20',
    gold: 'bg-[var(--accent-tint)] text-[var(--accent)] border-[var(--accent)]/20',
    coral: 'bg-[var(--accent-tint)] text-[var(--accent)] border-[var(--accent)]/20',
    success: 'bg-[var(--success-bg)] text-[var(--success)] border-[var(--success)]/20',
    warning: 'bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning)]/20',
    danger: 'bg-[var(--danger-bg)] text-[var(--danger)] border-[var(--danger)]/20',
    dark: 'bg-[var(--ink)] text-white border-transparent',
    glass: 'bg-[var(--ink)]/65 text-white backdrop-blur-xs border-white/15',
    neutral: 'bg-[var(--surface-muted)] text-[var(--text-muted)] border-[var(--border)]'
  }[variant] || 'bg-[var(--accent-tint)] text-[var(--accent)] border-[var(--accent)]/20';

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-semibold',
    md: 'text-[12px] px-2.5 py-0.5 font-semibold'
  }[size] || 'text-[12px] px-2.5 py-0.5 font-semibold';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border leading-tight ${variantStyles} ${sizeStyles} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span className="truncate">{children}</span>
    </span>
  );
}
