import React, { useState, useEffect } from 'react';
import { Users, MapPin, ShoppingCart } from 'lucide-react';

import Header from '../../component/Hub/HeaderComponent';
import ContactsTab from './ContactsTab';
import AddressesTab from './AddressesTab';
import OrdersTab from './OrdersTab';
import VendorOrdersTab from './VendorOrders';

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
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`${
                    activeTab === 'orders'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                  } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`${
                    activeTab === 'contacts'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                  } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Contacts
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`${
                    activeTab === 'addresses'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                  } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Addresses
                </button>
              </nav>
            </div>

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