import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { FileSearch, FileX, FileText, File, Image, HardDrive, Database, Monitor, X, Check, ArrowRight } from 'lucide-react';

import Empty from '../../../component/Vendor/Files/Empty';
import PartitionCard from './PartitionCard';

interface RevisionsProps {
  addPartitionComment: (comment: string, sample_id: number, field: string) => void,
  addPhotoSampleComment: (comment: string, sample_id: number) => void,
  deletePhotoSample: (photo_sample_id: number) => void,
  getPartitionComments: (partition_id: number) => void,
  updatePartitionVerificationState: (partition_id: number, state: string, rev_partition: number) => void,
  updateStatus: () => void,
  selectedOrderData: any,
  revisions: any,
  samples: any,
  comments: any,
  partitionComments: any,
  icon: any
}

function Files({selectedOrderData, revisions, samples, comments, partitionComments, icon, addPartitionComment, addPhotoSampleComment, getPartitionComments, updatePartitionVerificationState, updateStatus, deletePhotoSample}: RevisionsProps) {
  const originalPdfUrl = `${window.location.protocol}//${window.location.host}/`;

  const getCurrentDate = (): string => {
    const today = new Date();
    
    // Get month, day, and year
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = today.getDate().toString().padStart(2, '0');
    const year = today.getFullYear().toString().slice(-2); // Get last 2 digits of year
    
    return `${month}/${day}/${year}`;
  };

  const [verifiedPartitions, setVerifiedPartitions] = useState<Set<number>>(new Set());
  const { version_id, section } = useParams();

  const getFileName = (filePath: string) => {
    return filePath.split('/').pop() || filePath;
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop();
    
    if (extension === 'pdf') {
      return <FileText className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mr-2" />;
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return <Image className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mr-2" />;
    }
    return <File className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 mr-2" />;
  };

  useEffect(() => {
    const currentRevision = revisions.find((rev: any) => rev.superceded === 0);
    if (partitions.length > 0) {
      // Extract all partition IDs
      const partitionIds = currentRevision.partitions.map((partition: any) => partition.rev_partition_id);
      
      // Call getPartitionComments with the partition IDs
      getPartitionComments(partitionIds);
    }
  }, [revisions]);
  // Get current revision and all its partitions
  const getCurrentRevisionPartitions = () => {
    if (!Array.isArray(revisions)) return [];
    
    const currentRevision = revisions.find((rev: any) => rev.superceded === 0);
    if (!currentRevision || !Array.isArray(currentRevision.partitions)) return [];
    
    // Get comments for all partitions in the current revision

    console.log("this is the current revision==============>", currentRevision)
    return currentRevision.partitions;
  };

  const partitions = getCurrentRevisionPartitions();

  const handlePartitionVerified = (partitionNumber: number, verified: boolean) => {
    setVerifiedPartitions(prev => {
      const newSet = new Set(prev);
      if (verified) {
        newSet.add(partitionNumber);
      } else {
        newSet.delete(partitionNumber);
      }
      return newSet;
    });
  };

  const allPartitionsVerified = verifiedPartitions.size === partitions.length;
  console.log(allPartitionsVerified, verifiedPartitions.size, partitions.length);

  const pad_line_item_status = selectedOrderData?.pad_line_items?.find(
    (item: any) => item.pad_abbreviation == section && item.versions_id == version_id
  )?.status;
  return (
    <div>
      {revisions === "No revisions found." ? <Empty />
      : ( 
        (section == 'data') ?
        <>
          {/* Partitions Information */}
          {partitions.length > 0 ? (
            partitions.map((partition: any, index: number) => (
              <PartitionCard
                key={index}
                icon={icon}
                pad_line_item_status={pad_line_item_status}
                partition={partition}
                samples={samples}
                comments={comments}
                partitionComments={partitionComments}
                selectedOrderData={selectedOrderData}
                onVerificationChange={(verified) => handlePartitionVerified(partition.rev_partition, verified)}
                addPartitionComment={addPartitionComment}
                addPhotoSampleComment={addPhotoSampleComment}
                updatePartitionVerificationState={updatePartitionVerificationState}
                deletePhotoSample={deletePhotoSample}
              />
            ))
          ) : (
            <div className="px-4 sm:px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              No partitions found in this revision
            </div>
          )}
        </> :
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="hidden sm:grid px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-700 grid-cols-8 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
            <div className="col-span-5">Name</div>
            <div className="col-span-3">Modified</div>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {(() => {
              // Ensure revisions is an array
              const revisionsArray = Array.isArray(revisions) ? revisions : [];
              const currentRevision = revisionsArray.find((rev: any) => rev.superceded === 0);
              const files = Array.isArray(currentRevision?.files) ? currentRevision.files : [];

              return files.length === 0 ? (
                <div className="px-4 sm:px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                  No files found in this revision
                </div>
              ) : (
                files.map((file: any, index: number) => (
                  <div key={index} className="px-4 sm:px-6 py-3 sm:grid sm:grid-cols-8 sm:gap-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center col-span-5 mb-2 sm:mb-0">
                      {getFileIcon(file.file_path)}
                      <a 
                        href={`${originalPdfUrl}${file.file_path}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        {getFileName(file.file_path)}
                      </a>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 col-span-3">
                      {new Date(file.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))
              );
            })()}
          </div>
        </div>
      )}
      {section == 'data' &&
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          className={`px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-lg font-medium transition-all duration-200 ${
            allPartitionsVerified
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          onClick={updateStatus}
          disabled={!allPartitionsVerified}
        >
          {allPartitionsVerified ? 'Requested Approval ' + getCurrentDate() : 'Verify to Continue'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      }
    </div>
  );
}

export default Files;
