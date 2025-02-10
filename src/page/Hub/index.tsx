import React, { useState, useEffect } from 'react';
import { Users, MapPin, ShoppingCart, Building2, Sun, Moon } from 'lucide-react';
import ContactsTab from './ContactsTab';
import AddressesTab from './AddressesTab';
import OrdersTab from './OrdersTab';
import VendorOrdersTab from './VendorOrders';

type TabType = 'orders' | 'contacts' | 'addresses';
type HubType = 'customer' | 'vendor';

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
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {hubType === 'customer' ? 'Customer Hub' : 'Vendor Hub'}
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setHubType(hubType === 'customer' ? 'vendor' : 'customer')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Switch to {hubType === 'customer' ? 'Vendor' : 'Customer'} Hub
              </button>
            </div>
          </div>
        </div>
      </header>

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