import React, { useState } from 'react';

function VersionSetup() {

  const [selectedVersion, setSelectedVersion] = useState('');
  const versions = ['1', '2', '3', '4'];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Select PAD Version
        </label>
        <select
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
          className="w-full dark:bg-[#1a1f2e] border border-gray-700 rounded px-3 py-2 dark:text-gray-300"
        >
          <option value="">Select version...</option>
          {versions.map((version) => (
            <option key={version} value={version}>
              Version {version}
            </option>
          ))}
        </select>
      </div>
      {selectedVersion && (
        <p className="bg-gray-100 dark:text-gray-400 dark:bg-[#1a1f2e] p-4 rounded">
          Note: Approval for the PAD for this version will depend on the approval for Version #{selectedVersion}
        </p>
      )}
    </div>
  )
}

export default VersionSetup;