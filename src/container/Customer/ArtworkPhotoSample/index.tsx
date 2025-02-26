import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import ArtworkPhotoSample from '../../../page/Customer/OrdersTab/ArtworkPhotoSample';
import { VersionsContext } from '../../../types';

export default function ArtworkProof() {
  const { version_id } = useParams();
  const navigate = useNavigate();
  const { selectedOrderData, selectedSection, setSelectedStep } = useOutletContext<VersionsContext>();
  
  const setStep = async (step: number) => {
    await setSelectedStep(step)
    if (step === 5) {
      if (selectedSection === 'data') {
        navigate(`../${version_id}/data-live-sample`);
      } else {
        navigate(`../${version_id}/artwork-live-sample`);
      }
    }
  };

  return <ArtworkPhotoSample />;
}