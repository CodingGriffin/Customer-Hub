import React, { useState, useEffect } from 'react';

import NameIconFirst from './NameIconFirtst';
import NameIconSecond from './NameIconSecond';
import NameIconThird from './NameIconThird';

interface NameIconProps {
  windowsDriveLabel: string;
  setWindowsDriveLabel: (status: string) => void;
  macosDriveLabel: string;
  setMacosDriveLabel: (status: string) => void;
  nameIconStep: number;
  setNameIconStep: (nameIconStep: number) => void;
}

// Validation rules for different file systems
const FILE_SYSTEM_RULES = {
  'FAT32': {
    maxLength: 11,
    regex: /^[a-zA-Z0-9!#$%&'()@^_`{}~\-]{1,11}$/,
    error: 'FAT32 labels must be 1-11 characters and can only contain letters, numbers, and !#$%&\'()@^_`{}~-'
  },
  'NTFS': {
    maxLength: 32,
    regex: /^[^"*/<>?\\|:]{1,32}$/,
    error: 'NTFS labels must be 1-32 characters and cannot contain "*/<>?\\|:'
  },
  'exFAT': {
    maxLength: 11,
    regex: /^[a-zA-Z0-9!#$%&'()@^_`{}~\-]{1,11}$/,
    error: 'exFAT labels must be 1-11 characters and can only contain letters, numbers, and !#$%&\'()@^_`{}~-'
  },
  'HFS+': {
    maxLength: 255,
    regex: /^[^:]{1,255}$/,
    error: 'HFS+ labels must be 1-255 characters and cannot contain ":"'
  },
  'APFS': {
    maxLength: 255,
    regex: /^[^:]{1,255}$/,
    error: 'APFS labels must be 1-255 characters and cannot contain ":"'
  },
  'EXT4': {
    maxLength: 16,
    regex: /^[a-zA-Z0-9_\-]{1,16}$/,
    error: 'EXT4 labels must be 1-16 characters and can only contain letters, numbers, underscore, and hyphen'
  }
};

function NameIcon({windowsDriveLabel, macosDriveLabel, nameIconStep, setWindowsDriveLabel, setMacosDriveLabel, setNameIconStep}: NameIconProps) {
  const [iconOption, setIconOption] = useState('none');
  const [windowsIcon, setWindowsIcon] = useState<File | null>(null);
  const [macosIcon, setMacosIcon] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('FAT32');
  const [labelError, setLabelError] = useState('');

  // Validate label based on selected format
  const validateLabel = (label: string, format: keyof typeof FILE_SYSTEM_RULES) => {
    const rules = FILE_SYSTEM_RULES[format];
    if (!rules.regex.test(label)) {
      return rules.error;
    }
    return '';
  };

  // Handle Windows label change
  const handleWindowsLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value.toUpperCase();
    setWindowsDriveLabel(newLabel);
    const error = validateLabel(newLabel, selectedFormat as keyof typeof FILE_SYSTEM_RULES);
    setLabelError(error);
  };

  // Handle macOS label change
  const handleMacosLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = e.target.value;
    setMacosDriveLabel(newLabel);
    const error = validateLabel(newLabel, selectedFormat as keyof typeof FILE_SYSTEM_RULES);
    setLabelError(error);
  };

  // Handle icon file selection
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>, os: 'windows' | 'macos') => {
    if (e.target.files && e.target.files[0]) {
      if (os === 'windows') {
        setWindowsIcon(e.target.files[0]);
      } else {
        setMacosIcon(e.target.files[0]);
      }
    }
  };

  // Validate both labels when format changes
  useEffect(() => {
    const windowsError = validateLabel(windowsDriveLabel, selectedFormat as keyof typeof FILE_SYSTEM_RULES);
    const macosError = validateLabel(macosDriveLabel, selectedFormat as keyof typeof FILE_SYSTEM_RULES);
    setLabelError(windowsError || macosError);
  }, [selectedFormat]);

  const handleContinue = () => {
    if (nameIconStep === 1) {
      setNameIconStep(2);
    } else if (nameIconStep === 2) {
      if (iconOption === 'upload' && (!windowsIcon || !macosIcon)) {
        return; // Don't proceed if icons are required but not uploaded
      }
      setNameIconStep(3);
    }
    // Step 3 would handle final submission
  };

  const renderStepContent = () => {
    switch (nameIconStep) {
      case 1:
        return (
          <NameIconFirst iconOption={iconOption} setIconOption={setIconOption} />
        );

      case 2:
        return (
          <NameIconSecond windowsIcon={windowsIcon} macosIcon={macosIcon} handleIconChange={handleIconChange} />
        );

      case 3:
        return (
          <NameIconThird labelError={labelError} windowsDriveLabel={labelError} macosDriveLabel={macosDriveLabel} selectedFormat={selectedFormat} FILE_SYSTEM_RULES={selectedFormat} handleMacosLabelChange={handleMacosLabelChange} handleWindowsLabelChange={handleWindowsLabelChange} />
        );
    }
  };

  return (
    <div className="min-h-screen p-3">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-lg font-medium">Name & Icon</h5>
          <button 
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            onClick={handleContinue}
            disabled={nameIconStep === 3 && !!labelError}
          >
            Save and Continue
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stepNumber === nameIconStep
                    ? 'bg-blue-500'
                    : stepNumber < nameIconStep
                    ? 'bg-green-500'
                    : 'border'
                }`}
              >
                {stepNumber < nameIconStep ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`flex-1 h-0.5 ${
                    stepNumber < nameIconStep ? 'bg-green-500' : 'bg-[#2a2e36]'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      {renderStepContent()}
    </div>
  );
}

export default NameIcon;