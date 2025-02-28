import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import StepUpload from '../../../page/Customer/OrdersTab/StepUploads';
import { VersionsContext } from '../../../types';

export default function StepUploadContainer() {
  const { setStep } = useOutletContext<VersionsContext>();

  return <StepUpload setStep={setStep} />;
}