import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { Coffee, MailCheck } from 'lucide-react';

interface ProductionProps {
  selectedOrderData: any,
}

function Production({selectedOrderData}: ProductionProps) {
  // Filter and group the line items - only 'conf' items
  const groupedItems = selectedOrderData?.line_items
    ?.filter((item: any) => item.pad_abbreviation === 'conf')
    ?.reduce((acc: any, item: any) => {
      // Create unique key for deduplication
      const uniqueKey = `${item.line_item_name}-${item.line_item_desc}`;
      
      if (!acc[item.pad_abbreviation]) {
        acc[item.pad_abbreviation] = {
          pad_name: item.pad_name,
          items: new Map()
        };
      }
      
      // Only add if this combination doesn't exist yet
      if (!acc[item.pad_abbreviation].items.has(uniqueKey)) {
        acc[item.pad_abbreviation].items.set(uniqueKey, {
          line_item_name: item.line_item_name,
          line_item_desc: item.line_item_desc
        });
      }
      
      return acc;
    }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedItems || {}).map(([abbreviation, data]: [string, any]) => (
        <div key={abbreviation} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {data.pad_name}
          </h2>
          
          <div className="space-y-4">
            {Array.from(data.items.values()).map((item: any, index: number) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {item.line_item_name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.line_item_desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <Coffee className="h-24 w-24 text-indigo-500 dark:text-indigo-400" strokeWidth={1.5} />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Preparing a Proof
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Hang tight! Our design wizards are working their magic. We'll give you a heads-up when your custom proof is ready to check out.
        </p>
        
        <div className="flex items-center justify-center text-indigo-500 dark:text-indigo-400 font-medium">
          <MailCheck className="mr-2 h-5 w-5" />
          <span>Sit back, relax, we've got this</span>
        </div>
      </div> */}
    </div>
  );
}

export default Production;