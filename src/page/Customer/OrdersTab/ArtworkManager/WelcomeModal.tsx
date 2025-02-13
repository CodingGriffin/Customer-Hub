import React from 'react';
import { X, Info } from 'lucide-react';

interface WelcomeModalProps {
  _closeWelcomeModal: () => void;
}

const WelcomeModal = React.memo(({ _closeWelcomeModal }: WelcomeModalProps) => {

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    _closeWelcomeModal();
  }
  
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
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Educational Resources Section */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Prepare Your Artwork</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Before uploading, learn how to prepare your artwork properly:
                  </p>
                  <div className="space-y-2">
                    <a
                      href="https://usbjob.com/j/support/edu.php?id=19"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <span className="mr-2">📺</span>
                      Watch our Artwork Guidelines Video
                    </a>
                    <a
                      href="https://usbjob.com/j/support/edu.php?id=19"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <span className="mr-2">🎧</span>
                      Listen to our NotebookLM Podcast
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Common Artwork Issues to Check:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Low resolution artwork</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Files Locked</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Fonts not outlined</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Missing bleed/safety</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Spelling errors</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Lines too thin</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Text too small</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1" />
                      <span>Missing linked files</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
  )
})

export default WelcomeModal;