import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { ImageOff, MailCheck } from 'lucide-react';

interface StepSetupProps {
  selectedOrderData: any,
  samples: any,
}

function PhotoSamples({selectedOrderData, samples}: StepSetupProps) {

  const { version_id, section } = useParams();
  
  // Find the version in the selectedOrderData.versions array
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );

  return (
    <div>
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
            Please wait until the production department uploads a photo of a product sample.
          </p>
          
          <div className="flex items-center justify-center text-amber-500 dark:text-amber-400 font-medium">
            <MailCheck className="mr-2 h-5 w-5" />
            <span>We will reach out asap</span>
          </div>
        </div>
      }
    </div>
  )
}

export default PhotoSamples;