import React, { useState, useEffect } from 'react';
import { Settings, FileText, Camera, ArrowLeft, Plus, Truck, Package, Palette, Database, ChevronDown, ChevronRight, HardDrive } from 'lucide-react';

import Shipments from './Shipments';
import Versions from './Versions';

interface OrdersDetailProps {
  selectedOrderData: any;
  setSelectedOrder: (id: any) => void;
}

function OrdersDetail({selectedOrderData, setSelectedOrder} : OrdersDetailProps) {
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({});
  const [selectedSection, setSelectedSection] = useState<'packaging' | 'artwork' | 'data' | 'shipments' | null>(null);
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const resetView = () => {
    setSelectedOrder(null);
    setSelectedSection(null);
    setSelectedStep(1);
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
    await setSelectedStep(1);
    await setSelectedSection(section);
  }

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'packaging': return <Package className="w-5 h-5" />;
      case 'artwork': return <Palette className="w-5 h-5" />;
      case 'data': return <Database className="w-5 h-5" />;
      case 'shipments': return <Truck className="w-5 h-5" />;
      default: return null;
    }
  };

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
            Order #{selectedOrderData?.orderNumber}
          </h2>
        </div>

        <div className="py-2 space-y-2">
          {!Object.values(expandedVersions).some(Boolean) && (
            <button
              onClick={() => setSelectedSection('shipments')}
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
                  onClick={() => chooseSection(section as any)}
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
        {selectedSection ? (
          <div className="p-6 space-y-8">
            {expandedVersions[1] && selectedOrderData?.productImage && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedOrderData.productImage}
                    alt={selectedOrderData.productName}
                    className="w-[50px] h-[50px] object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{selectedOrderData.productName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedOrderData.productConfig}</p>
                  </div>
                </div>
              </div>
            )}

            {selectedSection === 'shipments' ? (
              <Shipments /> 
            ) : (
              <Versions selectedSection={selectedSection} selectedStep={selectedStep} setSelectedStep={setSelectedStep} />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            Select a section to view details
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersDetail;