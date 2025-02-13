import React, { useState, useEffect } from 'react';

interface NameIconSecondProps {
  windowsIcon: File | null;
  macosIcon: File | null;
  handleIconChange: (e: React.ChangeEvent<HTMLInputElement>, os: 'windows' | 'macos') => void;
}

function NameIconSecond({windowsIcon, macosIcon, handleIconChange}: NameIconSecondProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-8">
        <div className="border rounded-lg p-8">
          <h2 className="flex items-center gap-2 text-lg mb-4 dark:text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L20 0v11.4h-9.051M0 12.6h9.75v9.451L0 20.699M10.949 12.6H20V24l-9.051-1.801" />
            </svg>
            Windows Icon
          </h2>
          <div className="mb-4">
            <div className="w-32 h-32 mx-auto border rounded-lg flex items-center justify-center mb-4">
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
              className="block w-full text-center px-4 py-2 border rounded-lg cursor-pointer transition-colors dark:text-white"
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

        <div className="border rounded-lg p-8">
          <h2 className="flex items-center gap-2 text-lg mb-4 dark:text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
            </svg>
            macOS Icon
          </h2>
          <div className="mb-4">
            <div className="w-32 h-32 mx-auto border rounded-lg flex items-center justify-center mb-4">
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
              className="block w-full text-center px-4 py-2 border rounded-lg cursor-pointer hover:bg-[#353a44] transition-colors dark:text-white"
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
  )
}

export default NameIconSecond;