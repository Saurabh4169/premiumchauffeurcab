// src/components/common/Avatar.jsx
import React from 'react';

export default function Avatar({
  src,
  alt = 'User',
  name = '',
  size = 'md', // 'sm' (32px), 'md' (40px), 'lg' (52px), 'xl' (64px)
  status = null, // 'online' | 'busy' | 'offline'
  className = ''
}) {
  const sizeMap = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-10 h-10 text-[13px]',
    lg: 'w-13 h-13 text-[16px]',
    xl: 'w-16 h-16 text-[18px]'
  }[size] || 'w-10 h-10 text-[13px]';

  const statusColors = {
    online: 'bg-[#3fa37a]',
    busy: 'bg-[#BE8A44]',
    offline: 'bg-white/40'
  };

  const getInitials = (text) => {
    if (!text) return 'PC';
    return text
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div className={`${sizeMap} rounded-full overflow-hidden border border-[#BE8A44]/40 bg-gradient-to-br from-[#120F11] to-[#270B14] flex items-center justify-center font-semibold text-[#FAF5ED] shadow-inner`}>
        {src ? (
          <img
            src={src}
            alt={alt || name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#120F11] ${statusColors[status] || statusColors.online}`}
        />
      )}
    </div>
  );
}
