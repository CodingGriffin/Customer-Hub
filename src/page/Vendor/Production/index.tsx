import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { Coffee, MailCheck } from 'lucide-react';
import { SAMPLE_STATUS, PRODUCTION_STATUS } from '../../../types'

interface ProductionProps {
  currentAbbr: string;
  selectedOrderData: any,
}

function Production({selectedOrderData, currentAbbr}: ProductionProps) {
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

  // Determine status text and styling based on currentAbbr
  const getLiveSampleStatus = () => {
    if (Object.keys(SAMPLE_STATUS).includes(currentAbbr)) {
      return {
        text: SAMPLE_STATUS[currentAbbr as keyof typeof SAMPLE_STATUS],
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-500',
        borderColor: 'border-orange-500'
      };
    } else if (Object.keys(PRODUCTION_STATUS).includes(currentAbbr)) {
      return {
        text: 'APPROVED',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-500',
        borderColor: 'border-orange-500'
      };
    } else {
      return {
        text: 'UNAPPROVED',
        bgColor: 'bg-red-600',
        textColor: 'text-white',
        borderColor: 'border-red-600'
      };
    }
  };

  const getProductionStatus = () => {
    if (Object.keys(PRODUCTION_STATUS).includes(currentAbbr)) {
      return {
        text: PRODUCTION_STATUS[currentAbbr as keyof typeof PRODUCTION_STATUS],
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
        borderColor: 'border-green-600'
      };
    } else {
      return {
        text: 'UNAPPROVED',
        bgColor: 'bg-red-600',
        textColor: 'text-white',
        borderColor: 'border-red-600'
      };
    }
  };

  const liveSampleStatus = getLiveSampleStatus();
  const productionStatus = getProductionStatus();

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

      <div className={`w-full max-w-4xl mx-auto mt-6 p-3 font-bold text-2xl text-center border-2 ${liveSampleStatus.textColor} ${liveSampleStatus.borderColor} ${liveSampleStatus.bgColor}`}>
        LIVE SAMPLE - {liveSampleStatus.text}
      </div>

      <div className={`w-full max-w-4xl mx-auto mt-6 p-3 font-bold text-2xl text-center border-2 ${productionStatus.textColor} ${productionStatus.borderColor} ${productionStatus.bgColor}`}>
        MASS PRODUCTION - {productionStatus.text}
      </div>
    </div>
  );
}

export default Production;
