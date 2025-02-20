import React, { useState } from 'react';
import { MapPin, Plus, Trash2 } from 'lucide-react';

import AddressForm from './AddressForm';
import confirm from 'antd/es/modal/confirm';
import { Address } from '../../../types';

interface AddressesProps {
  addresses: Address[];
  addAddress: (payload: any) => void;
  editAddress: (payload: any) => void;
  deleteAddress: (payload: any) => void;
}

export default function AddressesTab({addresses, addAddress, editAddress, deleteAddress}: AddressesProps) {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const handleAddAddress = () => {
    setIsAddingAddress(true);
  };

  const handleDeleteAddress = async (addressId: number) => {
    // Implement delete functionality
    confirm({
      title: 'Are you sure you want to delete this address?',
      okText: 'Yes, Delete',
      cancelText: 'No, Cancel',
      okButtonProps: {
        className: 'bg-red-600 hover:bg-red-700',
      },
      onOk() {
        deleteAddress({mode: 'delete', address_id: addressId});
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  const handleCancel = () => {
    setIsAddingAddress(false);
  };

  const handleSubmit = async(dataParam:any) => {
    const data = {
      mode:'insert',
      entities_id: 266,
      address_street1: dataParam.address_street1,
      address_street2: dataParam.address_street2,
      address_street3: dataParam.address_street3,
      address_city: dataParam.address_city,
      address_state: dataParam.address_state,
      address_code: dataParam.address_code,
      address_country: dataParam.address_country
    }
    const baseUrl = `${window.location.protocol}//${window.location.host}/`;
    try{
      addAddress(data);
      // console.log(response);
      setIsAddingAddress(false);
      // getAllAddresses();
    } catch (error) {
      console.log('ajax call error:', error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Addresses</h2>
        <button
          onClick={handleAddAddress}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </button>
      </div>

      <div className="space-y-4">
        {addresses && addresses.map((address) => (
          <div
            key={address.address_id}
            className="bg-gray-50 rounded-lg p-4 flex justify-between items-start"
          >
            <div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span className="font-medium">{address.address_street1}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {address.address_city}, {address.address_state} {address.address_code}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDeleteAddress(address.address_id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAddingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <AddressForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}