import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105'
    },
    {
      id: '2',
      street: '456 Market Street, Suite 200',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103'
    },
    {
      id: '3',
      street: '789 Howard Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107'
    }
  ]);

  const addAddress = () => {
    const newAddress: Address = {
      id: Math.random().toString(36).substr(2, 9),
      street: '',
      city: '',
      state: '',
      zipCode: '',
    };
    setAddresses([...addresses, newAddress]);
  };

  const updateAddress = (id: string, updates: Partial<Address>) => {
    setAddresses(addresses.map(address => 
      address.id === id ? { ...address, ...updates } : address
    ));
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Addresses</h2>
        <button
          onClick={addAddress}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {addresses.map(address => (
          <div key={address.id} className="bg-gray-50 p-4 rounded-lg relative dark:bg-gray-900">
            <button
              onClick={() => deleteAddress(address.id)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Street Address</label>
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) => updateAddress(address.id, { street: e.target.value })}
                  className="mt-1 px-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">City</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => updateAddress(address.id, { city: e.target.value })}
                  className="mt-1 px-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => updateAddress(address.id, { state: e.target.value })}
                    className="mt-1 px-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">ZIP Code</label>
                  <input
                    type="text"
                    value={address.zipCode}
                    onChange={(e) => updateAddress(address.id, { zipCode: e.target.value })}
                    className="mt-1 px-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}