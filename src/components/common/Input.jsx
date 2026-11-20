// src/components/common/Input.jsx
import React, { useState } from 'react';

export default function Input({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  icon: Icon,
  rightElement,
  error,
  helperText,
  disabled = false,
  className = '',
  required = false,
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-[12px] font-semibold text-[var(--text-muted)] mb-1.5 ml-0.5">
          {label} {required && <span className="text-[var(--danger)]">*</span>}
        </label>
      )}

      <div
        className={`relative flex items-center h-12 rounded-[14px] px-3.5 transition-all duration-200 border bg-[var(--surface)] shadow-xs ${
          error
            ? 'border-[var(--danger)] ring-2 ring-[var(--danger)]/30'
            : isFocused
            ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/35'
            : 'border-[var(--border)] hover:border-slate-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed bg-[var(--surface-muted)]' : ''}`}
      >
        {Icon && (
          <div className="mr-2.5 text-[var(--text-muted)] shrink-0">
            <Icon className="w-4.5 h-4.5 text-[var(--text-muted)]" />
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-transparent text-[var(--ink)] placeholder:text-[var(--text-subtle)] text-[15px] outline-none font-medium"
          {...rest}
        />

        {rightElement && (
          <div className="ml-2 flex items-center shrink-0">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-1 text-[12px] font-medium text-[var(--danger)] ml-0.5">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-[12px] text-[var(--text-muted)] ml-0.5">{helperText}</p>
      ) : null}
    </div>
  );
}
