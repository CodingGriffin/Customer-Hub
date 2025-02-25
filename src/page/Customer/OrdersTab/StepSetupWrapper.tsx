import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import StepSetup from './StepSetup';
import { VersionsContext } from '../../../types';

export default function StepSetupWrapper() {
  const { version_id } = useParams();
  const navigate = useNavigate();
  const { selectedSection, setSelectedStep } = useOutletContext<VersionsContext>();
  const setStep = async (step: number) => {
    await setSelectedStep(step)
    console.log(version_id)
    if (step === 2) {
      if (selectedSection === 'data') {
        navigate(`../${version_id}/data-upload`);
      } else {
        navigate(`../${version_id}/artwork-upload`);
      }
    }
  };

  return <StepSetup setSelectedStep={setStep} />;
}