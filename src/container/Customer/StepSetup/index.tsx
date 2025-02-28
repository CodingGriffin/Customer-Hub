import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import StepSetup from '../../../page/Customer/OrdersTab/StepSetup';
import { VersionsContext } from '../../../types';

export default function StepSetupContainer() {

  const { setStep, currentStep } = useOutletContext<VersionsContext>();

  if (currentStep) {
    setStep(currentStep);
  }

  return <StepSetup setStep={setStep} />;
}
