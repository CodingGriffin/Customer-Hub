import React, { useEffect, useState } from 'react';
import { Check, X, AlertTriangle, Pencil, FileCheck, Package, Scale } from 'lucide-react';

import ProductionApprovalModal from './ProductionApprovalModal';
import ConfirmationModal from './ConfirmationModal';
import CommentModal from './CommentModal';
import ImageViewer from '../../../../component/ArtworkPhotoSample/ImageViewer';
import { useParams } from 'react-router-dom';

interface PhotoSampleProps {
  addComment: (comment: string, sample_id: number) => void,
  selectedOrderData: any,
  samples: any,
  isLiveSample: boolean,
  updatePhotoSample: (sampleId: any, status: any) => void,
}

function ArtworkPhotoSample({selectedOrderData, samples, addComment, isLiveSample, updatePhotoSample}: PhotoSampleProps) {
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
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL

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
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {samples.map((sample: any) => (
          <div key={sample.photo_sample_id} className="dark:bg-slate-900 bg-gray-600 rounded-lg overflow-hidden">
            <div 
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage({ url: baseUrl + sample.file_path, title: sample.name })}
            >
              <img
                src={baseUrl + sample.file_path}
                alt={sample.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm">Click to view</span>
              </div>
            </div>
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
              {sample.message && (
                <div className="flex items-start gap-2 mb-3 bg-slate-800 p-2 rounded">
                  <p className="text-red-400 text-sm flex-1">{sample.message}</p>
                  <button
                    onClick={() => handleEditComment(sample.photo_sample_id, sample.message || '')}
                    className="text-slate-400 hover:text-white p-1"
                    title="Edit comment"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleRemoveComment(sample.photo_sample_id)}
                    className="text-slate-400 hover:text-white p-1"
                    title="Remove comment"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(sample.photo_sample_id)}
                  disabled={sample.status === "Approved" || sample.status === "Rejected"}
                  className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-lg transition-colors ${
                    sample.status === "Approved"
                      ? 'bg-green-600 text-white cursor-not-allowed opacity-50'
                      : sample.status === "Rejected"
                      ? 'bg-slate-800 text-slate-300 cursor-not-allowed opacity-50'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Check size={16} />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(sample.photo_sample_id)}
                  disabled={sample.status === "Approved" || sample.status === "Rejected"}
                  className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-lg transition-colors ${
                    sample.status === "Rejected"
                      ? 'bg-red-600 text-white cursor-not-allowed opacity-50'
                      : sample.status === "Approved"
                      ? 'bg-slate-800 text-slate-300 cursor-not-allowed opacity-50'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
      <button
        onClick={handleBulkAction}
        disabled={!allSamplesApproved}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          !allSamplesApproved
            ? 'bg-gray-600 cursor-not-allowed opacity-50'
            : isLiveSample
            ? 'bg-purple-600 hover:bg-purple-700'
            : 'bg-blue-600 hover:bg-blue-700'
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
