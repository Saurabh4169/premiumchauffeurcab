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
    <div className="w-full py-1">
      {/* Step Numbers & Connectors */}
      <div className="flex items-center justify-between relative px-2">
        {/* Background track line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#E2E2E2] z-0" />
        
        {/* Active progress fill */}
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#BE8A44] transition-all duration-300 z-0"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 88}%`
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
                aria-label={`Step ${stepNumber}: ${stepName}`}
                className={`w-7.5 h-7.5 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-600 text-white cursor-pointer shadow-xs hover:scale-105'
                    : isCurrent
                    ? 'bg-[#BE8A44] text-white ring-4 ring-[#BE8A44]/20 shadow-md shadow-[#BE8A44]/25 scale-105'
                    : 'bg-[#FAF5ED] border border-[#E2E2E2] text-[#555555] cursor-default'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepNumber}
              </button>
            </div>
          );
        })}
      </div>

      {/* Step Label Display (High Contrast & Visible) */}
      <div className="text-center mt-2.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#BE8A44] block">
          STEP {currentStep} OF {steps.length}
        </span>
        <h4 className="text-[15px] font-bold text-[#120F11] leading-tight mt-0.5">
          {steps[currentStep - 1]}
        </h4>
      </div>
    </div>
  );
}
