import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Order } from '../../../types';
import Versions from './Versions';

interface OrderContext {
  selectedOrderData: Order;
  selectedSection: 'packaging' | 'artwork' | 'data' | 'shipments' | null;
}

export default function VersionsWrapper() {
  const { selectedOrderData, selectedSection } = useOutletContext<OrderContext>();

  return (
    <Versions 
      selectedSection={selectedSection}
    />
  );
}
