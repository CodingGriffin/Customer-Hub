import { FileSearch, FileX } from "lucide-react";

function PartitionEmpty () {
  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl p-8 text-center mb-6">
      <div className="flex justify-center mb-6">
        <FileX className="h-24 w-24 text-rose-500 dark:text-rose-400" strokeWidth={1.5} />
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">No Files Uploaded</h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        The files have been received by the customer, however we require the customer to approve our proof that we have sent them.
      </p>
    </div>
  )
}

export default PartitionEmpty;