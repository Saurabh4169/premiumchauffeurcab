// src/components/common/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'dark' | 'ghost' | 'danger'
  size = 'md', // 'lg' (48px) | 'md' (48px) | 'sm' (36px) | 'secondary' (44px)
  disabled = false,
  fullWidth = false,
  className = '',
  icon: Icon,
  iconRight: IconRight,
  ...rest
}) {
  const sizeClasses = {
    lg: 'h-12 px-5 text-[15px] font-semibold rounded-full',
    md: 'h-12 px-5 text-[15px] font-semibold rounded-full',
    secondary: 'h-11 px-4 text-[14px] font-semibold rounded-full',
    sm: 'h-9 px-3.5 text-[13px] font-semibold rounded-full'
  }[size] || 'h-12 px-5 text-[15px] font-semibold rounded-full';

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    dark: 'btn-dark',
    ghost: 'bg-transparent text-[var(--accent)] hover:underline underline-offset-4 p-0 h-auto font-medium',
    danger: 'bg-[var(--danger)] hover:opacity-95 text-white font-medium shadow-sm'
  }[variant] || 'btn-primary';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer transition-all select-none disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''} ${sizeClasses} ${variantClasses} ${className}`}
      {...rest}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {IconRight && <IconRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
    </motion.button>
  );
}
