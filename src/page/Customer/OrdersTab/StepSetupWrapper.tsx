import React from 'react';
import { useNavigate } from 'react-router-dom';
import StepSetup from './StepSetup';

export default function StepSetupWrapper() {
  const navigate = useNavigate();
  
  const setSelectedStep = (step: number) => {
    if (step === 2) {
      navigate('../upload');
    }
  };

  return <StepSetup setSelectedStep={setSelectedStep} />;
}