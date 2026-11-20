// src/components/common/Skeleton.jsx
import React from 'react';

export default function Skeleton({ className = '', rounded = 'rounded-xl' }) {
  return (
    <div
      className={`animate-pulse bg-white/8 ${rounded} ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.03) 100%)',
        backgroundSize: '200% 100%'
      }}
    />
  );
}
