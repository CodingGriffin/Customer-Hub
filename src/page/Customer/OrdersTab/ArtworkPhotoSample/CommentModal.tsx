import { useState } from "react";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message?: string) => void;
  type: 'approve' | 'reject';
  initialMessage?: string;
}

export default function CommentModal({ isOpen, onClose, onConfirm, type, initialMessage = '' }: CommentModalProps) {
  const [message, setMessage] = useState(initialMessage);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (type === 'reject' && !message.trim()) {
      setError('Please provide your comments');
      return;
    }
    onConfirm(message);
    setMessage('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-6 w-full max-w-md dark:text-white">
        <h2 className="text-xl font-semibold mb-4">
          {type === 'approve' ? 'Confirm Approval' : 'Provide Comments'}
        </h2>
        {type === 'reject' && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Please provide your comments:
            </label>
            <textarea
              className="w-full dark:bg-slate-800 border border-slate-700 rounded-lg p-2 dark:text-white"
              rows={3}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError('');
              }}
              placeholder="Enter your comments here..."
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        )}
        {type === 'approve' && (
          <p className="mb-4">Are you sure you want to approve all images?</p>
        )}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded-lg ${
              type === 'approve'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-red-600 hover:bg-red-700'
            } text-white`}
          >
            {type === 'approve' ? 'Confirm Approval' : 'Submit Comments'}
          </button>
        </div>
      </div>
    </div>
  );
}