import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Order } from '../../../types';
import Versions from './Versions';

interface OrderContext {
  selectedOrderData: Order;
}

export default function VersionsWrapper() {
  const { selectedOrderData } = useOutletContext<OrderContext>();
  const [selectedStep, setSelectedStep] = useState(1);

  return (
    <Versions 
      selectedSection={section as 'packaging' | 'artwork' | 'data' | 'shipments'}
      selectedStep={selectedStep}
      setSelectedStep={setSelectedStep}
    />
  );
}
