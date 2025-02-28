import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import ArtworkManagerPage from '../../../page/Customer/OrdersTab/ArtworkManager';
import { VersionsContext } from '../../../types';

export default function ArtworkUpload() {
  const { version_id } = useParams();
  const navigate = useNavigate();
  const { selectedOrderData, setStep } = useOutletContext<VersionsContext>();


  return <ArtworkManagerPage setStep={setStep} selectedOrderData={selectedOrderData} />;
}