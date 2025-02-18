import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import ArtworkManagerPage from './ArtworkManager';
import { VersionsContext } from '../../../types';

export default function ArtworkManagerWrapper() {
  const navigate = useNavigate();
  const { selectedSection, setSelectedStep } = useOutletContext<VersionsContext>();
  
  const setStep = async (step: number) => {
    await setSelectedStep(step)
    if (step === 3) {
      if (selectedSection === 'artwork') {
        navigate('../artwork-proof');
      } else if (selectedSection === 'data') {
        navigate('../data-proof');
      }
    }
  };

  return <ArtworkManagerPage setSelectedStep={setStep} />;
}