// src/components/VehicleVisual.jsx
import React, { useState } from 'react';
import { Car, Shield, Crown, Truck, Bus, Sparkles } from 'lucide-react';

export default function VehicleVisual({
  vehicle,
  className = '',
  size = 'md' // 'sm' (horizontal card), 'md' (vertical card), 'lg' (detail hero)
}) {
  const [imgError, setImgError] = useState(false);

  // Category based styling & silhouette icons
  const getCategoryTheme = (category) => {
    switch (category) {
      case 'sedans':
        return {
          icon: Car,
          badge: 'Executive Chauffeur Sedan',
          gradient: 'from-[#101417] via-[#101417] to-[#101417]',
          goldAccent: 'border-[#F43F43]/40',
          silhouetteSvg: (
            <path
              d="M10 50 C25 50, 40 46, 60 44 C80 42, 100 24, 130 20 C180 14, 250 14, 290 22 C320 28, 340 42, 360 44 C380 46, 395 50, 400 56 C400 66, 395 72, 385 74 C380 74, 375 66, 355 66 C335 66, 330 74, 280 74 L140 74 C135 74, 130 66, 110 66 C90 66, 85 74, 25 74 C15 74, 10 68, 10 58 Z"
              fill="url(#sedanGrad)"
            />
          )
        };
      case 'suvs':
        return {
          icon: Shield,
          badge: 'Executive Luxury SUV',
          gradient: 'from-[#2e101b] via-[#1a080f] to-[#101417]',
          goldAccent: 'border-[#F43F43]/50',
          silhouetteSvg: (
            <path
              d="M10 54 C25 54, 45 50, 70 48 C90 46, 105 18, 135 14 C185 8, 290 8, 335 12 C355 14, 365 24, 375 46 C390 48, 400 52, 405 58 C405 68, 395 76, 385 76 C380 76, 372 66, 350 66 C328 66, 320 76, 270 76 L140 76 C135 76, 128 66, 105 66 C82 66, 75 76, 25 76 C15 76, 10 70, 10 58 Z"
              fill="url(#suvGrad)"
            />
          )
        };
      case 'limousines':
        return {
          icon: Crown,
          badge: 'Super Stretch Formal Limousine',
          gradient: 'from-[#421524] via-[#240a14] to-[#101417]',
          goldAccent: 'border-[#F43F43]/60',
          silhouetteSvg: (
            <path
              d="M5 52 C20 52, 40 48, 60 46 C80 44, 95 24, 120 20 C180 14, 330 14, 370 20 C395 24, 410 44, 425 46 C440 48, 450 52, 455 58 C455 68, 445 74, 435 74 C430 74, 422 66, 405 66 C388 66, 380 74, 250 74 L140 74 C135 74, 128 66, 105 66 C82 66, 75 74, 20 74 C10 74, 5 68, 5 58 Z"
              fill="url(#limoGrad)"
            />
          )
        };
      case 'sprinter':
        return {
          icon: Truck,
          badge: 'High-Roof Jet Sprinter',
          gradient: 'from-[#351220] via-[#1c0811] to-[#101417]',
          goldAccent: 'border-[#F43F43]/50',
          silhouetteSvg: (
            <path
              d="M10 56 C20 56, 40 52, 60 48 C75 44, 85 10, 105 8 C160 6, 330 6, 360 8 C375 10, 385 22, 390 48 C400 50, 405 54, 405 60 C405 70, 395 76, 385 76 C380 76, 372 66, 350 66 C328 66, 320 76, 270 76 L140 76 C135 76, 128 66, 105 66 C82 66, 75 76, 25 76 C15 76, 10 70, 10 60 Z"
              fill="url(#sprinterGrad)"
            />
          )
        };
      case 'buses':
      default:
        return {
          icon: Bus,
          badge: 'Luxury Coach & Tourliner',
          gradient: 'from-[#33111e] via-[#190810] to-[#101417]',
          goldAccent: 'border-[#F43F43]/40',
          silhouetteSvg: (
            <path
              d="M5 56 C15 56, 35 52, 50 48 C60 44, 70 6, 90 6 C150 4, 380 4, 405 6 C415 8, 420 18, 425 48 C430 50, 435 54, 435 62 C435 72, 425 78, 415 78 C410 78, 402 68, 380 68 C358 68, 350 78, 250 78 L120 78 C115 78, 108 68, 85 68 C62 68, 55 78, 15 78 C8 78, 5 70, 5 60 Z"
              fill="url(#busGrad)"
            />
          )
        };
    }
  };

  const theme = getCategoryTheme(vehicle.category);
  const Icon = theme.icon;

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl flex items-center justify-center select-none ${className}`}>
      {/* 1. Try real webp image first */}
      {!imgError && vehicle.image ? (
        <img
          src={vehicle.image}
          alt={vehicle.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        /* 2. Graceful Luxury Fallback with Bespoke Automotive Silhouette */
        <div className={`w-full h-full bg-gradient-to-b ${theme.gradient} flex flex-col items-center justify-center p-3 relative`}>
          {/* Subtle Radial Glow */}
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

          {/* SVG Silhouette Render */}
          <div className="relative w-full max-w-[280px] h-18 flex items-center justify-center">
            <svg
              className="w-full h-full drop-shadow-[0_10px_20px_rgba(201,162,75,0.25)]"
              viewBox="0 0 460 90"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="sedanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDEEEA" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#F43F43" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#4a1624" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="suvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDEEEA" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#F43F43" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#101417" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="limoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#faf6f0" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#FDEEEA" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#9a7230" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="sprinterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDEEEA" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#F43F43" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#14090d" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="busGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDEEEA" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#F43F43" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#101417" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {theme.silhouetteSvg}

              {/* Headlight & taillight luxury accents */}
              <circle cx="28" cy="54" r="3" fill="#FDEEEA" opacity="0.9" />
              <circle cx="430" cy="52" r="3" fill="#c8102e" opacity="0.8" />
            </svg>
          </div>

          {/* Luxury Badge & Watermark */}
          <div className="flex items-center gap-1.5 mt-1 text-white/50 text-[10px] tracking-wider uppercase font-sans">
            <Icon className="w-3.5 h-3.5 text-[#F43F43]" />
            <span className="text-[#FDEEEA] font-semibold">{vehicle.brand}</span>
            <span>•</span>
            <span className="truncate">{vehicle.shortName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
