import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { FileSearch, FileX, FileText, File, Image } from 'lucide-react';

import Empty from '../../../component/Vendor/Files/Empty';

interface RevisionsProps {
  selectedOrderData: any,
  revisions: any,
}

function Files({selectedOrderData, revisions}: RevisionsProps) {
  const originalPdfUrl = `${window.location.protocol}//${window.location.host}/`;

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

  return (
    <div>
      {revisions === "No revisions found." ? <Empty />
      : (
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
    </div>
  );
}

export default Files;
