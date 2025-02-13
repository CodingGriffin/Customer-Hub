import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import VersionSetup from './VersionSetup';

interface StepSetupProps {
  setSelectedStep: (id: number) => void;
}

function StepSetup({setSelectedStep}: StepSetupProps) {

  const navigate = useNavigate();
  const [setupOption, setSetupOption] = useState<'new' | 'previous' | 'version' | null>(null);
  const [selectedSetupOption, setSelectedSetupOption] = useState<'new' | 'previous' | 'version' | null>(null);
  const [wantsSamplePhotos, setWantsSamplePhotos] = useState(false);


  const continueSetup = () => {
    switch (setupOption) {
      case 'new':
        setSelectedStep(2);
        break;
      case 'version':
        setSelectedSetupOption('version');
        break;
      case 'previous':
        setSelectedStep(2);
        break;
      default:
        break;
    }
  }

  return (
    <div className="space-y-6">
      {selectedSetupOption == null && 
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setSetupOption('new')}
            className={`p-4 border rounded-lg text-left flex flex-col items-start ${
              setupOption === 'new'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 ring-2 ring-blue-200 dark:ring-blue-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <h3 className="font-medium text-gray-900 dark:text-white">Upload Files</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Upload new PAD files</p>
          </button>
          <button
            onClick={() => setSetupOption('version')}
            className={`p-4 border rounded-lg text-left flex flex-col items-start ${
              setupOption === 'version'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 ring-2 ring-blue-200 dark:ring-blue-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <h3 className="font-medium text-gray-900 dark:text-white">Select Version</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Use PAD from another version on this job</p>
          </button>
          <button
            onClick={() => setSetupOption('previous')}
            className={`p-4 border rounded-lg text-left flex flex-col items-start ${
              setupOption === 'previous'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 ring-2 ring-blue-200 dark:ring-blue-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <h3 className="font-medium text-gray-900 dark:text-white">Existing Files</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Use PAD from previous job</p>
          </button>
        </div>
      }
      {selectedSetupOption == 'version' &&
        <VersionSetup /> 
      }
      <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={wantsSamplePhotos}
            onChange={(e) => setWantsSamplePhotos(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            I would like to see photos of a sample before moving to production
          </span>
        </label>
      </div>

      <div className="flex justify-end">
        <button
          onClick={continueSetup}
          disabled={!setupOption}
          className={`px-4 py-2 rounded-md text-white ${
            setupOption
              ? 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
              : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default StepSetup;