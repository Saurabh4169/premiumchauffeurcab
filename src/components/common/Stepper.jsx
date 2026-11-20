// src/components/common/Stepper.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Stepper({
  steps = ['Ride Info', 'Vehicle', 'Passenger', 'Review Quote', 'Confirm'],
  currentStep = 1,
  onStepClick
}) {
  return (
    <div className="w-full py-2">
      {/* Step Numbers & Connectors */}
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-white/10 z-0" />
        
        {/* Active progress fill */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#F43F43] to-[#FDEEEA] transition-all duration-300 z-0"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 90}%`
          }}
        />

        {steps.map((stepName, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepName} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                onClick={() => onStepClick && isCompleted && onStepClick(stepNumber)}
                disabled={!isCompleted && !isCurrent}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#F43F43] text-[#101417] cursor-pointer hover:scale-105'
                    : isCurrent
                    ? 'bg-gradient-to-br from-[#FDEEEA] to-[#F43F43] text-[#101417] ring-4 ring-[#F43F43]/30 scale-110 shadow-lg shadow-[#F43F43]/40'
                    : 'bg-[#1a0f14] border border-white/20 text-white/40'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNumber}
              </button>
            </div>
          );
        })}
      </div>

      {/* Step Label Display */}
      <div className="text-center mt-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F43F43]">
          Step {currentStep} of {steps.length}
        </span>
        <h4 className="text-[15px] font-sans font-bold text-[#faf6f0]">
          {steps[currentStep - 1]}
        </h4>
      </div>
    </div>
  );
}
