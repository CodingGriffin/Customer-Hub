import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import StepUpload from './StepUploads';
import { VersionsContext } from '../../../types';

export default function StepUploadWrapper() {
  const navigate = useNavigate();
  const { selectedSection, setSelectedStep } = useOutletContext<VersionsContext>();
  
  const setStep = async (step: number) => {
    await setSelectedStep(step)
    if (step === 3) {
      if (selectedSection === 'data') {
        navigate('../data-proof');
      } else {
        navigate('../artwork-proof');
      }
    }
  };

  return <StepUpload setSelectedStep={setStep} />;
}