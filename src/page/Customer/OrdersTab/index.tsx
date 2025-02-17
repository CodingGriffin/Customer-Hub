import React, { useState } from 'react';
import OrdersList from './OrdersList';
import { useNavigate } from 'react-router-dom';
import { Order } from '../../../types';

export default function OrdersTab() {
  const navigate = useNavigate();
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: '12345',
      status: 'active',
      createdAt: '2024-03-15',
      jobs: [],
      productName: 'Custom USB Drive',
      productConfig: '32GB Metal Swivel, Brushed Silver',
      productImage: 'https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=50&h=50&q=80'
    },
    {
      id: '2',
      orderNumber: '12346',
      status: 'completed',
      createdAt: '2024-03-14',
      jobs: []
    },
    {
      id: '3',
      orderNumber: '12347',
      status: 'on-hold',
      createdAt: '2024-03-13',
      jobs: []
    }
  ]);

  const setSelectedOrder = (id: string) => {
    navigate(`/orders/${id}`);
  };

  return <OrdersList orders={orders} setSelectedOrder={setSelectedOrder} />;
}
