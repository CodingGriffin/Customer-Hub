import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Check, Upload, X } from 'lucide-react';
import { Modal } from 'antd';

import PhotoSamples from './PhotoSamples';
import UploadModal from './UploadModal';

interface PartitionCardProps {
  partition: any;
  comments: any[];
  samples: any[];
  partitionComments: any[];
  selectedOrderData: any;
  onVerificationChange: (verified: boolean) => void;
  addPartitionComment: (comment: string, sample_id: number, field: string) => void;
  addPhotoSampleComment: (comment: string, sample_id: number) => void;
  updatePartitionVerificationState: (partition_id: number, state: string, rev_partition: number) => void;
  deletePhotoSample: (photo_sample_id: number) => void,
}

const PartitionCard: React.FC<PartitionCardProps> = ({
  partition,
  comments,
  partitionComments,
  selectedOrderData,
  samples,
  onVerificationChange,
  addPartitionComment,
  addPhotoSampleComment,
  updatePartitionVerificationState,
  deletePhotoSample,
}) => {
  const [verificationState, setVerificationState] = useState<'verify' | 'confirm' | 'matching' | 'not-matching'>('verify');
  const [validationFields, setValidationFields] = useState<{
    [key: string]: { checked: boolean; value: string };
  }>({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseWUploadModal = useCallback(() => {
    setShowUploadModal(false);
  }, []);

  const handleOpenUploadModal = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('resource_id', partition.rev_partition_id); // Add or update the query parameter
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });

    setShowUploadModal(true);
  };

  const { version_id, section } = useParams();
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );

  // Get partitionComments for this partition
  const getPartitionComment = async () => {
    // Filter partitionComments where resource_id matches partition.rev_partition_id
    const comments = partitionComments.filter(
      (comment: any) => comment.resource_id === partition.rev_partition_id
    );
    console.log(partitionComments)
    
    // Split table_code by underscores
    if (comments.length > 0) {
      const parts = comments[0].table_code?.split('_');
      
      // Get the middle word if it exists
      const middleWord = parts.length >= 3 ? parts[1] : '';
      const commentText = comments[0].comment
      await setValidationFields({
        ...validationFields,
        [middleWord]: { checked: false, value: commentText },
      });
      console.log(validationFields, comments)
    }
  };
  useEffect(() => {
    getPartitionComment();
  }, [partitionComments]);
  
  // Get the first key where checked is false
  const getFirstUncheckedField = () => {
    const keys = Object.keys(validationFields);
    for (const key of keys) {
      if (validationFields[key]?.checked === false) {
        return key;
      }
    }
    return ''; // Return null if all fields are checked
  };
  
  const driveLabels = {
    windowsIcon: partition.rev_partition_favicon,
    windowsLabel: partition.rev_partition_winlab,
    macIcon: partition.rev_partition_icns,
    macDriveLabel: partition.rev_partition_vollab,
  };
  
  const metadata = {
    format: partition.rev_partition_filesystem,
    totalFolders: partition.rev_partition_folders,
    totalFiles: partition.rev_partition_files,
    totalSize: partition.rev_partition_size,
  };
  
  useEffect(() => {
    console.log(partition.verification_state)
    if(partition.verification_state == 'matching' || partition.verification_state == 'not-matching') onVerificationChange(true);
    setVerificationState(partition.verification_state)
  }, []);
  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const resetVerification = () => {
    setVerificationState('verify');
    setValidationFields({});
    onVerificationChange(false);
  };

  const startOver = () => {
    if (verificationState === 'matching' || verificationState === 'not-matching') {
      Modal.confirm({
        title: 'Do you want to start over the process?',
        okText: 'Yes, Reset',
        cancelText: 'No, Cancel',
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
          resetVerification();
        },
      });
    }
  }

  const handleVerifyClick = () => {
    if (verificationState === 'matching' || verificationState === 'not-matching') {

    } else if (verificationState === 'verify') {
      const initialFields: { [key: string]: { checked: boolean; value: string } } = {};
      
      Object.keys(driveLabels).forEach((key) => {
        initialFields[key] = { checked: true, value: '' };
      });
      Object.keys(metadata).forEach((key) => {
        initialFields[key] = { checked: true, value: '' };
      });
      if (partition.rev_partition_writeprotect !== undefined) {
        initialFields.writeProtected = { checked: true, value: '' };
      }
      
      setValidationFields(initialFields);
      setVerificationState('confirm');
    } else if (verificationState === 'confirm') {
      const allFieldsMatch = Object.values(validationFields).every(field => field.checked);
      const commentKey = getFirstUncheckedField();

      if (!allFieldsMatch && commentKey != '') addPartitionComment(validationFields[`${commentKey}`].value, partition.rev_partition_id, commentKey);
      updatePartitionVerificationState(partition.rev_partition_id, allFieldsMatch ? 'matching' : 'not-matching', partition.rev_partition);
      
      setVerificationState(allFieldsMatch ? 'matching' : 'not-matching');
      onVerificationChange(true);
    }
  };

  const handleCheckChange = (key: string) => {
    setValidationFields(prev => {
      const newFields = {
        ...prev,
        [key]: { ...prev[key], checked: !prev[key].checked },
      };
      
      const allFieldsMatch = Object.values(newFields).every(field => field.checked);
      if (!allFieldsMatch && verificationState === 'matching') {
        setVerificationState('not-matching');
        // onVerificationChange(false);
      }
      
      return newFields;
    });
  };

  const handleInputChange = (key: string, value: string) => {
    setValidationFields({
      [key]: { ...validationFields[key], value },
    });
  };

  const displayLabels: { [key: string]: string } = {
    windowsIcon: 'Windows Icon',
    windowsLabel: 'Windows Label',
    macIcon: 'Mac Icon',
    macDriveLabel: 'Mac/Drive Label',
    format: 'Format',
    totalFolders: 'Total Folders',
    totalFiles: 'Total Files',
    totalSize: 'Total Size(bytes)',
    writeProtected: 'Write Protected',
  };

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

  const shouldShowValidationFields = verificationState === 'confirm' || verificationState === 'not-matching';

  const renderPartitionFiles = () => {
    const fileUrl = partition.rev_partition === 1 
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

  return (
    <div className="mb-8">
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Partition #{partition.rev_partition}
            {partition.rev_partition_writeprotect != 0 && (
              <span className="ml-2 text-sm font-medium px-2 py-1 bg-red-100 text-red-800 rounded-md">
                Write Protected
              </span>
            )}
          </h2>
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
            {/* {(verificationState === 'matching' || verificationState === 'not-matching') && */}
              <button
                onClick={() => handleOpenUploadModal()}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Upload className="w-4 h-4 mr-1.5" />
                <span>Upload</span>
              </button>
            {/* } */}
            <button
              onClick={handleVerifyClick}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center gap-1 ${getVerifyButtonStyles()}`}
              disabled={verificationState == 'matching' || verificationState == 'not-matching'}
            >
              {verificationState === 'matching' && <Check size={16} />}
              {getButtonText()}
            </button>
            {(verificationState === 'matching' || verificationState === 'not-matching') &&
              <button
                onClick={startOver}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-200 flex items-center gap-1"
              >
                <Check size={16} />
                Start Over
              </button>
            }
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {partition.rev_partition_upload && <a href={partition.rev_partition_upload}>{partition.rev_partition_upload}</a>}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Drive Labels</h3>
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={16} className="text-green-600" />
            </div>
          </div>
          <div className="space-y-4">
            {Object.entries(driveLabels).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{displayLabels[key]}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{value}</span>
                    {verificationState === 'confirm' && (
                      <input
                        type="checkbox"
                        checked={validationFields[key]?.checked ?? true}
                        onChange={() => handleCheckChange(key)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </div>
                {shouldShowValidationFields && validationFields[key]?.checked==false && (
                  <div className={`p-2 rounded-md ${verificationState === 'not-matching' ? 'bg-pink-50' : ''}`}>
                    <input
                      type="text"
                      value={validationFields[key]?.value ?? ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      placeholder="Enter information about the issue..."
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 ${
                        verificationState === 'not-matching'
                          ? 'bg-pink-50 border-pink-300 focus:ring-pink-500 focus:border-pink-500'
                          : 'border-blue-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Metadata</h3>
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={16} className="text-green-600" />
            </div>
          </div>
          <div className="space-y-4">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{displayLabels[key]}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{key == 'totalSize' ? Number(value).toLocaleString() : value}</span>
                    {verificationState === 'confirm' && (
                      <input
                        type="checkbox"
                        checked={validationFields[key]?.checked ?? true}
                        onChange={() => handleCheckChange(key)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </div>
                {shouldShowValidationFields && validationFields[key]?.checked==false && (
                  <div className={`p-2 rounded-md ${verificationState === 'not-matching' ? 'bg-pink-50' : ''}`}>
                    <input
                      type="text"
                      value={validationFields[key]?.value ?? ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      placeholder="Enter information about the issue..."
                      className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 ${
                        verificationState === 'not-matching'
                          ? 'bg-pink-50 border-pink-300 focus:ring-pink-500 focus:border-pink-500'
                          : 'border-blue-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <PhotoSamples selectedOrderData={selectedOrderData} samples={samples} resource_id={partition.rev_partition_id} comments={comments} addPhotoSampleComment={addPhotoSampleComment} deletePhotoSample={deletePhotoSample} />
      {showUploadModal && <UploadModal _closeUploadModal={handleCloseWUploadModal} version_name={currentVersion?.version_name} section={section} />}
      {/* {selectedImage && (
        <ImageViewer
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          title={selectedImage.title}
        />
      )} */}
    </div>
  );
};

export default PartitionCard;

