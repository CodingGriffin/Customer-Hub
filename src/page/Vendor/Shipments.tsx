import { useState } from 'react';
import { MapPin, Truck, Copy, Printer, ChevronDown, ChevronRight } from 'lucide-react';

interface ExpandedShipmentsState {
  [key: string]: boolean;
}

interface ShipmentsProps {
  shipments: any[];
  entity_name: string;
  job_number: string;
}

function Shipments({ shipments, entity_name, job_number }: ShipmentsProps) {
  const [expandedShipments, setExpandedShipments] = useState<ExpandedShipmentsState>({});

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleShipmentExpand = (shipmentId: string) => {
    setExpandedShipments(prev => ({
      ...prev,
      [shipmentId]: !prev[shipmentId]
    }));
  };

  const handlePrintClick = (shipment: any) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Shipment</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                padding: 40px;
                max-width: 800px;
                margin: 0 auto;
                color: #333;
              }
              .section {
                margin-bottom: 40px;
                padding: 20px;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                background-color: #fff;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
              }
              .section-title {
                font-size: 18px;
                font-weight: bold;
                color: #1f2937;
                margin-bottom: 16px;
                padding-bottom: 8px;
                border-bottom: 2px solid #e5e7eb;
              }
              .entity-name {
                font-size: 24px;
                font-weight: bold;
                color: #111827;
                margin-bottom: 12px;
              }
              .address-details {
                margin-left: 4px;
                color: #4b5563;
              }
              .detail-row {
                display: flex;
                margin-bottom: 8px;
              }
              .detail-label {
                width: 140px;
                font-weight: 600;
                color: #4b5563;
              }
              .detail-value {
                flex: 1;
                color: #111827;
              }
              .comments {
                white-space: pre-wrap;
                color: #4b5563;
                background-color: #f9fafb;
                padding: 12px;
                border-radius: 4px;
              }
              .logo-container {
                display: flex;
                justify-content: center;
                margin-bottom: 20px;
              }
              .logo {
                height: 40px;
                display: block;
              }
            </style>
          </head>
          <body>
            <div class="logo-container">
              <img 
                src="https://imagedelivery.net/MKEvMIcAFUaEDbHj7BP86Q/5b404e84-91b7-4e07-269e-0816162e4300/public" 
                alt="Well Assembled Meetings Logo" 
                class="logo"
                onload="window.print()"
              />
            </div>
            <!-- Shipping Address Section -->
            <div class="section">
              <div class="section-title">Shipping Address</div>
              <div class="entity-name">${entity_name || 'N/A'}</div>
              <div class="address-details">
                ${shipment.shipment_address[0].address_street1}<br>
                ${shipment.shipment_address[0].address_street2 ? `${shipment.shipment_address[0].address_street2}<br>` : ''}
                ${shipment.shipment_address[0].address_street3 ? `${shipment.shipment_address[0].address_street3}<br>` : ''}
                ${shipment.shipment_address[0].address_city}, ${shipment.shipment_address[0].address_state} ${shipment.shipment_address[0].address_code}
              </div>
            </div>

            <!-- Shipment Details Section -->
            <div class="section">
              <div class="section-title">Shipment Details</div>
              <div class="detail-row">
                <div class="detail-label">Shipper Account</div>
                <div class="detail-value">${shipment.shipment_shipper_account || 'Every USB'}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Shipment Method</div>
                <div class="detail-value">${shipment.shipment_shipping_method || 'FedEx Int\'l Priority'}</div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Reference Number</div>
                <div class="detail-value">${job_number} - ${shipment.shipment_id}</div>
              </div>
            </div>

            <!-- Comments Section -->
            <div class="section">
              <div class="section-title">Comments</div>
              <div class="detail-row">
                <div class="detail-label">Recipient Comments</div>
                <div class="detail-value">
                  <div class="comments">${shipment.recipientComments || 'N/A'}</div>
                </div>
              </div>
              <div class="detail-row">
                <div class="detail-label">Production Comments</div>
                <div class="detail-value">
                  <div class="comments">${shipment.productionComments || 'N/A'}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden bg-white dark:bg-gray-800 shadow ring-1 ring-black ring-opacity-5 dark:ring-gray-700 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="w-8 py-3.5 pl-4 pr-3"></th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                Shipper Account
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                Shipment Method
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                Shipping Address
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                Reference Number
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                Tracking Number
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {shipments.map((shipment) => (
              <>
                <tr key={shipment.shipment_id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                  <td className="py-4 pl-4 pr-3">
                    <button
                      onClick={() => toggleShipmentExpand(shipment.shipment_id)}
                      className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    >
                      {expandedShipments[shipment.shipment_id] ? 
                        <ChevronDown className="h-5 w-5" /> : 
                        <ChevronRight className="h-5 w-5" />
                      }
                    </button>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-200">
                    {shipment.shipment_shipper_account || 'Every USB'}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-200">
                    {shipment.shipment_shipping_method || 'FedEx Int\'l Priority'}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-200">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 mt-0.5" />
                      <div>
                        <div>{shipment.shipment_address[0].address_street1} {shipment.shipment_address[0].address_street1 && <>,</>} {shipment.shipment_address[0].address_street2}{shipment.shipment_address[0].address_street2 && <>,</>} {shipment.shipment_address[0].address_street3}</div>
                        <div className="text-gray-500 dark:text-gray-400">
                          {shipment.shipment_address[0].address_city}, {shipment.shipment_address[0].address_state} {shipment.shipment_address[0].address_code}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-200">
                    <div className="flex items-center gap-2">
                      <span>{job_number} - {shipment.shipment_id}</span>
                      <button 
                        onClick={() => handleCopyClick(shipment.shipment_id)}
                        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                        title="Copy reference number"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-200">
                    {shipment.tracking_number ? (
                      <a
                        href={`https://www.fedex.com/wtrk/track/?trknbr=${shipment.tracking_number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                      >
                        {shipment.tracking_number}
                      </a>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Not yet shipped
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-4 text-sm">
                    <button
                      onClick={() => handlePrintClick(shipment)}
                      className="inline-flex items-center px-2 py-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                      title="Print shipment details"
                    >
                      <Printer className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                {expandedShipments[shipment.shipment_id] && (
                  <tr className="bg-gray-50 dark:bg-gray-750">
                    <td colSpan={7} className="px-8 py-4">
                      <div className="rounded-lg bg-white dark:bg-gray-800 shadow ring-1 ring-black ring-opacity-5 dark:ring-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-750">
                            <tr>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                                #
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                                Version Name
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                                Bundle
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">
                                Quantity
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                            {shipment.shipment_versions.map((version: any, index: number) => (
                              <tr key={version.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-200">
                                  {index + 1}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-200">
                                  {version.name}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-200">
                                  {version.bundle || 'N/A'}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-200">
                                  {version.quantity} units
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Shipments;
