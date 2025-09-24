import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Check, X, AlertTriangle, Pencil, FileCheck, Package, Scale, ChevronDown, ChevronUp } from 'lucide-react';

import ProductionApprovalModal from './ProductionApprovalModal';
import ConfirmationModal from './ConfirmationModal';
import Bottom from './Bottom';
import CommentModal from './CommentModal';
import ImageViewer from '../../../../component/ArtworkPhotoSample/ImageViewer';
import { baseURL } from '../../../../utils/config';

interface PhotoSampleProps {
  addComment: (comment: string, sample_id: number) => void,
  updatePhotoSample: (sampleId: any, status: any) => void,
  setStep: (id: number) => void;
  comments: any,
  selectedOrderData: any,
  samples: any,
  isLiveSample: boolean,
}

function ArtworkPhotoSample({selectedOrderData, samples, isLiveSample, comments, updatePhotoSample, addComment, setStep}: PhotoSampleProps) {
  const [images, setImages] = useState();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject';
    imageId?: string;
    initialMessage?: string;
  }>({
    isOpen: false,
    type: 'approve',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showProductionApproval, setShowProductionApproval] = useState(false);
  const [pendingReject, setPendingReject] = useState<string | null>(null);
  const [finalComment, setFinalComment] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const baseUrl = baseURL;

  const toggleAccordion = (sampleId: number) => {
    setOpenAccordion(openAccordion === sampleId ? null : sampleId);
  };

  const handleCommentSubmit = (sampleId: number) => {
    if (!commentText.trim()) return;
    
    addComment(commentText, sampleId);
    setEditingCommentId(null);
    setCommentText('');
  };

  useEffect(() => {
    // Update filtered orders whenever orders prop changes
    setImages(samples);
  }, [samples]);

  const handleApprove = (id: number) => {
    updatePhotoSample(id, "Approved");
  };

  const handleReject = (id: number) => {
    updatePhotoSample(id, "Rejected");
  };

  const handleEditComment = (id: string, currentMessage: string) => {
    setModalState({
      isOpen: true,
      type: 'reject',
      imageId: id,
      initialMessage: currentMessage
    });
  };

  const handleRemoveComment = (id: string) => {
    // setImages(images.map(img => {
    //   if (img.id === id) {
    //     return {
    //       ...img,
    //       approved: true,
    //       message: "undefined"
    //     };
    //   }
    //   return img;
    // }));
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setPendingReject(null);
  };

  const handleConfirmationProceed = () => {
    setShowConfirmation(false);
    setModalState({
      isOpen: true,
      type: 'reject',
    });
  };

  const handleModalConfirm = (message?: string) => {
    if (modalState.imageId) {
      // setImages(images.map(img => {
      //   if (img.id === modalState.imageId) {
      //     return {
      //       ...img,
      //       approved: modalState.type === 'approve',
      //       message: modalState.type === 'reject' ? (message || "") : "undefined",
      //     };
      //   }
      //   return img;
      // }));
    } else if (modalState.type === 'reject') {
      // Store the final comment separately
      setFinalComment(message || null);
    }
    setModalState({ isOpen: false, type: 'approve' });
  };

  const handleBulkAction = () => {
    // const anyRejected = images.some(img => !img.approved);
    // if (anyRejected) {
    //   setPendingReject(null);
    //   setShowConfirmation(true);
    // } else {
    //   if (isLiveSample) {
    //     handleProductionApproval();
    //   } else {
    //     setShowProductionApproval(true);
    //   }
    // }
  };

  const handleProductionApproval = () => {
    setShowProductionApproval(false);
    // Here you would typically trigger the production process
    console.log(isLiveSample ? 'Live sample requested' : 'Production approved', { finalComment });
  };

  // Check if all samples are approved
  const allSamplesApproved = samples.every((sample: any) => sample.status === "Approved");

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {samples.map((sample: any) => (
          <div key={sample.photo_sample_id} className="bg-gray-800 rounded-lg overflow-hidden">
            {/* Image section */}
            <div 
              className="relative aspect-video group cursor-pointer"
              onClick={() => setSelectedImage({
                url: baseUrl + sample.file_path,
                title: sample.name || 'Photo Sample'
              })}
            >
              <img
                src={baseUrl + sample.file_path}
                alt={sample.name}
                className="w-full h-full object-cover cursor-pointer"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm">Click to view</span>
              </div>
            </div>

            {/* Info and actions section */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium">{sample.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  sample.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : sample.status === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {sample.status || "Pending"}
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
                            
                            // Show comment if it's from customer_table
                            if (comment.table_code === 'customer_table') return true;
                            
                            // For staff comments, only show if table_code contains customer_table
                            if (comment.table_code.startsWith('staff_table')) {
                              return comment.table_code.includes('customer_table');
                            }
                            
                            // Don't show vendor_table comments
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
                            
                            // Show comment if it's from customer_table
                            if (comment.table_code === 'customer_table') return true;
                            
                            // For staff comments, only show if table_code contains customer_table
                            if (comment.table_code.startsWith('staff_table')) {
                              return comment.table_code.includes('customer_table');
                            }
                            
                            // Don't show vendor_table comments
                            return false;
                          })
                          .map((comment: any) => (
                            <div key={comment.comment_id} className="bg-gray-600 rounded p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  comment.table_code === 'customer_table'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-purple-100 text-purple-800'
                                }`}>
                                  {comment.table_code === 'customer_table'
                                    ? 'Customer'
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

                      {/* Add comment section - disabled for approved/rejected samples */}
                      {sample.status !== "Approved" && sample.status !== "Rejected" ? (
                        editingCommentId === sample.photo_sample_id ? (
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
                            className="w-full px-3 py-2 mt-3 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            Add Comment
                          </button>
                        )
                      ) : (
                        <div className="w-full px-3 py-2 mt-3 text-sm bg-gray-800 text-gray-500 rounded-lg cursor-not-allowed opacity-50">
                          Comments disabled - Sample {sample.status.toLowerCase()}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Approve/Reject buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => updatePhotoSample(sample.photo_sample_id, "Approved")}
                  disabled={sample.status === "Approved" || sample.status === "Rejected"}
                  className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-lg transition-colors ${
                    sample.status === "Approved"
                      ? 'bg-green-600 text-white cursor-not-allowed opacity-50'
                      : sample.status === "Rejected"
                      ? 'bg-gray-700 text-gray-300 cursor-not-allowed opacity-50'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Check size={16} />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => updatePhotoSample(sample.photo_sample_id, "Rejected")}
                  disabled={sample.status === "Approved" || sample.status === "Rejected"}
                  className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-lg transition-colors ${
                    sample.status === "Rejected"
                      ? 'bg-red-600 text-white cursor-not-allowed opacity-50'
                      : sample.status === "Approved"
                      ? 'bg-gray-700 text-gray-300 cursor-not-allowed opacity-50'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <X size={16} />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed mb-6 bottom-0" style={{width: "850px"}}> {/* Add padding bottom to prevent content from being hidden behind the fixed bottom bar */}
        <Bottom setStep={setStep} allSamplesApproved={allSamplesApproved} isLiveSample={isLiveSample} />
      </div>
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        onConfirm={handleConfirmationProceed}
      />
      <CommentModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, type: 'approve' })}
        onConfirm={handleModalConfirm}
        type={modalState.type}
        initialMessage={modalState.initialMessage}
      />
      <ProductionApprovalModal
        isOpen={showProductionApproval}
        onClose={() => setShowProductionApproval(false)}
        onConfirm={handleProductionApproval}
      />
      {selectedImage && (
        <ImageViewer
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage.url}
          title={selectedImage.title}
        />
      )}
    </div>
  );
}

export default ArtworkPhotoSample;
