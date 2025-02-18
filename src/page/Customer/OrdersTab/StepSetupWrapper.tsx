import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import StepSetup from './StepSetup';
import { VersionsContext } from '../../../types';

export default function StepSetupWrapper() {
  const navigate = useNavigate();
  const { selectedSection, setSelectedStep } = useOutletContext<VersionsContext>();
  const setStep = async (step: number) => {
    await setSelectedStep(step)
    if (step === 2) {
      if (selectedSection === 'artwork') {
        navigate('../artwork-upload');
      } else if (selectedSection === 'data') {
        navigate('../data-upload');
      }
    }
  };

  return <StepSetup setSelectedStep={setStep} />;
}