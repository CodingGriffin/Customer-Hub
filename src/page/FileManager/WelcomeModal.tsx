import { X, Info } from 'lucide-react';

function WelcomeModal() {
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Info className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Important Guidelines</h2>
            </div>
            <button
              // onClick={() => setShowWelcomeModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">File Naming Best Practices:</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Use short, descriptive names that explain the content</li>
                <li>• Avoid special characters (only use letters, numbers, hyphens, and underscores)</li>
                <li>• It is best to place all of your files in one folder, then upload the entire folder.</li>
                <li>• Our most successful customers create a USB master and asks their colleagues to review before uploading.</li>
              </ul>
            </div>

            <div className="pt-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Large file uploads:</span> Don't worry if you have a slow connection - uploads are resumable and can be paused/resumed at any time.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              // onClick={() => setShowWelcomeModal(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeModal;