import React, { useState, useEffect } from 'react';
import { Settings, FileText, Camera, HardDrive } from 'lucide-react';

import { Outlet } from 'react-router-dom';

interface VersionsProps {
  selectedOrderData: any
  currentStep: number
  setStep: (step: number) => void;
}

function Versions({ currentStep, selectedOrderData, setStep}: VersionsProps) {

  const steps = [
    { number: 1, title: 'Setup', icon: <Settings className="w-5 h-5" /> },
    { number: 2, title: 'Upload', icon: <HardDrive className="w-5 h-5" /> },
    { number: 3, title: 'Proof', icon: <FileText className="w-5 h-5" /> },
    { number: 4, title: 'Photo Sample', icon: <Camera className="w-5 h-5" /> },
    { number: 5, title: 'Live Sample', icon: <Camera className="w-5 h-5" /> }
  ];

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="ml-3 mb-4 relative flex justify-between">
          {steps.map((step) => (
            <button
              key={step.number}
              onClick={() => setStep(step.number)}
              className={`flex items-center ${
                currentStep === step.number
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              disabled={currentStep < step.number}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep === step.number
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'
              }`}>
                {step.icon}
              </div>
              <span className="ml-2 text-sm font-medium bg-white dark:bg-gray-800 px-2">
                {step.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ml-3">
        <Outlet context={{ selectedOrderData, setStep, currentStep }} />
      </div>
    </>
  )
}

export default Versions;
