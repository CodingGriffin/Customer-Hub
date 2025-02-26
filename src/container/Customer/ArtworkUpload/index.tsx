import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import ArtworkManagerPage from '../../../page/Customer/OrdersTab/ArtworkManager';
import { VersionsContext } from '../../../types';

export default function ArtworkUpload() {
  const { version_id } = useParams();
  const navigate = useNavigate();
  const { selectedOrderData, selectedSection, setSelectedStep } = useOutletContext<VersionsContext>();
  
  const setStep = async (step: number) => {
    await setSelectedStep(step)
    if (step === 3) {
      if (selectedSection === 'data') {
        navigate(`../${version_id}/data-proof`);
      } else {
        navigate(`../${version_id}/artwork-proof`);
      }
    }
  };

  return <ArtworkManagerPage setSelectedStep={setStep} selectedOrderData={selectedOrderData} />;
}