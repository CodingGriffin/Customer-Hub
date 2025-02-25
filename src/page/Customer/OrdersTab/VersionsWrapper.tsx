import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Order } from '../../../types';
import Versions from './Versions';

interface OrderContext {
  selectedOrderData: Order;
  selectedSection: 'packaging' | 'artwork' | 'data' | 'shipments' | null;
  selectedStep: number;
  setSelectedStep: (step: number) => void;
}

export default function VersionsWrapper() {
  const { selectedOrderData, selectedSection, selectedStep, setSelectedStep } = useOutletContext<OrderContext>();

  return (
    <Versions 
      selectedOrderData={selectedOrderData}
      selectedSection={selectedSection}
      selectedStep={selectedStep}
      setSelectedStep={setSelectedStep}
    />
  );
}
