import React from 'react';
import { Outlet } from 'react-router-dom';
import TabNav from '../../component/TabNavComponent';

function CustomerHubPage() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <TabNav />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default CustomerHubPage;
