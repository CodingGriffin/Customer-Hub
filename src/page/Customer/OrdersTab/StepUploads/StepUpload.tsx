import React, { useState } from 'react';

import Header from '../../../../component/StepUpload/HeaderComponent';
import Nav from '../../../../component/StepUpload/NavComponent';
import Advanced from './Advanced';
import Review from './Review';

function StepUpload() {
  const [windowsDriveLabel, setWindowsDriveLabel] = useState('USB DRIVE');
  const [macosDriveLabel, setMacosDriveLabel] = useState('USB DRIVE');
  const [activeTab, setActiveTab] = useState('format');
  const [selectedFormat, setSelectedFormat] = useState('FAT32');
  const [windowsIconOption, setWindowsIconOption] = useState('upload');
  const [macosIconOption, setMacosIconOption] = useState('upload');

  const formatContent = (
    <Advanced selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat} />
  );

  const finalizeContent = (
    <Review selectedFormat={selectedFormat} windowsDriveLabel={windowsDriveLabel} macosDriveLabel={macosDriveLabel} />
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'advanced':
        return formatContent;
      case 'review':
        return finalizeContent;
      case 'data-files':
        return <div></div>; // Empty content for data-files tab
      default:
        return (
          <div className="grid grid-cols-2 gap-8">
            {/* Windows 11 Section */}
            <div>
              <h2 className="flex items-center gap-2 mb-6 text-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L20 0v11.4h-9.051M0 12.6h9.75v9.451L0 20.699M10.949 12.6H20V24l-9.051-1.801" />
                </svg>
                Windows 11
              </h2>
              <div className="bg-[#1e2229] rounded-lg p-8 mb-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#2a2e36] rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L20 0v11.4h-9.051M0 12.6h9.75v9.451L0 20.699M10.949 12.6H20V24l-9.051-1.801" />
                  </svg>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Drive Label</label>
                  <input 
                    type="text" 
                    value={windowsDriveLabel}
                    onChange={(e) => setWindowsDriveLabel(e.target.value)}
                    className="w-full bg-[#1e2229] border border-gray-700 rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Drive Icon</label>
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <button className="w-20 h-20 bg-[#1e2229] border border-gray-700 rounded-lg flex items-center justify-center hover:bg-[#2a2e36] transition-colors">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex justify-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="windowsIconOption"
                          value="upload"
                          checked={windowsIconOption === 'upload'}
                          onChange={(e) => setWindowsIconOption(e.target.value)}
                          className="text-[#4d9fff] focus:ring-[#4d9fff]"
                        />
                        <span className="text-sm text-gray-400">Upload New</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="windowsIconOption"
                          value="existing"
                          checked={windowsIconOption === 'existing'}
                          onChange={(e) => setWindowsIconOption(e.target.value)}
                          className="text-[#4d9fff] focus:ring-[#4d9fff]"
                        />
                        <span className="text-sm text-gray-400">Use Existing</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* macOS Section */}
            <div>
              <h2 className="flex items-center gap-2 mb-6 text-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
                </svg>
                macOS
              </h2>
              <div className="bg-[#1e2229] rounded-lg p-8 mb-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#2a2e36] rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
                  </svg>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Drive Label</label>
                  <input 
                    type="text" 
                    value={macosDriveLabel}
                    onChange={(e) => setMacosDriveLabel(e.target.value)}
                    className="w-full bg-[#1e2229] border border-gray-700 rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Drive Icon</label>
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <button className="w-20 h-20 bg-[#1e2229] border border-gray-700 rounded-lg flex items-center justify-center hover:bg-[#2a2e36] transition-colors">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex justify-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="macosIconOption"
                          value="upload"
                          checked={macosIconOption === 'upload'}
                          onChange={(e) => setMacosIconOption(e.target.value)}
                          className="text-[#4d9fff] focus:ring-[#4d9fff]"
                        />
                        <span className="text-sm text-gray-400">Upload New</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="macosIconOption"
                          value="existing"
                          checked={macosIconOption === 'existing'}
                          onChange={(e) => setMacosIconOption(e.target.value)}
                          className="text-[#4d9fff] focus:ring-[#4d9fff]"
                        />
                        <span className="text-sm text-gray-400">Use Existing</span>
                      </label>
                    </div>
                  </div>
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
      <Header />

      {/* Top Navigation */}
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      {renderContent()}
    </div>
  );
}

export default StepUpload;