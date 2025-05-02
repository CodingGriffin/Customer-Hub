import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import axios from 'axios';
import { 
  Download, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Loader
} from 'lucide-react';

interface PdfViewerProps {
  currentVersion: any
  pdfError: string | null;
  setPdfError: (e: string | null) => void;
  setStep: (id: number) => void;
}

function PdfViewer({currentVersion, pdfError, setPdfError, setStep}: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(0.5);
  const [pdfData, setPdfData] = useState<string | null>(null);

  // Original PDF URL
  const originalPdfUrl = `${window.location.protocol}//${window.location.host}/` + currentVersion?.files?.artw?.pdf?.file_path;
  
  // Updated proxy URL for Vercel deployment
  const proxyPdfUrl = "http://localhost:3001/proxy" + currentVersion?.files?.artw?.pdf?.file_path;
  // const proxyPdfUrl = "/api/proxy" + currentVersion.files.artw.pdf.file_path;

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        // Fetch the PDF through our proxy
        const response = await axios.get(proxyPdfUrl, {
          responseType: 'blob'
        });
        
        // Convert blob to data URL
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const dataUrl = URL.createObjectURL(blob);
        setPdfData(dataUrl);
        setPdfError(null);
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setPdfError('Failed to load PDF document. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPdf();
    
    // Cleanup function to revoke object URL
    return () => {
      if (pdfData) {
        URL.revokeObjectURL(pdfData);
      }
    };
  }, []);

  const handlePdfLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setPdfError('Failed to load PDF document. Please try again later.');
    setIsLoading(false);
  };

  const continueSetup = () => {
    setStep(4);
  }

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
    <div className="flex-1 relative dark:bg-gray-400">
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
            <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-4 w-full max-w-3xl">
              <div className="flex items-center gap-4 dark:text-white">
                <div className="flex items-center gap-2 ">
                  <button
                    onClick={previousPage}
                    disabled={currentPage <= 1}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 hover:dark:bg-gray-500"
                    title="Previous page"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm ">
                    Page {currentPage} of {numPages || '?'}
                  </span>
                  <button
                    onClick={nextPage}
                    disabled={currentPage >= (numPages || 1)}
                    className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 hover:dark:bg-gray-500"
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

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(originalPdfUrl, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                  disabled={!!pdfError}
                  title="Download PDF document"
                >
                  <Download size={16} />
                  <span className="text-sm">Download</span>
                </button>
                {/* <button
                  onClick={continueSetup}
                  className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 text-sm"
                >
                  Continue
                </button> */}
              </div>
            </div>

            {pdfData && (
              <Document
                file={pdfData}
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
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg">
                      <AlertCircle className="text-red-600 mb-2" size={24} />
                      <p className="text-red-600">Failed to load page {currentPage}</p>
                    </div>
                  }
                />
              </Document>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PdfViewer;
