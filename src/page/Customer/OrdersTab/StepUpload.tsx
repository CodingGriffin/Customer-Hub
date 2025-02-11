import React, { useState } from 'react';

function StepUpload() {
  const [windowsDriveLabel, setWindowsDriveLabel] = useState('USB DRIVE');
  const [macosDriveLabel, setMacosDriveLabel] = useState('USB DRIVE');
  const [activeTab, setActiveTab] = useState('format');
  const [selectedFormat, setSelectedFormat] = useState('FAT32');
  const [isFormatSelectEnabled, setIsFormatSelectEnabled] = useState(false);
  const [windowsIconOption, setWindowsIconOption] = useState('upload');
  const [macosIconOption, setMacosIconOption] = useState('upload');

  const formatInfo = {
    'FAT32': {
      title: 'FAT32 (Default - Highest Compatibility)',
      description: 'The most compatible file system across all operating systems',
      advantages: [
        'Works with virtually all devices',
        'Supported by Windows, macOS, Linux, gaming consoles, and car stereos',
        'No additional drivers needed'
      ],
      limitations: [
        'Maximum file size limited to 4GB',
        'Maximum volume size of 2TB',
        'No built-in file encryption'
      ]
    },
    'NTFS': {
      title: 'NTFS (New Technology File System)',
      description: 'Windows native file system with advanced features',
      advantages: [
        'No practical file size limit',
        'Built-in file encryption',
        'File compression support'
      ],
      limitations: [
        'Limited compatibility with macOS (read-only)',
        'Limited compatibility with gaming consoles',
        'May require additional drivers'
      ]
    },
    'exFAT': {
      title: 'exFAT (Extended File Allocation Table)',
      description: 'Modern file system designed for external storage',
      advantages: [
        'No practical file size limit',
        'Compatible with most modern devices',
        'Optimized for flash drives'
      ],
      limitations: [
        'No built-in encryption',
        'Less reliable than modern alternatives',
        'Limited support on older devices'
      ]
    },
    'HFS+': {
      title: 'HFS+ (macOS Extended)',
      description: 'Legacy Apple file system for macOS',
      advantages: [
        'Native macOS support',
        'Journaling support',
        'Built-in encryption'
      ],
      limitations: [
        'Limited Windows compatibility',
        'Not compatible with most devices',
        'Being phased out by Apple'
      ]
    },
    'APFS': {
      title: 'APFS (Apple File System)',
      description: 'Modern Apple file system optimized for SSDs',
      advantages: [
        'Optimized for flash storage',
        'Built-in encryption',
        'Snapshot support'
      ],
      limitations: [
        'macOS only',
        'No Windows compatibility',
        'Not suitable for HDDs'
      ]
    },
    'EXT4': {
      title: 'EXT4 (Fourth Extended Filesystem)',
      description: 'Standard Linux file system',
      advantages: [
        'Journaling support',
        'Large file system support',
        'Excellent reliability'
      ],
      limitations: [
        'Limited Windows compatibility',
        'No macOS support',
        'Requires third-party tools for access'
      ]
    }
  };

  const currentFormat = formatInfo[selectedFormat];

  const formatContent = (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">In Most Cases it is Not Necessary to Change These Defaults</h2>
        <p className="text-gray-400">Contact our Data Department staff if you need assistance and require advanced configurations.</p>
      </div>

      <div className="bg-[#1e2229] rounded-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <select 
            className={`w-[75%] bg-[#2a2e36] text-white border border-gray-700 rounded-lg p-3 ${!isFormatSelectEnabled && 'opacity-50 cursor-not-allowed'}`}
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            disabled={!isFormatSelectEnabled}
          >
            <option value="FAT32">FAT32 (Default - Highest Compatibility)</option>
            <option value="NTFS">NTFS (New Technology File System)</option>
            <option value="exFAT">exFAT (Extended File Allocation Table)</option>
            <option value="HFS+">HFS+ (macOS Extended)</option>
            <option value="APFS">APFS (Apple File System)</option>
            <option value="EXT4">EXT4 (Fourth Extended Filesystem)</option>
          </select>
          <div className="text-center">
            <button 
              onClick={() => setIsFormatSelectEnabled(true)}
              className="bg-[#2a2e36] px-4 py-2 rounded-lg hover:bg-[#353a44] transition-colors"
            >
              Change Defaults
            </button>
            <p className="text-sm text-gray-400 mt-1">(Not Recommended)</p>
          </div>
        </div>

        <div className="bg-[#2a2e36] rounded-lg p-8">
          <div className="flex items-center gap-4 mb-4">
            <svg className="w-8 h-8 text-[#4d9fff]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <h2 className="text-2xl font-bold">{currentFormat.title}</h2>
          </div>
          <p className="text-gray-400 mb-8">{currentFormat.description}</p>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#4d9fff] uppercase text-sm font-semibold mb-4">Advantages</h3>
              <ul className="space-y-3">
                {currentFormat.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {advantage}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[#4d9fff] uppercase text-sm font-semibold mb-4">Limitations</h3>
              <ul className="space-y-3">
                {currentFormat.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {limitation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const finalizeContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#1e2229] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Content Overview</h3>
            <span className="text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Folders</span>
              <span className="font-mono">247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Files</span>
              <span className="font-mono">1,832</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Size</span>
              <span className="font-mono">3.7 GB</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1e2229] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Format Details</h3>
            <span className="text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">File System</span>
              <span className="font-mono">{selectedFormat}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Largest File</span>
              <span className="font-mono">2.1 GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Compatibility</span>
              <span className="text-green-500 text-sm">✓ Verified</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1e2229] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Drive Labels</h3>
            <span className="text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Windows</span>
              <span className="font-mono">{windowsDriveLabel}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">macOS</span>
              <span className="font-mono">{macosDriveLabel}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Icons</span>
              <span className="text-green-500 text-sm">✓ Custom Set</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1e2229] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Ready for Data Department Review?</h3>
            <p className="text-sm text-gray-400">All configurations have been verified and meet our standards</p>
          </div>
          <button className="bg-[#4d9fff] hover:bg-[#4d9fff]/90 text-white px-6 py-2 rounded-lg transition-colors">
            Request Proof
          </button>
        </div>
        
        <div className="bg-[#2a2e36] rounded-lg p-4 text-sm text-gray-400">
          <p>The Data Department will review your configuration and create a proof USB drive. You'll receive an email notification when the proof is ready for testing. Typical turnaround time is 1-2 business days.</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'format':
        return formatContent;
      case 'finalize':
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
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold mb-1">Partition #1</h1>
            <div className="group relative">
              <button className="text-gray-400 hover:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 hidden group-hover:block">
                <div className="bg-gray-900 text-sm text-gray-300 rounded-lg p-3 shadow-lg">
                  USB drives require at least one partition to function. Most users only need a single partition for optimal performance and ease of use.
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">No Write-Protection</span>
            <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Contact Sales</a>
          </div>
        </div>
        <div className="text-center">
          <button className="flex items-center gap-2 bg-[#2a2e36] px-4 py-2 rounded-lg hover:bg-[#353a44] transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Partition
          </button>
        </div>
      </div>

      {/* Top Navigation */}
      <nav className="flex gap-8 mb-12 text-gray-400 border-b border-gray-700 pb-4">
        <button 
          onClick={() => setActiveTab('format')}
          className={`flex items-center gap-2 ${activeTab === 'format' ? 'text-[#4d9fff]' : ''}`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Advanced
        </button>
        <button 
          onClick={() => setActiveTab('name-icon')}
          className={`flex items-center gap-2 ${activeTab === 'name-icon' ? 'text-[#4d9fff]' : ''}`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          Name & Icon
        </button>
        <button 
          onClick={() => setActiveTab('data-files')}
          className={`flex items-center gap-2 ${activeTab === 'data-files' ? 'text-[#4d9fff]' : ''}`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
          </svg>
          Data Files
        </button>
        <button 
          onClick={() => setActiveTab('finalize')}
          className={`flex items-center gap-2 ${activeTab === 'finalize' ? 'text-[#4d9fff]' : ''}`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Review
        </button>
      </nav>

      {/* Main Content */}
      {renderContent()}
    </div>
  );
}

export default StepUpload;