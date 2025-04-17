import { 
  ThumbsUp, 
  ThumbsDown, 
  Users2,
  AlertTriangle,
  Package,
  FileCheck, 
} from 'lucide-react';

interface BottomProps {
  // pad_line_items_id: number;
  // updateStatus: (pad_line_items_id: number) => void;
  allSamplesApproved: boolean;
  isLiveSample: boolean;
  setStep: (id: number) => void;
}

function Bottom({allSamplesApproved, isLiveSample, setStep} : BottomProps) {
  // const continueSetup = async () => {
  //   await updateStatus(pad_line_items_id);
  //   await setStep(3);
  // }
  const backSetup = () => {
    setStep(1);
  }
  return (
    <div className="fixed bottom-0 bg-white dark:bg-gray-700 p-4 shadow-lg z-40 relative w-full">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={backSetup}
          className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          title="Back"
        >
          <span>Back</span>
        </button>
        
        <button
          // onClick={handleBulkAction}
          disabled={!allSamplesApproved}
          className={`flex items-center gap-2 px-4 py-2 text-gray-700 rounded transition-colors dark:text-white ${
            !allSamplesApproved
              ? 'bg-gray-600 cursor-not-allowed opacity-50'
              : isLiveSample
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-green-600 hover:bg-green-700'
          } text-white flex items-center justify-center gap-2`}
        >
          {!allSamplesApproved ? (
            <>
              <AlertTriangle size={20} />
              <span>All samples must be approved</span>
            </>
          ) : (
            <>
              {isLiveSample ? (
                <>
                  <Package size={20} />
                  <span>Approve to get a Live Sample Shipped ASAP</span>
                </>
              ) : (
                <>
                  <FileCheck size={20} />
                  <span>Approve for Production</span>
                </>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default Bottom;
