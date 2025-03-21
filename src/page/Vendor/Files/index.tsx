import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { FileSearch, FileX } from 'lucide-react';

interface StepSetupProps {
  selectedOrderData: any,
}

function Files({selectedOrderData}: StepSetupProps) {

  const { version_id, section } = useParams();
  
  // Find the version in the selectedOrderData.versions array
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );

  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center mb-6">
      <div className="flex justify-center mb-6">
        <FileX className="h-24 w-24 text-rose-500 dark:text-rose-400" strokeWidth={1.5} />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">No Files Uploaded</h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Looks like you haven't uploaded any files yet. We need your materials to create something amazing for you!
      </p>
      
      <div className="flex items-center justify-center text-rose-500 dark:text-rose-400 font-medium">
        <FileSearch className="mr-2 h-5 w-5" />
        <span>Upload files to get started</span>
      </div>
    </div>
  )
}

export default Files;