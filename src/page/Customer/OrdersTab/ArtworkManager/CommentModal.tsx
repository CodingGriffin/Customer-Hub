import { X } from 'lucide-react';

interface CommentModalProps {
  commentText: string;
  setCommentText: (status: string) => void;
  setShowCommentModal: (status: boolean) => void;
  handleCommentSubmit: () => void;
}

function CommentModal({commentText, setCommentText, setShowCommentModal, handleCommentSubmit}: CommentModalProps) {
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Add Comment</h2>
            <button
              onClick={() => setShowCommentModal(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full h-32 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-400"
            placeholder="Tell our designers about this file..."
          />
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setShowCommentModal(false)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg dark:bg-gray-100 hover:dark:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentModal;