interface ReviewProps {
  selectedFormat: string;
  windowsDriveLabel: string;
  macosDriveLabel: string;
}

function Review({selectedFormat, windowsDriveLabel, macosDriveLabel}: ReviewProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Content Overview</h3>
            <span className="text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Folders</span>
              <span className="font-mono">247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Files</span>
              <span className="font-mono">1,832</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Size</span>
              <span className="font-mono">3.7 GB</span>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Format Details</h3>
            <span className="text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">File System</span>
              <span className="font-mono">{selectedFormat}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Largest File</span>
              <span className="font-mono">2.1 GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Compatibility</span>
              <span className="text-green-500 text-sm">✓ Verified</span>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Drive Labels</h3>
            <span className="text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Windows</span>
              <span className="font-mono">{windowsDriveLabel}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">macOS</span>
              <span className="font-mono">{macosDriveLabel}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Icons</span>
              <span className="text-green-500 text-sm">✓ Custom Set</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Ready for Data Department Review?</h3>
            <p className="text-sm text-gray-400">All configurations have been verified and meet our standards</p>
          </div>
          <button className="bg-[#4d9fff] hover:bg-[#4d9fff]/90 text-white px-6 py-2 rounded-lg transition-colors">
            Request Proof
          </button>
        </div>
        
        <div className="border rounded-lg p-4 text-sm text-gray-400">
          <p>The Data Department will review your configuration and create a proof USB drive. You'll receive an email notification when the proof is ready for testing. Typical turnaround time is 1-2 business days.</p>
        </div>
      </div>
    </div>
  )
}

export default Review;