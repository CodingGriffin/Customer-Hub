import React, { useState, useEffect } from 'react';
import { Settings, FileText, Camera, Plus, HardDrive } from 'lucide-react';

function Versions() {

  const [setupOption, setSetupOption] = useState<'new' | 'previous' | 'version' | null>(null);
  const [wantsSamplePhotos, setWantsSamplePhotos] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const steps = [
    { number: 1, title: 'Setup', icon: <Settings className="w-5 h-5" /> },
    { number: 2, title: 'Upload', icon: <HardDrive className="w-5 h-5" /> },
    { number: 3, title: 'Proof', icon: <FileText className="w-5 h-5" /> },
    { number: 4, title: 'Photo Sample', icon: <Camera className="w-5 h-5" /> },
    { number: 5, title: 'Live Sample', icon: <Camera className="w-5 h-5" /> }
  ];
  
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-between">
          {steps.map((step) => (
            <button
              key={step.number}
              onClick={() => setSelectedStep(step.number)}
              className={`flex items-center ${
                selectedStep === step.number
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                selectedStep === step.number
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'
              }`}>
                {step.icon}
              </div>
              <span className="ml-2 text-sm font-medium bg-white dark:bg-gray-800 px-2">
                {step.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {selectedStep === 1 && (
          <div className="space-y-6">
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
                disabled={!setupOption}
                className={`px-4 py-2 rounded-md text-white ${
                  setupOption
                    ? 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                }`}
              >
                Continue Setup
              </button>
            </div>
          </div>
        )}

        {selectedStep === 2 && (
          <div className="text-center py-12">
            <HardDrive className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Upload Files</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Drag and drop your files here</p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Files
              </button>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md p-4 mt-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                The file browser will be implemented here with a button that says "Add Files Here" will call Uppy.js.
              </p>
            </div>
          </div>
        )}

        {selectedStep === 3 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Review Files</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View and approve your files</p>
          </div>
        )}

        {selectedStep === 4 && (
          <div className="text-center py-12">
            <Camera className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Sample Photos</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Review sample photos before production</p>
          </div>
        )}

        {selectedStep === 5 && (
          <div className="text-center py-12">
            <Camera className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Live Sample</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Review and approve live sample</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Versions;