import React, { useState, useEffect } from 'react';

interface NameIconProps {
  windowsDriveLabel: string;
  setWindowsDriveLabel: (status: string) => void;
  macosDriveLabel: string;
  setMacosDriveLabel: (status: string) => void;
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

function NameIcon({windowsDriveLabel, macosDriveLabel, setWindowsDriveLabel, setMacosDriveLabel}: NameIconProps) {
  const [step, setStep] = useState(1);
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
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (iconOption === 'upload' && (!windowsIcon || !macosIcon)) {
        return; // Don't proceed if icons are required but not uploaded
      }
      setStep(3);
    }
    // Step 3 would handle final submission
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#1e2229] rounded-lg p-8 mb-6">
              <h2 className="text-xl font-semibold mb-4">Would you like to customize your drive icon?</h2>
              <p className="text-gray-400 mb-6">
                A custom icon helps identify your drive in File Explorer and Finder. The icon will be displayed
                when the drive is connected to a computer.
              </p>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 bg-[#2a2e36] rounded-lg cursor-pointer hover:bg-[#353a44] transition-colors">
                  <input
                    type="radio"
                    name="iconOption"
                    value="none"
                    checked={iconOption === 'none'}
                    onChange={(e) => setIconOption(e.target.value)}
                    className="text-[#4d9fff] focus:ring-[#4d9fff]"
                  />
                  <div>
                    <span className="font-medium">No custom icon</span>
                    <p className="text-sm text-gray-400">Use the default system icon</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-[#2a2e36] rounded-lg cursor-pointer hover:bg-[#353a44] transition-colors">
                  <input
                    type="radio"
                    name="iconOption"
                    value="upload"
                    checked={iconOption === 'upload'}
                    onChange={(e) => setIconOption(e.target.value)}
                    className="text-[#4d9fff] focus:ring-[#4d9fff]"
                  />
                  <div>
                    <span className="font-medium">Upload new icons</span>
                    <p className="text-sm text-gray-400">Create new custom icons for Windows and macOS</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-[#2a2e36] rounded-lg cursor-pointer hover:bg-[#353a44] transition-colors">
                  <input
                    type="radio"
                    name="iconOption"
                    value="existing"
                    checked={iconOption === 'existing'}
                    onChange={(e) => setIconOption(e.target.value)}
                    className="text-[#4d9fff] focus:ring-[#4d9fff]"
                  />
                  <div>
                    <span className="font-medium">Use existing icons</span>
                    <p className="text-sm text-gray-400">Select from previously created icons</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-[#1e2229] rounded-lg p-8">
                <h2 className="flex items-center gap-2 text-lg mb-4">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L20 0v11.4h-9.051M0 12.6h9.75v9.451L0 20.699M10.949 12.6H20V24l-9.051-1.801" />
                  </svg>
                  Windows Icon
                </h2>
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto bg-[#2a2e36] rounded-lg flex items-center justify-center mb-4">
                    {windowsIcon ? (
                      <img
                        src={URL.createObjectURL(windowsIcon)}
                        alt="Windows icon preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L20 0v11.4h-9.051M0 12.6h9.75v9.451L0 20.699M10.949 12.6H20V24l-9.051-1.801" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleIconChange(e, 'windows')}
                    className="hidden"
                    id="windows-icon"
                  />
                  <label
                    htmlFor="windows-icon"
                    className="block w-full text-center px-4 py-2 bg-[#2a2e36] text-white rounded-lg cursor-pointer hover:bg-[#353a44] transition-colors"
                  >
                    Choose image
                  </label>
                </div>
                <div className="text-sm text-gray-400 space-y-2">
                  <p>• Supports all major image formats</p>
                  <p>• Recommended size: 256x256 pixels</p>
                  <p>• Keep the design simple and clear</p>
                </div>
              </div>

              <div className="bg-[#1e2229] rounded-lg p-8">
                <h2 className="flex items-center gap-2 text-lg mb-4">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
                  </svg>
                  macOS Icon
                </h2>
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto bg-[#2a2e36] rounded-lg flex items-center justify-center mb-4">
                    {macosIcon ? (
                      <img
                        src={URL.createObjectURL(macosIcon)}
                        alt="macOS icon preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleIconChange(e, 'macos')}
                    className="hidden"
                    id="macos-icon"
                  />
                  <label
                    htmlFor="macos-icon"
                    className="block w-full text-center px-4 py-2 bg-[#2a2e36] text-white rounded-lg cursor-pointer hover:bg-[#353a44] transition-colors"
                  >
                    Choose image
                  </label>
                </div>
                <div className="text-sm text-gray-400 space-y-2">
                  <p>• Supports all major image formats</p>
                  <p>• Recommended size: 512x512 pixels</p>
                  <p>• Keep the design simple and clear</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h3 className="text-blue-400 font-medium mb-2">Icon Design Tips</h3>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• Avoid using small text as it will be difficult to read</li>
                <li>• Keep the image simple and "square-like" for best results</li>
                <li>• Transparency is supported but may have unexpected results</li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-4xl mx-auto">
            {labelError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {labelError}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-[#1e2229] rounded-lg p-8">
                <h2 className="flex items-center gap-2 text-lg mb-6">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L20 0v11.4h-9.051M0 12.6h9.75v9.451L0 20.699M10.949 12.6H20V24l-9.051-1.801" />
                  </svg>
                  Windows Label
                </h2>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Drive Label</label>
                  <input 
                    type="text" 
                    value={windowsDriveLabel}
                    onChange={handleWindowsLabelChange}
                    maxLength={FILE_SYSTEM_RULES[selectedFormat as keyof typeof FILE_SYSTEM_RULES].maxLength}
                    className={`w-full bg-[#2a2e36] border rounded-lg p-3 ${
                      labelError ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700'
                    }`}
                  />
                </div>
              </div>

              <div className="bg-[#1e2229] rounded-lg p-8">
                <h2 className="flex items-center gap-2 text-lg mb-6">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
                  </svg>
                  macOS Label
                </h2>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Volume Label</label>
                  <input 
                    type="text" 
                    value={macosDriveLabel}
                    onChange={handleMacosLabelChange}
                    maxLength={FILE_SYSTEM_RULES[selectedFormat as keyof typeof FILE_SYSTEM_RULES].maxLength}
                    className={`w-full bg-[#2a2e36] border rounded-lg p-3 ${
                      labelError ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1d24] text-white p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-lg font-medium text-gray-200">Name & Icon</h5>
          <button 
            className="flex items-center gap-2 bg-[#2a2e36] px-6 py-2 rounded-lg hover:bg-[#353a44] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleContinue}
            disabled={step === 3 && !!labelError}
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
                  stepNumber === step
                    ? 'bg-blue-500 text-white'
                    : stepNumber < step
                    ? 'bg-green-500 text-white'
                    : 'bg-[#2a2e36] text-gray-400'
                }`}
              >
                {stepNumber < step ? (
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
                    stepNumber < step ? 'bg-green-500' : 'bg-[#2a2e36]'
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