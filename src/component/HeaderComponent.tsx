import React, { useState } from 'react';
import { Building2, Sun, Moon } from 'lucide-react';
import { HubType } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  hubType: HubType;
  toggleDarkMode: () => void;
  setHubType: (status: HubType) => void;
}

const Header = React.memo(({hubType, isDarkMode, toggleDarkMode, setHubType }: HeaderProps) => {

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {hubType === 'customer' ? 'Customer Hub - Well Assembled Meetings' : 'Vendor Hub'} 
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
  )
});

export default Header;
