import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { ImageOff, MailCheck, Upload } from 'lucide-react';
import UploadModal from './UploadModal';

interface StepSetupProps {
  selectedOrderData: any,
  samples: any,
}

function PhotoSamples({selectedOrderData, samples}: StepSetupProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const { version_id, section } = useParams();
  
  // Find the version in the selectedOrderData.versions array
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );

  const handleCloseWUploadModal = useCallback(() => {
    setShowUploadModal(false);
  }, []);

  return (
    <div>
      <button 
        onClick={() => setShowUploadModal(true)}
        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
      >
        <Upload className="w-4 h-4 mr-1.5" />
        <span>Upload</span>
      </button>
      {
        samples.length > 0 ? (
          "samples"
        ) :

        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center mb-6">
          <div className="flex justify-center mb-6">
            <ImageOff className="h-24 w-24 text-amber-500 dark:text-amber-400" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">No Photo Samples Yet</h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Looks like you haven't uploaded any samples yet.
          </p>
          
          <div className="flex items-center justify-center text-amber-500 dark:text-amber-400 font-medium">
            <MailCheck className="mr-2 h-5 w-5" />
            <span>Upload samples to get started</span>
          </div>

        </div>
      }
      {showUploadModal && <UploadModal _closeUploadModal = {handleCloseWUploadModal} version_name={currentVersion?.version_name} section={section} />}

    </div>
  )
}

export default PhotoSamples;