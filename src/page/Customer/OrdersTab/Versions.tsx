import React, { useState, useEffect } from 'react';
import { Settings, FileText, Camera, HardDrive } from 'lucide-react';

import StepSetup from './StepSetup';
import StepUpload from './StepUploads';
import ArtworkManagerPage from '../../ArtworkManager';

interface VersionsProps {
  selectedSection: 'packaging' | 'artwork' | 'data' | 'shipments';
  selectedStep: number;
  setSelectedStep: (step: number) => void;
}

function Versions({selectedSection, selectedStep, setSelectedStep }: VersionsProps) {

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
              disabled={selectedStep < step.number}
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
          <StepSetup setSelectedStep = {setSelectedStep} />
        )}

        {selectedStep === 2 && (
          selectedSection === 'data' ? <StepUpload /> : <ArtworkManagerPage />
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