import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { Coffee, MailCheck } from 'lucide-react';

interface StepSetupProps {
  selectedOrderData: any,
}

function Production({selectedOrderData}: StepSetupProps) {

  const { version_id, section } = useParams();
  
  // Find the version in the selectedOrderData.versions array
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );

  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center mb-6">
      <div className="flex justify-center mb-6">
        <Coffee className="h-24 w-24 text-indigo-500 dark:text-indigo-400" strokeWidth={1.5} />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Preparing a Proof</h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Hang tight! Our design wizards are working their magic. We'll give you a heads-up when your custom proof is ready to check out.
      </p>
      
      <div className="flex items-center justify-center text-indigo-500 dark:text-indigo-400 font-medium">
        <MailCheck className="mr-2 h-5 w-5" />
        <span>Sit back, relax, we've got this</span>
      </div>
    </div>
  )
}

export default Production;