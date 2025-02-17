import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Versions from './Versions';

export default function VersionsWrapper() {
  const { section } = useParams();
  const [selectedStep, setSelectedStep] = useState(1);

  return (
    <Versions 
      selectedSection={section as 'packaging' | 'artwork' | 'data' | 'shipments'}
      selectedStep={selectedStep}
      setSelectedStep={setSelectedStep}
    />
  );
}