import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import ArtworkManagerPage from './ArtworkManager';
import { VersionsContext } from '../../../types';

export default function ArtworkManagerWrapper() {
  const navigate = useNavigate();
  const { selectedOrderData, selectedSection, setSelectedStep } = useOutletContext<VersionsContext>();
  
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

  return <ArtworkManagerPage setSelectedStep={setStep} selectedOrderData={selectedOrderData} />;
}