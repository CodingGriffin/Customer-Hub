import { 
  ThumbsUp, 
  ThumbsDown, 
  Users2, 
} from 'lucide-react';

interface BottomProps {
  // pdfError: string | null;
  // setIsUserManagementOpen: (status: boolean) => void;
  // setIsRejectModalOpen: (status: boolean) => void;
  // setIsApproveModalOpen: (status: boolean) => void;
}

function Bottom() {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-700 p-4 shadow-lg z-40">
      <div className="container mx-auto flex justify-between items-center">
        <button
          // onClick={() => setIsUserManagementOpen(true)}
          className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          title="Back"
        >
          <span>Back</span>
        </button>
        
        <div className="flex items-center gap-4">
          <button
            // onClick={() => setIsUserManagementOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors dark:text-white hover:dark:bg-gray-800"
            title="Open reviewer management"
          >
            <Users2 size={20} />
            <span>Invite Reviewers</span>
          </button>
          <button
            // onClick={() => setIsRejectModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            // disabled={!!pdfError}
            title="Request changes to the document"
          >
            <ThumbsDown size={16} />
            Request Changes
          </button>
          <button
            // onClick={() => setIsApproveModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            // disabled={!!pdfError}
            title="Approve document for production"
          >
            <ThumbsUp size={16} />
            Approve for Production
          </button>
        </div>
      </div>
    </div>
  )
}

export default Bottom;