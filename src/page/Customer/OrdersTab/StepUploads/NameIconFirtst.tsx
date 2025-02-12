interface NameIconFirstProps {
  iconOption: string;
  setIconOption: (status: string) => void;
}

function NameIconFirst({iconOption, setIconOption}: NameIconFirstProps) {
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
  )
}

export default NameIconFirst;