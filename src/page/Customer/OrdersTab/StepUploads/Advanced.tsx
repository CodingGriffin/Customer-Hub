import React, { useState } from 'react';

interface AdvancedProps {
  selectedFormat: string;
  setSelectedFormat: (status: string) => void;
}

function Advanced({selectedFormat, setSelectedFormat}: AdvancedProps) {

  const [isFormatSelectEnabled, setIsFormatSelectEnabled] = useState(false);

  const formatInfo: any = {
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
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2 dark:text-white">In Most Cases it is Not Necessary to Change These Defaults</h2>
        <p className="text-gray-400">Contact our Data Department staff if you need assistance and require advanced configurations.</p>
      </div>

      <div className="rounded-lg p-3">
        <div className="flex justify-between items-start mb-6">
          <select 
            className={`w-[75%] border border-gray-700 rounded-lg p-3 ${!isFormatSelectEnabled && 'opacity-50 cursor-not-allowed'}`}
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
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Change Defaults
            </button>
            <p className="text-sm text-gray-400 mt-1">(Not Recommended)</p>
          </div>
        </div>

        <div className="rounded-lg p-8">
          <div className="flex items-center gap-4 mb-4">
            <svg className="w-8 h-8 text-[#4d9fff]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <h2 className="text-2xl font-bold dark:text-white">{currentFormat.title}</h2>
          </div>
          <p className="text-gray-400 mb-8">{currentFormat.description}</p>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#4d9fff] uppercase text-sm font-semibold mb-4">Advantages</h3>
              <ul className="space-y-3 dark:text-white">
                {currentFormat.advantages.map((advantage: any, index: any) => (
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
              <ul className="space-y-3 dark:text-white">
                {currentFormat.limitations.map((limitation: any, index: any) => (
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
  )
}

export default Advanced;