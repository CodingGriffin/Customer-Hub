import React, { useState } from 'react';
import { FileCheck, Scale } from 'lucide-react';

interface ProductionApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ProductionApprovalModal({ isOpen, onClose, onConfirm }: ProductionApprovalModalProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 dark:bg-gray-900 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <Scale className="text-blue-500" size={24} />
          <h2 className="text-xl font-semibold dark:text-white">Production Approval Terms</h2>
        </div>
        <div className="bg-gray-500 dark:bg-slate-800 rounded-lg p-4 mb-6 max-h-96 overflow-y-auto dark:text-slate-300 text-white">
          <div className="prose prose-invert prose-sm">
            <p className="">
              By approving these samples for production, you acknowledge and agree to the following terms:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The approved samples represent the general quality and appearance of the final products.</li>
              <li>Minor variations in color, texture, and finish are inherent in the production process and are considered acceptable.</li>
              <li>Each piece in the production run may have slight variations from the approved samples.</li>
              <li>Once production begins, modifications or cancellations may not be possible.</li>
              <li>This approval constitutes your final sign-off for mass production.</li>
            </ul>
            <p className="mt-4">
              [Additional terms and conditions will be displayed here]
            </p>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="ml-2 text-sm dark:text-slate-300">
            I have read and agree to the production terms and conditions
          </label>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!termsAccepted}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              termsAccepted
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            <FileCheck size={18} />
            <span>Approve for Production</span>
          </button>
        </div>
      </div>
    </div>
  );
}