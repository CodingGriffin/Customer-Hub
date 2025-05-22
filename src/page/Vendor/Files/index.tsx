import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { FileSearch, FileX, FileText, File, Image, HardDrive, Database, Monitor, X, Check, ArrowRight } from 'lucide-react';

import Empty from '../../../component/Vendor/Files/Empty';

interface RevisionsProps {
  selectedOrderData: any,
  revisions: any,
}

function Files({selectedOrderData, revisions}: RevisionsProps) {
  const originalPdfUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const [verificationState, setVerificationState] = useState<'verify' | 'confirm' | 'matching' | 'not-matching'>('verify');
  const [validationFields, setValidationFields] = useState<{
    [key: string]: { checked: boolean; value: string };
  }>({});
  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const getFileName = (filePath: string) => {
    return filePath.split('/').pop() || filePath;
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop();
    
    if (extension === 'pdf') {
      return <FileText className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mr-2" />;
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return <Image className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mr-2" />;
    }
    return <File className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mr-2" />;
  };

  // Get current revision and all its partitions
  const getCurrentRevisionPartitions = () => {
    if (!Array.isArray(revisions)) return [];
    
    const currentRevision = revisions.find((rev: any) => rev.superceded === 0);
    if (!currentRevision || !Array.isArray(currentRevision.partitions)) return [];
    
    return currentRevision.partitions;
  };

  const renderPartitionFiles = () => {
    const fileUrl = 1 === 1 
      ? 'https://hamskea.com/downloads/partition1'
      : 'partition-files.zip';

    return (
      <>
        {isValidUrl(fileUrl) ? (
          <a href={fileUrl} className="text-blue-600 hover:text-blue-800 underline">
            partition-files.zip
          </a>
        ) : (
          <span>partition-files.zip</span>
        )}
        <span className="text-red-500 text-xs ml-1">Report Problem</span>
      </>
    );
  };

  // Reset verification to initial state
  const resetVerification = () => {
    setVerificationState('verify');
    setValidationFields({});
  };

  // Handle verify button click based on current state
  const handleVerifyClick = () => {
    if (verificationState === 'matching' || verificationState === 'not-matching') {
      // Reset if already verified
      resetVerification();
    } else if (verificationState === 'verify') {
      // Initialize fields for verification
      const initialFields: { [key: string]: { checked: boolean; value: string } } = {};
      
      // Set all fields to checked by default
      const fieldKeys = ['filesystem', 'folders', 'files', 'size', 'favicon', 'winlab', 'icns', 'vollab'];
      fieldKeys.forEach(key => {
        initialFields[key] = { checked: true, value: '' };
      });
      
      setValidationFields(initialFields);
      setVerificationState('confirm');
    } else if (verificationState === 'confirm') {
      // Check if all fields are checked
      const allFieldsMatch = Object.values(validationFields).every(field => field.checked);
      setVerificationState(allFieldsMatch ? 'matching' : 'not-matching');
    }
  };

  // Handle checkbox change
  const handleCheckChange = (key: string) => {
    setValidationFields(prev => ({
      ...prev,
      [key]: { ...prev[key], checked: !prev[key].checked },
    }));
  };

  // Handle input change for notes
  const handleInputChange = (key: string, value: string) => {
    setValidationFields({
      ...validationFields,
      [key]: { ...validationFields[key], value },
    });
  };

  // Get button styles based on verification state
  const getVerifyButtonStyles = () => {
    switch (verificationState) {
      case 'verify':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'confirm':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'matching':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'not-matching':
        return 'bg-red-500 hover:bg-red-600 text-white';
    }
  };

  // Get button text based on verification state
  const getButtonText = () => {
    switch (verificationState) {
      case 'verify':
        return 'Verify';
      case 'confirm':
        return 'Confirm';
      case 'matching':
        return 'Matching';
      case 'not-matching':
        return 'Not Matching';
    }
  };
  const partitions = getCurrentRevisionPartitions();
  const allPartitionsVerified = 1 === partitions.length;

  console.log(partitions);

  return (
    <div>
      {revisions === "No revisions found." ? <Empty />
      : (
        <>
          {/* Partitions Information */}
          {partitions.length > 0 ? (
            partitions.map((partition: any, index: number) => (
              <div key={index} className="mb-8">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                        Partition #{partition.rev_partition}
                      </h2>
                      {partition.rev_partition_writeprotect === 1 && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                          Write Protected
                        </span>
                      )}
                      {partition.rev_partition_writeprotect === 0 && (
                        <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                          No Write-Protection
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {verificationState === 'confirm' && (
                        <button
                          onClick={resetVerification}
                          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 flex items-center gap-1"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={handleVerifyClick}
                        className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center gap-1 ${getVerifyButtonStyles()}`}
                      >
                        {verificationState === 'matching' && <Check size={16} />}
                        {getButtonText()}
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    The files have been provided here: {renderPartitionFiles()}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Drive Labels */}
                  <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold dark:text-white">Drive Labels</h3>
                      <span className="text-green-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Windows Icon</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono dark:text-white">{partition.rev_partition_favicon || 'DATA'}</span>
                          {verificationState === 'confirm' && (
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              checked={validationFields['favicon']?.checked !== false}
                              onChange={() => handleCheckChange('favicon')}
                            />
                          )}
                        </div>
                      </div>
                      {(verificationState === 'confirm' || verificationState === 'not-matching') && 
                       validationFields['favicon']?.checked === false && (
                        <div className="pl-4 border-l-2 border-gray-200">
                          <input
                            type="text"
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Enter note about Windows icon"
                            value={validationFields['favicon']?.value || ''}
                            onChange={(e) => handleInputChange('favicon', e.target.value)}
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Windows Label</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono dark:text-white">{partition.rev_partition_winlab || 'DATA'}</span>
                          {verificationState === 'confirm' && (
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              checked={validationFields['winlab']?.checked !== false}
                              onChange={() => handleCheckChange('winlab')}
                            />
                          )}
                        </div>
                      </div>
                      {(verificationState === 'confirm' || verificationState === 'not-matching') && 
                       validationFields['winlab']?.checked === false && (
                        <div className="pl-4 border-l-2 border-gray-200">
                          <input
                            type="text"
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Enter note about Windows label"
                            value={validationFields['winlab']?.value || ''}
                            onChange={(e) => handleInputChange('winlab', e.target.value)}
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Mac Icon</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono dark:text-white">{partition.rev_partition_icns || 'DATA'}</span>
                          {verificationState === 'confirm' && (
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              checked={validationFields['icns']?.checked !== false}
                              onChange={() => handleCheckChange('icns')}
                            />
                          )}
                        </div>
                      </div>
                      {(verificationState === 'confirm' || verificationState === 'not-matching') && 
                       validationFields['icns']?.checked === false && (
                        <div className="pl-4 border-l-2 border-gray-200">
                          <input
                            type="text"
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Enter note about Mac icon"
                            value={validationFields['icns']?.value || ''}
                            onChange={(e) => handleInputChange('icns', e.target.value)}
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Mac/Drive Label</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono dark:text-white">{partition.rev_partition_vollab || 'DATA'}</span>
                          {verificationState === 'confirm' && (
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              checked={validationFields['vollab']?.checked !== false}
                              onChange={() => handleCheckChange('vollab')}
                            />
                          )}
                        </div>
                      </div>
                      {(verificationState === 'confirm' || verificationState === 'not-matching') && 
                       validationFields['vollab']?.checked === false && (
                        <div className="pl-4 border-l-2 border-gray-200">
                          <input
                            type="text"
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Enter note about Mac/Drive label"
                            value={validationFields['vollab']?.value || ''}
                            onChange={(e) => handleInputChange('vollab', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Content Overview */}
                  <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold dark:text-white">Metadata</h3>
                      <span className="text-green-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">File System</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono dark:text-white">{partition.rev_partition_filesystem || 'FAT32'}</span>
                          {verificationState === 'confirm' && (
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              checked={validationFields['filesystem']?.checked !== false}
                              onChange={() => handleCheckChange('filesystem')}
                            />
                          )}
                        </div>
                      </div>
                      {(verificationState === 'confirm' || verificationState === 'not-matching') && 
                       validationFields['filesystem']?.checked === false && (
                        <div className="pl-4 border-l-2 border-gray-200">
                          <input
                            type="text"
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Enter note about file system"
                            value={validationFields['filesystem']?.value || ''}
                            onChange={(e) => handleInputChange('filesystem', e.target.value)}
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Folders</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono dark:text-white">{partition.rev_partition_folders || '0'}</span>
                          {verificationState === 'confirm' && (
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              checked={validationFields['folders']?.checked !== false}
                              onChange={() => handleCheckChange('folders')}
                            />
                          )}
                        </div>
                      </div>
                      {(verificationState === 'confirm' || verificationState === 'not-matching') && 
                       validationFields['folders']?.checked === false && (
                        <div className="pl-4 border-l-2 border-gray-200">
                          <input
                            type="text"
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Enter note about folders"
                            value={validationFields['folders']?.value || ''}
                            onChange={(e) => handleInputChange('folders', e.target.value)}
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Files</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono dark:text-white">{partition.rev_partition_files || '0'}</span>
                          {verificationState === 'confirm' && (
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              checked={validationFields['files']?.checked !== false}
                              onChange={() => handleCheckChange('files')}
                            />
                          )}
                        </div>
                      </div>
                      {(verificationState === 'confirm' || verificationState === 'not-matching') && 
                       validationFields['files']?.checked === false && (
                        <div className="pl-4 border-l-2 border-gray-200">
                          <input
                            type="text"
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Enter note about files"
                            value={validationFields['files']?.value || ''}
                            onChange={(e) => handleInputChange('files', e.target.value)}
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Size(bytes)</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono dark:text-white">
                            {partition.rev_partition_size 
                              ? Number((partition.rev_partition_size)).toLocaleString() 
                              : '0'}
                          </span>
                          {verificationState === 'confirm' && (
                            <input 
                              type="checkbox" 
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                              checked={validationFields['size']?.checked !== false}
                              onChange={() => handleCheckChange('size')}
                            />
                          )}
                        </div>
                      </div>
                      {(verificationState === 'confirm' || verificationState === 'not-matching') && 
                       validationFields['size']?.checked === false && (
                        <div className="pl-4 border-l-2 border-gray-200">
                          <input
                            type="text"
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Enter note about size"
                            value={validationFields['size']?.value || ''}
                            onChange={(e) => handleInputChange('size', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 sm:px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              No partitions found in this revision
            </div>
          )}
        </>
      )}

        {/* <div className="fixed realtive bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            className={`px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-lg font-medium transition-all duration-200 ${
              allPartitionsVerified
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!allPartitionsVerified}
          >
            {allPartitionsVerified ? 'Continue' : 'Verify to Continue'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div> */}
    </div>
  );
}

export default Files;
