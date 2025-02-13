import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
  Download, 
  ThumbsUp, 
  ThumbsDown, 
  AlertCircle, 
  Users2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Loader
} from 'lucide-react';
import { Modal } from '../../../../component/StepProof/Modal';
import { UserManagement } from './UserManagement';
import Bottom from './Bottom';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function StepProof() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(0.5);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [comments, setComments] = useState('');
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [skipSample, setSkipSample] = useState(true);

  const pdfUrl = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";

  const handleSubmit = () => {
    console.log('Comments:', comments);
    console.log('Skip Sample:', skipSample);
    setComments('');
    setSkipSample(true);
    setIsApproveModalOpen(false);
    setIsRejectModalOpen(false);
  };

  const handlePdfLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setPdfError('Failed to load PDF document. Please try again later.');
    setIsLoading(false);
  };

  const nextPage = () => {
    if (currentPage < (numPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* PDF Viewer */}
        <div className="p-4 overflow-auto h-full">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          )}
          
          {pdfError ? (
            <div className="flex flex-col items-center justify-center h-full text-red-600">
              <AlertCircle size={48} className="mb-4" />
              <p className="text-lg">{pdfError}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {/* PDF Controls */}
              <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-4 w-full max-w-3xl">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={previousPage}
                      disabled={currentPage <= 1}
                      className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                      title="Previous page"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm">
                      Page {currentPage} of {numPages || '?'}
                    </span>
                    <button
                      onClick={nextPage}
                      disabled={currentPage >= (numPages || 1)}
                      className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                      title="Next page"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={zoomOut}
                      className="p-2 rounded hover:bg-gray-100"
                      title="Zoom out"
                    >
                      <ZoomOut size={20} />
                    </button>
                    <span className="text-sm">{Math.round(scale * 100)}%</span>
                    <button
                      onClick={zoomIn}
                      className="p-2 rounded hover:bg-gray-100"
                      title="Zoom in"
                    >
                      <ZoomIn size={20} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => window.open(pdfUrl, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                  disabled={!!pdfError}
                  title="Download PDF document"
                >
                  <Download size={16} />
                  <span className="text-sm">Download</span>
                </button>
              </div>

              <Document
                file={pdfUrl}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                  setPdfError(null);
                  setIsLoading(false);
                }}
                onLoadError={handlePdfLoadError}
                loading={
                  <div className="flex items-center justify-center h-full">
                    <Loader className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
                }
                className="flex justify-center"
              >
                <Page
                  pageNumber={currentPage}
                  scale={scale}
                  className="mb-4 shadow-lg"
                  width={window.innerWidth * 0.6}
                  error={
                    <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg">
                      <AlertCircle className="text-red-600 mb-2" size={24} />
                      <p className="text-red-600">Failed to load page {currentPage}</p>
                    </div>
                  }
                />
              </Document>
            </div>
          )}
        </div>
      </div>

      {/* User Management Slide-out Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isUserManagementOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">Invite Reviewers</h2>
                <p className="text-gray-600 mt-1">Invite others to review and approve on your behalf.</p>
              </div>
              <button
                onClick={() => setIsUserManagementOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
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
            <span>Start production without seeing a photo sample</span>
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

export default StepProof;