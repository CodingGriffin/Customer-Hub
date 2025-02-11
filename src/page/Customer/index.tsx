import React, { useState, useEffect } from 'react';

import ContactsTabContainer from '../../container/Customer/ContractsTabContainer';
import AddressesTabContainer from '../../container/Customer/AddressesTabContainer';
import OrdersTabContainer from '../../container/Customer/OrdersTabContainer';
import TabNav from '../../component/TabNavComponent';

import { TabType } from '../../types';

function CustomerHubPage() {
  const [activeTab, setActiveTab] = useState<TabType>('orders');
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-6">
        {activeTab === 'orders' && <OrdersTabContainer />}
        {activeTab === 'contacts' && <ContactsTabContainer />}
        {activeTab === 'addresses' && <AddressesTabContainer />}
      </div>
    </div>
  );
}

export default CustomerHubPage;