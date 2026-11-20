// src/components/common/Screen.jsx
import React from 'react';

export default function Screen({
  children,
  withTabBar = false,
  withCta = false,
  className = '',
  style = {}
}) {
  let pbStyle = {};
  if (withCta) {
    pbStyle = { paddingBottom: 'calc(var(--cta-h) + 16px + var(--safe-bottom))' };
  } else if (withTabBar) {
    pbStyle = { paddingBottom: 'calc(var(--tabbar-h) + 24px + var(--safe-bottom))' };
  }

  return (
    <div 
      className={`min-h-full ${className}`}
      style={{ ...pbStyle, ...style }}
    >
      {children}
    </div>
  );
}
