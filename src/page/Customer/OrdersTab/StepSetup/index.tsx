import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';

import VersionSetup from './VersionSetup';

interface StepSetupProps {
  selectedOrderData: any,
  setStep: (id: number) => void;
  updateStatus: (pad_line_items_id: number) => void;
  fromParam: string | null;
}

function StepSetup({selectedOrderData, setStep, updateStatus, fromParam}: StepSetupProps) {

  const { version_id, section } = useParams();
  
  // Find the version in the selectedOrderData.versions array
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );

  const padType = section?.substring(0, 4);

  const pad_line_items_id = selectedOrderData?.pad_line_items?.find(
    (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
  )?.pad_line_items_id;

  const navigate = useNavigate();
  const [setupOption, setSetupOption] = useState<string | null>(fromParam ? fromParam : 'new');
  const [selectedSetupOption, setSelectedSetupOption] = useState<'new' | 'previous' | 'version' | null>(null);

  const continueSetup = () => {
    if (fromParam != setupOption) {
      Modal.confirm({
        title: 'You have already uploaded files! Are you sure you want to use PAD from another version or job?',
        okText: 'OK',
        cancelText: 'Cancel',
        cancelButtonProps: {
          className: 'bg-gray-300 hover:bg-gray-400',
        },
        okButtonProps: {
          className: 'bg-red-600 hover:bg-red-700',
        },
        onCancel() {
          console.log('Cancel');
        },

        async onOk() {
          switch (setupOption) {
            case 'new':
              updateStatus(pad_line_items_id);
              setStep(2);
              break;
            case 'version':
              setSelectedSetupOption('version');
              break;
            case 'previous':
              setStep(2);
              break;
            default:
              break;
          }
        },
      });
    } else {
      switch (setupOption) {
        case 'new':
          updateStatus(pad_line_items_id);
          setStep(2);
          break;
        case 'version':
          setSelectedSetupOption('version');
          break;
        case 'previous':
          setStep(2);
          break;
        default:
          break;
      }
    }

  }

  const returnSetup = () => {
    setSelectedSetupOption(null);
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

      <div className="flex justify-end">
        {selectedSetupOption == 'version' &&
          <button
            onClick={returnSetup}
            disabled={!setupOption}
            className={`px-4 py-2 rounded-md text-white ${
              setupOption
                ? 'bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600'
                : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
            }`}
          >
            Cancel
          </button>
        }
        <button
          onClick={continueSetup}
          disabled={!setupOption}
          className={`ml-4 px-4 py-2 rounded-md text-white ${
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