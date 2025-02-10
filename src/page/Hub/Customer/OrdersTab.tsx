import React, { useState, useEffect } from 'react';
import { Users, MapPin, ShoppingCart, Building2, Settings, FileText, Camera, ArrowLeft, Plus, Truck, Package, Palette, Database, Clock, ChevronDown, ChevronRight, CheckSquare, HardDrive } from 'lucide-react';

interface OrderJob {
  id: string;
  version: number;
  section: 'packaging' | 'artwork' | 'data';
  type: 'setup' | 'upload' | 'view' | 'approve' | 'approve-sample' | 'approve-live';
  title: string;
  status?: 'pending' | 'approved' | 'rejected';
}

interface Order {
  id: string;
  orderNumber: string;
  status: 'active' | 'completed' | 'on-hold';
  createdAt: string;
  jobs: OrderJob[];
  productName?: string;
  productConfig?: string;
  productImage?: string;
}

export default function OrdersTab() {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: '12345',
      status: 'active',
      createdAt: '2024-03-15',
      jobs: [],
      productName: 'Custom USB Drive',
      productConfig: '32GB Metal Swivel, Brushed Silver',
      productImage: 'https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=50&h=50&q=80'
    },
    {
      id: '2',
      orderNumber: '12346',
      status: 'completed',
      createdAt: '2024-03-14',
      jobs: []
    },
    {
      id: '3',
      orderNumber: '12347',
      status: 'on-hold',
      createdAt: '2024-03-13',
      jobs: []
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({});
  const [selectedSection, setSelectedSection] = useState<'packaging' | 'artwork' | 'data' | 'shipments' | null>(null);
  const [setupOption, setSetupOption] = useState<'new' | 'previous' | 'version' | null>(null);
  const [wantsSamplePhotos, setWantsSamplePhotos] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const selectedOrderData = orders.find(o => o.id === selectedOrder);

  const resetView = () => {
    setSelectedOrder(null);
    setSelectedSection(null);
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

  const toggleVersion = (version: number) => {
    setExpandedVersions(prev => {
      const newState = { ...prev, [version]: !prev[version] };
      if (newState[version]) {
        setSelectedSection(null);
      }
      return newState;
    });
  };

  if (!selectedOrder) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Orders</h2>
        </div>

        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Order Number
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Created
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => setSelectedOrder(order.id)}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {order.orderNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : order.status === 'on-hold'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                      View<span className="sr-only">, {order.orderNumber}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Setup', icon: <Settings className="w-5 h-5" /> },
    { number: 2, title: 'Upload', icon: <HardDrive className="w-5 h-5" /> },
    { number: 3, title: 'Proof', icon: <FileText className="w-5 h-5" /> },
    { number: 4, title: 'Photo Sample', icon: <Camera className="w-5 h-5" /> },
    { number: 5, title: 'Live Sample', icon: <Camera className="w-5 h-5" /> }
  ];

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
                  onClick={() => setSelectedSection(section as any)}
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
              <div className="space-y-6">
                <div className="overflow-hidden bg-white dark:bg-gray-800 shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Quantity
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Version
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Shipping Address
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                          In-Hands Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 dark:text-gray-100">
                          <div className="flex items-center">
                            <Truck className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                            50 units
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
                          Version 1
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <div>123 Main Street</div>
                              <div className="text-gray-500 dark:text-gray-400">
                                San Francisco, CA 94105
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
                          April 14, 2024
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                            Pending
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-between">
                    {steps.map((step) => (
                      <button
                        key={step.number}
                        onClick={() => setSelectedStep(step.number)}
                        className={`flex items-center ${
                          selectedStep === step.number
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          selectedStep === step.number
                            ? 'bg-blue-600 text-white dark:bg-blue-500'
                            : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'
                        }`}>
                          {step.icon}
                        </div>
                        <span className="ml-2 text-sm font-medium bg-white dark:bg-gray-800 px-2">
                          {step.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  {selectedStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => setSetupOption('new')}
                          className={`p-4 border rounded-lg text-left flex flex-col items-start ${
                            setupOption === 'new'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 ring-2 ring-blue-200 dark:ring-blue-800'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <h3 className="font-medium text-gray-900 dark:text-white">Upload Files</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Upload new PAD files</p>
                        </button>
                        <button
                          onClick={() => setSetupOption('version')}
                          className={`p-4 border rounded-lg text-left flex flex-col items-start ${
                            setupOption === 'version'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 ring-2 ring-blue-200 dark:ring-blue-800'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <h3 className="font-medium text-gray-900 dark:text-white">Select Version</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Use PAD from another version on this job</p>
                        </button>
                        <button
                          onClick={() => setSetupOption('previous')}
                          className={`p-4 border rounded-lg text-left flex flex-col items-start ${
                            setupOption === 'previous'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 ring-2 ring-blue-200 dark:ring-blue-800'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <h3 className="font-medium text-gray-900 dark:text-white">Existing Files</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Use PAD from previous job</p>
                        </button>
                      </div>

                      <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={wantsSamplePhotos}
                            onChange={(e) => setWantsSamplePhotos(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            I would like to see photos of a sample before moving to production
                          </span>
                        </label>
                      </div>

                      <div className="flex justify-end">
                        <button
                          disabled={!setupOption}
                          className={`px-4 py-2 rounded-md text-white ${
                            setupOption
                              ? 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                              : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                          }`}
                        >
                          Continue Setup
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedStep === 2 && (
                    <div className="text-center py-12">
                      <HardDrive className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Upload Files</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Drag and drop your files here</p>
                      <div className="mt-6">
                        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Files
                        </button>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md p-4 mt-4">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          The file browser will be implemented here with a button that says "Add Files Here" will call Uppy.js.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedStep === 3 && (
                    <div className="text-center py-12">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Review Files</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View and approve your files</p>
                    </div>
                  )}

                  {selectedStep === 4 && (
                    <div className="text-center py-12">
                      <Camera className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Sample Photos</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Review sample photos before production</p>
                    </div>
                  )}

                  {selectedStep === 5 && (
                    <div className="text-center py-12">
                      <Camera className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Live Sample</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Review and approve live sample</p>
                    </div>
                  )}
                </div>
              </>
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