import { MapPin, Truck } from 'lucide-react';

interface ShipmentsProps {
  shipments: any[];
}

function Shipments({shipments}: ShipmentsProps) {
  return (
    <div className="space-y-6">
    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Quantity
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Job/Version
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Shipping Address
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              In-Hands Date
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Tracking Number
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {shipments.map((shipment) => (
            shipment.shipment_versions.map((shipment_version: any) => (
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 dark:text-gray-100">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
                    {shipment_version.quantity} units
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
                {shipment_version.jobnum}{shipment_version.name}
                </td>
                <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
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
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {shipment.inHandsDate}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
                  {shipment.tracking_number && (
                    <a
                      href={`https://www.fedex.com/wtrk/track/?trknbr=${shipment.tracking_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {shipment.tracking_number}
                    </a>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                  {shipment.tracking_status ? shipment.tracking_status : "Pending"}
                  </span>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Shipments;
