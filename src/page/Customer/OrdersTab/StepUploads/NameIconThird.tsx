interface NameIconThirdProps {
  labelError: string;
  windowsDriveLabel: string;
  macosDriveLabel: string;
  selectedFormat: string;
  FILE_SYSTEM_RULES: any;
  handleWindowsLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMacosLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function NameIconThird({labelError, windowsDriveLabel, macosDriveLabel, selectedFormat, FILE_SYSTEM_RULES, handleMacosLabelChange, handleWindowsLabelChange}: NameIconThirdProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {labelError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {labelError}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-8">
        <div className="border rounded-lg p-8">
          <h2 className="flex items-center gap-2 text-lg mb-6 dark:text-white">
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
              // maxLength={FILE_SYSTEM_RULES[selectedFormat as keyof typeof FILE_SYSTEM_RULES].maxLength}
              className={`w-full border rounded-lg p-3 ${
                labelError ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700'
              }`}
            />
          </div>
        </div>

        <div className="border rounded-lg p-8">
          <h2 className="flex items-center gap-2 text-lg mb-6 dark:text-white">
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
              // maxLength={FILE_SYSTEM_RULES[selectedFormat as keyof typeof FILE_SYSTEM_RULES].maxLength}
              className={`w-full border rounded-lg p-3 ${
                labelError ? 'border-red-500/50 focus:border-red-500' : 'border-gray-700'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NameIconThird;