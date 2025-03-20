import React, { useState, useEffect } from 'react';
import { Users, MapPin, ShoppingCart } from 'lucide-react';

import CustomerHubPage from './Customer';
import OrdersList from '../container/Vendor/Orders'
import VendorOrdersTab from './Vendor';
import Header from '../component/HeaderComponent';

import { HubType } from '../types';

function HubPage() {
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
          <CustomerHubPage />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <OrdersList />
          </div>
        )}
      </main>
    </div>
  );
}

export default HubPage;