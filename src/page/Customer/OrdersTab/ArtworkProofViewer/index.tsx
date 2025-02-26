import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { X } from 'lucide-react';
import { Modal } from '../../../../component/ArtworkProofViewer/Modal';
import { UserManagement } from './UserManagement';
import Bottom from './Bottom';
import PdfViewer from './PdfViewer';

interface ArtworkManagerProps {
  setSelectedStep: (id: number) => void;
  selectedOrderData: any
}

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function ArtworkProofViewer({selectedOrderData, setSelectedStep}: ArtworkManagerProps) {

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [comments, setComments] = useState('');
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [skipSample, setSkipSample] = useState(true);

  const handleSubmit = () => {
    console.log('Comments:', comments);
    console.log('Skip Sample:', skipSample);
    setComments('');
    setSkipSample(true);
    setIsApproveModalOpen(false);
    setIsRejectModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Main Content Area */}
      {/* PDF Viewer */}
      <PdfViewer pdfError={pdfError} setPdfError={setPdfError} setSelectedStep={setSelectedStep} />

      {/* User Management Slide-out Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isUserManagementOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full dark:bg-gray-700">
          <div className="p-4 border-b">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold dark:text-white">Invite Reviewers</h2>
                <p className="text-gray-600 mt-1 dark:text-gray-400">Invite others to review and approve on your behalf.</p>
              </div>
              <button
                onClick={() => setIsUserManagementOpen(false)}
                className="p-1 rounded-full dark:text-white"
                title="Close panel"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <UserManagement />
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <Bottom pdfError={pdfError} setIsApproveModalOpen={setIsApproveModalOpen} setIsRejectModalOpen={setIsRejectModalOpen} setIsUserManagementOpen={setIsUserManagementOpen} />

      {/* Modals */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Approve Document"
      >
        <div className="space-y-4">
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Add your approval comments..."
            className="w-full h-32 p-2 border rounded resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={skipSample}
              onChange={(e) => setSkipSample(e.target.checked)}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span>Show me a photo sample before mass production.</span>
          </label>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsApproveModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Submit Approval
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Request Changes"
      >
        <div className="space-y-4">
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Describe the changes needed..."
            className="w-full h-32 p-2 border rounded resize-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsRejectModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ArtworkProofViewer;