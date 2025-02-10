import React, { useState } from 'react';
import { Users, MapPin, ShoppingCart } from 'lucide-react';

import { TabType } from '../../types';

interface TabNavProps {
  activeTab: TabType;
  setActiveTab: (status: TabType) => void;
}

const TabNav = React.memo(({ activeTab, setActiveTab }: TabNavProps) => {
  return (
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

  );
});

export default TabNav;