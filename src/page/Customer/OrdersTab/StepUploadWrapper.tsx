import React from 'react';
import { useNavigate } from 'react-router-dom';
import StepUpload from './StepUploads';

export default function StepUploadWrapper() {
  const navigate = useNavigate();
  
  const setSelectedStep = (step: number) => {
    if (step === 3) {
      navigate('../proof');
    }
  };

  return <StepUpload setSelectedStep={setSelectedStep} />;
}