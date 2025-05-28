import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { ImageOff, MailCheck, Upload, ChevronDown, ChevronUp, Trash2, X } from 'lucide-react';
import UploadModal from './UploadModal';
import ImageViewer from '../../../component/ArtworkPhotoSample/ImageViewer';

interface StepSetupProps {
  addPhotoSampleComment: (comment: string, sample_id: number) => void,
  deletePhotoSample: (photo_sample_id: number) => void,
  comments: any,
  selectedOrderData: any,
  samples: any,
  resource_id: number;
}

function PhotoSamples({selectedOrderData, samples, resource_id, comments, addPhotoSampleComment, deletePhotoSample}: StepSetupProps) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  // Add this new state for the image viewer
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const { version_id, section } = useParams();
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  
  const toggleAccordion = (sampleId: number) => {
    setOpenAccordion(openAccordion === sampleId ? null : sampleId);
  };

  // Find the version in the selectedOrderData.versions array
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );
// Add handleDeletePhotoSample function
const handleDeletePhotoSample = (photoSampleId: number, sampleName: string) => {
  Modal.confirm({
    title: 'Delete Photo Sample',
    content: `Are you sure you want to delete "${sampleName}"? This action cannot be undone.`,
    okText: 'Yes, Delete',
    cancelText: 'No, Cancel',
    okButtonProps: {
      className: 'bg-red-600 hover:bg-red-700',
    },
    onOk() {
      deletePhotoSample(photoSampleId);
    },
    onCancel() {
      console.log('Delete cancelled');
    }
  });
};
  const handleCloseWUploadModal = useCallback(() => {
    setShowUploadModal(false);
  }, []);

  const handleCommentSubmit = (sampleId: number) => {
    // Add your comment submission logic here
    console.log('Submitting comment for sample:', sampleId, commentText);
    addPhotoSampleComment(commentText, sampleId);
    // After submission success:
    setEditingCommentId(null);
    setCommentText('');
  };

  // Determine status text and styling based on currentAbbr
  // const getPhotoSampleStatus = () => {
  //   if (Object.keys(PHOTOSAMPLE_STATUS).includes(currentAbbr)) {
  //     return {
  //       text: PHOTOSAMPLE_STATUS[currentAbbr as keyof typeof PHOTOSAMPLE_STATUS],
  //       bgColor: 'bg-blue-50',
  //       textColor: 'text-blue-600',
  //       borderColor: 'border-blue-600'
  //     };
  //   } else if (Object.keys(SAMPLE_STATUS).includes(currentAbbr) || Object.keys(PRODUCTION_STATUS).includes(currentAbbr)) {
  //     return {
  //       text: 'APPROVED',
  //       bgColor: 'bg-orange-100',
  //       textColor: 'text-orange-500',
  //       borderColor: 'border-orange-500'
  //     };
  //   } else {
  //     return {
  //       text: 'UNAPPROVED',
  //       bgColor: 'bg-red-600',
  //       textColor: 'text-white',
  //       borderColor: 'border-red-600'
  //     };
  //   }
  // };

  // const photoSampleStatus = getPhotoSampleStatus();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        {/* <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Photo {section == 'data' ? 'Screenshots' : 'Samples'}</h2> */}
        {/* {samples.length > 0 && (
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Upload className="w-4 h-4 mr-1.5" />
            <span>Upload</span>
          </button>
        )} */}
      </div>
      {/* <div className={`w-full max-w-4xl mx-auto mt-6 p-3 font-bold text-2xl text-center border-2 ${photoSampleStatus.textColor} ${photoSampleStatus.borderColor} ${photoSampleStatus.bgColor}`}>
        PHOTO SAMPLE - {photoSampleStatus.text}
      </div> */}
      {
        samples.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {samples.map((sample: any) => (
              sample.resource_id == resource_id &&
              <div 
                key={sample.photo_sample_id} 
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                {/* Image Preview section - Updated with click handler */}
                <div 
                  className="relative aspect-video group cursor-pointer"
                  onClick={() => setSelectedImage({
                    url: baseUrl + sample.file_path,
                    title: sample.name || 'Photo Sample'
                  })}
                >
                  <img
                    src={baseUrl + sample.file_path}
                    alt={sample.name || 'Photo Sample'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm opacity-0 group-hover:opacity-100">
                      Click to view
                    </span>
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

                  {/* Add delete button */}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleDeletePhotoSample(sample.photo_sample_id, sample.name)}
                      className="w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-200 flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Remove Sample
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // <div className="flex flex-col items-center justify-center max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl p-8 text-center mb-6">
          //   <button 
          //     onClick={() => setShowUploadModal(true)}
          //     className="flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          //   >
          //     <Upload className="w-5 h-5 mr-2" />
          //     <span>Upload {section == 'data' ? 'Screenshots' : 'Samples'}</span>
          //   </button>
          // </div>
          <></>
        )}
      {/* Add the ImageViewer component */}
      {selectedImage && (
        <ImageViewer
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          title={selectedImage.title}
        />
      )}
      {/* {showUploadModal && <UploadModal _closeUploadModal={handleCloseWUploadModal} version_name={currentVersion?.version_name} section={section} />} */}
    </div>
  )
}

export default PhotoSamples;
