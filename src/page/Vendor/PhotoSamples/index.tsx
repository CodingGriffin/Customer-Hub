import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { ImageOff, MailCheck, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import UploadModal from './UploadModal';

interface StepSetupProps {
  addComment: (comment: string, sample_id: number) => void,
  comments: any,
  selectedOrderData: any,
  samples: any,
}

function PhotoSamples({selectedOrderData, samples, comments, addComment}: StepSetupProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const { version_id, section } = useParams();
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  
  const toggleAccordion = (sampleId: number) => {
    setOpenAccordion(openAccordion === sampleId ? null : sampleId);
  };

  // Find the version in the selectedOrderData.versions array
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );

  const handleCloseWUploadModal = useCallback(() => {
    setShowUploadModal(false);
  }, []);

  const handleCommentSubmit = (sampleId: number) => {
    // Add your comment submission logic here
    console.log('Submitting comment for sample:', sampleId, commentText);
    addComment(commentText, sampleId);
    // After submission success:
    setEditingCommentId(null);
    setCommentText('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Photo Samples</h2>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Upload className="w-4 h-4 mr-1.5" />
          <span>Upload</span>
        </button>
      </div>
      {
        samples.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {samples.map((sample: any) => (
              <div 
                key={sample.photo_sample_id} 
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                {/* Image Preview */}
                <div className="relative aspect-video group">
                  <img
                    src={baseUrl + sample.file_path}
                    alt={sample.name || 'Photo Sample'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <button 
                      className="opacity-0 group-hover:opacity-100 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow transition-opacity"
                      onClick={() => window.open(sample.file_path, '_blank')}
                    >
                      View Full Size
                    </button>
                  </div>
                </div>

                {/* Sample Info */}
                <div className="p-4 bg-gray-200 dark:bg-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800 dark:text-white truncate">
                      {(sample.name || 'Untitled Sample').split('.').slice(0, -1).join('.')}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(sample.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Comments Accordion */}
                  <div className="mb-2">
                    <button
                      onClick={() => toggleAccordion(sample.photo_sample_id)}
                      className="w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-300">
                        Comments ({comments.filter((comment: any) => {
                          const resourceMatch = comment.resource_id === (100000 + sample.photo_sample_id);
                          if (!resourceMatch) return false;
                          
                          if (comment.table_code === 'vendor_table') return true;
                          
                          if (comment.table_code.startsWith('staff_table')) {
                            return comment.table_code.includes('vendor_table');
                          }
                          
                          return false;
                        }).length})
                      </span>
                      {openAccordion === sample.photo_sample_id ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>

                    {openAccordion === sample.photo_sample_id && (
                      <div className="mt-2 space-y-3">
                        <div className="bg-gray-700 rounded-lg p-3">
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {comments
                              .filter((comment: any) => {
                                const resourceMatch = comment.resource_id === (100000 + sample.photo_sample_id);
                                if (!resourceMatch) return false;
                                
                                if (comment.table_code === 'vendor_table') return true;
                                
                                if (comment.table_code.startsWith('staff_table')) {
                                  return comment.table_code.includes('vendor_table');
                                }
                                
                                return false;
                              })
                              .map((comment: any) => (
                                <div key={comment.comment_id} className="bg-gray-600 rounded p-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                      comment.table_code === 'vendor_table'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-purple-100 text-purple-800'
                                    }`}>
                                      {comment.table_code === 'vendor_table'
                                        ? 'Vendor'
                                        : 'Staff'}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      {new Date(comment.timestamp).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-300">{comment.comment}</p>
                                </div>
                              ))}
                          </div>

                          {/* Add comment section */}
                          {editingCommentId === sample.photo_sample_id ? (
                            <div className="space-y-2 mt-3">
                              <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                className="w-full h-20 px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white resize-none"
                                placeholder="Enter your comment..."
                              />
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingCommentId(null);
                                    setCommentText('');
                                  }}
                                  className="px-3 py-1.5 text-sm text-gray-300 hover:text-white"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleCommentSubmit(sample.photo_sample_id)}
                                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingCommentId(sample.photo_sample_id);
                                setCommentText('');
                              }}
                              className="w-full px-3 py-2 mt-3 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Add Comment
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) :

        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center mb-6">
          <div className="flex justify-center mb-6">
            <ImageOff className="h-24 w-24 text-amber-500 dark:text-amber-400" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">No Photo Samples Yet</h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Looks like you haven't uploaded any samples yet.
          </p>
          
          <div className="flex items-center justify-center text-amber-500 dark:text-amber-400 font-medium">
            <MailCheck className="mr-2 h-5 w-5" />
            <span>Upload samples to get started</span>
          </div>

        </div>
      }
      {showUploadModal && <UploadModal _closeUploadModal={handleCloseWUploadModal} version_name={currentVersion?.version_name} section={section} />}
    </div>
  )
}

export default PhotoSamples;
