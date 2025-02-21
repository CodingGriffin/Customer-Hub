import React, { useState, useEffect } from 'react';
import { Settings, FileText, Camera, ArrowLeft, Plus, Truck, Package, Palette, Database, ChevronDown, ChevronRight, HardDrive } from 'lucide-react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';

import Shipments from './Shipments';
import Versions from './Versions';
import { Order } from '../../../types';

interface OrdersDetailProps {
  selectedOrderData: any | null;
}

function OrdersDetail({selectedOrderData}: OrdersDetailProps) {
  const navigate = useNavigate();
  
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({});
  const [selectedSection, setSelectedSection] = useState<'packaging' | 'artwork' | 'data' | 'shipments' | null>(null);
  const [selectedStep, setSelectedStep] = useState<number>(1);

  // Simulating data fetch - replace with actual API call


  const resetView = () => {
    navigate('/orders');
  };

  const toggleVersion = (version: number) => {
    setExpandedVersions(prev => {
      const newState = { ...prev, [version]: !prev[version] };
      if (newState[version]) {
        setSelectedSection(null);
      }
      return newState;
    });
  };

  const chooseSection = async (section: 'packaging' | 'artwork' | 'data' | 'shipments' | null) => {
    if (section === 'shipments') {
      navigate(`/orders/${selectedOrderData?.job?.job_number}/shipments`);
    } else if (section) {
      navigate(`/orders/${selectedOrderData?.job?.job_number}/${section}/setup`);
    }
    setSelectedSection(section);
    setSelectedStep(1);
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'packaging': return <Package className="w-5 h-5" />;
      case 'artwork': return <Palette className="w-5 h-5" />;
      case 'data': return <Database className="w-5 h-5" />;
      case 'shipments': return <Truck className="w-5 h-5" />;
      default: return null;
    }
  };

  if (!selectedOrderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4 space-y-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={resetView}
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Orders
          </button>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Order #{selectedOrderData?.job?.job_number}
          </h2>
        </div>

        <div className="py-2 space-y-2">
          {!Object.values(expandedVersions).some(Boolean) && (
            <button
              onClick={() => chooseSection('shipments')}
              className={`w-full text-left px-4 py-2 flex items-center space-x-2 ${
                selectedSection === 'shipments'
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Truck className="w-5 h-5" />
              <span>Shipments</span>
            </button>
          )}

          <button
            onClick={() => toggleVersion(1)}
            className="w-full text-left px-4 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <span className="font-medium">Version 1</span>
            {expandedVersions[1] ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {expandedVersions[1] && (
            <div className="pl-4">
              {['packaging', 'artwork', 'data'].map((section) => (
                <button
                  key={section}
                  onClick={() => chooseSection(section as 'packaging' | 'artwork' | 'data')}
                  className={`w-full text-left px-4 py-2 flex items-center space-x-2 ${
                    selectedSection === section
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {getSectionIcon(section)}
                  <span className="capitalize">{section}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Outlet context={{ selectedOrderData, selectedSection, selectedStep, setSelectedStep }} />
      </div>
    </div>
  );
}

export default OrdersDetail;
