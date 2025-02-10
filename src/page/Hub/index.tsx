import React, { useState, useEffect } from 'react';
import { Users, MapPin, ShoppingCart } from 'lucide-react';

import ContactsTab from './ContactsTab';
import AddressesTab from './AddressesTab';
import OrdersTab from './OrdersTab';
import VendorOrdersTab from './VendorOrders';
import Header from '../../component/Hub/HeaderComponent';
import TabNav from '../../component/Hub/TabNav';

import { TabType, HubType } from '../../types';

function HubPage() {
  const [activeTab, setActiveTab] = useState<TabType>('orders');
  const [hubType, setHubType] = useState<HubType>('customer');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <Header hubType={hubType} isDarkMode={isDarkMode} setHubType={setHubType} toggleDarkMode={toggleDarkMode} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {hubType === 'customer' ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="p-6">
              {activeTab === 'orders' && <OrdersTab onOrdersTabClick={() => setActiveTab('orders')} />}
              {activeTab === 'contacts' && <ContactsTab />}
              {activeTab === 'addresses' && <AddressesTab />}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <VendorOrdersTab />
          </div>
        )}
      </main>
    </div>
  );
}

export default HubPage;