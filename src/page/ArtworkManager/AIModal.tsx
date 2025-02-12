import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AIModalProps {
  analysisStep: number;
  _closeAIModal: () => void;
}

const AIModal = React.memo(({analysisStep, _closeAIModal }: AIModalProps) => {
  
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    _closeAIModal();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Analyzing Partition with AI</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full ${analysisStep >= 1 ? 'bg-purple-600' : 'bg-gray-200'} mr-3`} />
              <span className={`text-sm ${analysisStep >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                Determining Data Upload Type
              </span>
            </div>
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full ${analysisStep >= 2 ? 'bg-purple-600' : 'bg-gray-200'} mr-3`} />
              <span className={`text-sm ${analysisStep >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                Looking for common extraneous, unnecessary files
              </span>
            </div>
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full ${analysisStep >= 3 ? 'bg-purple-600' : 'bg-gray-200'} mr-3`} />
              <span className={`text-sm ${analysisStep >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>
                Examining file name length
              </span>
            </div>
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full ${analysisStep >= 4 ? 'bg-purple-600' : 'bg-gray-200'} mr-3`} />
              <span className={`text-sm ${analysisStep >= 4 ? 'text-gray-900' : 'text-gray-500'}`}>
                Formulating Recommendations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default AIModal;