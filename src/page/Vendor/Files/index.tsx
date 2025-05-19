import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { FileSearch, FileX, FileText, File, Image, HardDrive, Database, Monitor } from 'lucide-react';

import Empty from '../../../component/Vendor/Files/Empty';

interface RevisionsProps {
  selectedOrderData: any,
  revisions: any,
}

function Files({selectedOrderData, revisions}: RevisionsProps) {
  const originalPdfUrl = import.meta.env.VITE_SERVER_BASE_URL;

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

  // Get current revision and all its partitions
  const getCurrentRevisionPartitions = () => {
    if (!Array.isArray(revisions)) return [];
    
    const currentRevision = revisions.find((rev: any) => rev.superceded === 0);
    if (!currentRevision || !Array.isArray(currentRevision.partitions)) return [];
    
    return currentRevision.partitions;
  };

  const partitions = getCurrentRevisionPartitions();
  console.log(partitions);

  return (
    <div>
      {revisions === "No revisions found." ? <Empty />
      : (
        <>
          {/* Partitions Information */}
          {partitions.length > 0 ? (
            partitions.map((partition: any, index: number) => (
              <div key={index} className="mb-8">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      Partition #{partition.rev_partition}
                    </h2>
                    {partition.rev_partition_writeprotect === 1 && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                        Write Protected
                      </span>
                    )}
                    {partition.rev_partition_writeprotect === 0 && (
                      <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                        No Write-Protection
                      </span>
                    )}
                  </div>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => console.log(`Validating partition #${partition.rev_partition}`)}
                  >
                    Validate
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Drive Labels */}
                  <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold dark:text-white">Drive Labels</h3>
                      <span className="text-green-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Windows Icon</span>
                        <span className="font-mono dark:text-white">{partition.rev_partition_favicon || 'DATA'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Windows Label</span>
                        <span className="font-mono dark:text-white">{partition.rev_partition_winlab || 'DATA'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Mac Icon</span>
                        <span className="font-mono dark:text-white">{partition.rev_partition_icns || 'DATA'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Mac/Drive Label</span>
                        <span className="font-mono dark:text-white">{partition.rev_partition_vollab || 'DATA'}</span>
                      </div>
                      {/* <div className="flex justify-between items-center">
                        <span className="text-gray-400">Icons</span>
                        <span className="font-mono dark:text-white">{partition.has_icons ? 'Custom' : 'Default'}</span>
                      </div> */}
                    </div>
                  </div>
                  {/* Content Overview */}
                  <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold dark:text-white">Metadata</h3>
                      <span className="text-green-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Format</span>
                        <span className="font-mono dark:text-white">{partition.rev_partition_filesystem || 'FAT32'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Folders</span>
                        <span className="font-mono dark:text-white">{partition.rev_partition_folders || '0'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Files</span>
                        <span className="font-mono dark:text-white">{partition.rev_partition_files || '0'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Size</span>
                        <span className="font-mono dark:text-white">
                          {partition.rev_partition_size 
                            ? Number(partition.rev_partition_size).toLocaleString() + ' bytes' 
                            : '0.00 bytes'}
                        </span>
                      </div>
                      {/* <div className="flex justify-between items-center">
                        <span className="text-gray-400">Compatibility</span>
                        <span className="font-mono dark:text-white">{partition.compatibility || 'Universal'}</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 sm:px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              No partitions found in this revision
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Files;
