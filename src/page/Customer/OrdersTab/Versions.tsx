import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Settings, FileText, Camera, HardDrive } from 'lucide-react';
import confirm from 'antd/es/modal/confirm';

interface VersionsProps {
  selectedOrderData: any
  currentStep: number
  setStep: (step: number) => void;
  updateStatus: (pad_line_items_id: number, abbr: string, status: number) => void;
}

function Versions({ currentStep, selectedOrderData, setStep, updateStatus}: VersionsProps) {
  const { version_id, section } = useParams();

  const steps = [
    { number: 1, title: 'Setup', icon: <Settings className="w-5 h-5" /> },
    { number: 2, title: 'Upload', icon: <HardDrive className="w-5 h-5" /> },
    { number: 3, title: 'Proof', icon: <FileText className="w-5 h-5" /> },
    { number: 4, title: 'Photo Sample', icon: <Camera className="w-5 h-5" /> },
    { number: 5, title: 'Live Sample', icon: <Camera className="w-5 h-5" /> }
  ];

  const padType = section?.substring(0, 4);

  const pad_line_items_id = selectedOrderData?.pad_line_items?.find(
    (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
  )?.pad_line_items_id;

  const updateStep = async (step: number) => {
    if(step === 2 && currentStep > step) {
      confirm({
        title: 'Are you sure you want to reset the upload status?',
        okText: 'Yes, Reset',
        cancelText: 'No, Cancel',
        okButtonProps: {
          className: 'bg-red-600 hover:bg-red-700',
        },
        async onOk() {
          await updateStatus(pad_line_items_id, "v-upload-wait", 0);
          await setStep(step);

        },
        onCancel() {
          console.log('Cancel');
        }
      });
    }
  }

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
              onClick={() => updateStep(step.number)}
              className={`flex items-center ${
                currentStep === step.number
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              disabled={currentStep < step.number}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep === step.number
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
        <Outlet context={{ selectedOrderData, setStep, currentStep }} />
      </div>
    </>
  )
}

export default Versions;
