import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { FileSearch, FileX, FileText, File, Image, HardDrive, Database, Monitor, X, Check, ArrowRight } from 'lucide-react';

import Empty from '../../../component/Vendor/Files/Empty';
import PartitionCard from './PartitionCard';

interface RevisionsProps {
  addComment: (comment: string, sample_id: number, field: string) => void,
  getComments: (partition_id: number) => void,
  updatePartitionVerificationState: (partition_id: number, state: string) => void,
  selectedOrderData: any,
  revisions: any,
  comments: any,
}

function Files({selectedOrderData, revisions, comments, addComment, getComments, updatePartitionVerificationState}: RevisionsProps) {
  const [verifiedPartitions, setVerifiedPartitions] = useState<Set<number>>(new Set());

  useEffect(() => {
    const currentRevision = revisions.find((rev: any) => rev.superceded === 0);
    if (partitions.length > 0) {
      // Extract all partition IDs
      const partitionIds = currentRevision.partitions.map((partition: any) => partition.rev_partition_id);
      
      // Call getComments with the partition IDs
      getComments(partitionIds);
    }
  }, [revisions]);
  // Get current revision and all its partitions
  const getCurrentRevisionPartitions = () => {
    if (!Array.isArray(revisions)) return [];
    
    const currentRevision = revisions.find((rev: any) => rev.superceded === 0);
    if (!currentRevision || !Array.isArray(currentRevision.partitions)) return [];
    
    // Get comments for all partitions in the current revision

    
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

  return (
    <div>
      {revisions === "No revisions found." ? <Empty />
      : (
        <>
          {/* Partitions Information */}
          {partitions.length > 0 ? (
            partitions.map((partition: any, index: number) => (
              <PartitionCard
                key={index}
                partition={partition}
                comments={comments}
                onVerificationChange={(verified) => handlePartitionVerified(partition.rev_partition, verified)}
                addComment={addComment}
                updatePartitionVerificationState={updatePartitionVerificationState}
              />
            ))
          ) : (
            <div className="px-4 sm:px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              No partitions found in this revision
            </div>
          )}
        </>
      )}

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          className={`px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-lg font-medium transition-all duration-200 ${
            allPartitionsVerified
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!allPartitionsVerified}
        >
          {allPartitionsVerified ? 'Continue' : 'Verify to Continue'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Files;
