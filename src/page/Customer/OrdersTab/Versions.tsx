import React, { useState, useEffect } from 'react';
import { Settings, FileText, Camera, HardDrive } from 'lucide-react';

import { useNavigate, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

interface VersionsProps {
  selectedSection: 'packaging' | 'artwork' | 'data' | 'shipments' | null;
  selectedStep: number
  setSelectedStep: (step: number) => void;
}

function Versions({selectedSection, selectedStep, setSelectedStep}: VersionsProps) {
  const navigate = useNavigate();
  const { version_id } = useParams();

  const steps = [
    { number: 1, title: 'Setup', icon: <Settings className="w-5 h-5" /> },
    { number: 2, title: 'Upload', icon: <HardDrive className="w-5 h-5" /> },
    { number: 3, title: 'Proof', icon: <FileText className="w-5 h-5" /> },
    { number: 4, title: 'Photo Sample', icon: <Camera className="w-5 h-5" /> },
    { number: 5, title: 'Live Sample', icon: <Camera className="w-5 h-5" /> }
  ];

  const setStep = async (step: number) => {
    await setSelectedStep(step)
    switch (selectedSection) {
      case 'data':
        if (step ==1) {
          navigate(`../${selectedSection}/${version_id}/setup`);
        } else if (step == 2) {
          navigate(`../${selectedSection}/${version_id}/data-upload`);
        } else if (step == 3) {
          navigate(`../${selectedSection}/${version_id}/data-proof`);
        }
        break;
      case 'artwork':
        if (step ==1) {
          navigate(`../${selectedSection}/${version_id}/setup`);
        } else if (step == 2) {
          navigate(`../${selectedSection}/${version_id}/artwork-upload`);
        } else if (step == 3) {
          navigate(`../${selectedSection}/${version_id}/artwork-proof`);
        }
        break;
      default:
        if (step ==1) {
          navigate(`../${selectedSection}/${version_id}/setup`);
        } else if (step == 2) {
          navigate(`../${selectedSection}/${version_id}/artwork-upload`);
        } else if (step == 3) {
          navigate(`../${selectedSection}/${version_id}/artwork-proof`);
        }
        break;
    }
  };

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="ml-3 mb-4 relative flex justify-between">
          {steps.map((step) => (
            <button
              key={step.number}
              onClick={() => setStep(step.number)}
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

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ml-3">
        <Outlet context={{ selectedSection, setSelectedStep }} />
      </div>
    </>
  )
}

export default Versions;
