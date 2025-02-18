import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import OrdersDetail from "../../../page/Customer/OrdersTab/OrdersDetail";
import { Order } from '../../../types';

function OrderDetail() {
  const { orderId } = useParams();
  const [selectedOrderData, setSelectedOrderData] = useState<Order | null>(null);
  useEffect(() => {
    // Mock data - replace with actual API call
    const mockOrder: Order = {
      id: orderId || '',
      orderNumber: '12345',
      status: 'active',
      createdAt: '2024-03-15',
      jobs: [],
      productName: 'Custom USB Drive',
      productConfig: '32GB Metal Swivel, Brushed Silver',
      productImage: 'https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=50&h=50&q=80'
    };
    setSelectedOrderData(mockOrder);
  }, [orderId]);

  return (
    <OrdersDetail selectedOrderData={selectedOrderData} />
  )

}

export default OrderDetail