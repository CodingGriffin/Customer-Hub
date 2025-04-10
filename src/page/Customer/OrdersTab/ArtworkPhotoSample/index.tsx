import React, { useEffect, useState } from 'react';
import { Check, X, AlertTriangle, Pencil, FileCheck, Package, Scale } from 'lucide-react';

import ProductionApprovalModal from './ProductionApprovalModal';
import ConfirmationModal from './ConfirmationModal';
import CommentModal from './CommentModal';
import ImageViewer from '../../../../component/ArtworkPhotoSample/ImageViewer';

interface PhotoSampleProps {
  addComment: (comment: string, sample_id: number) => void,
  selectedOrderData: any,
  samples: any,
  isLiveSample: boolean,
}

const initialImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
    title: 'Product Photo 1',
    approved: true,
    message: ""
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
    title: 'Product Photo 2',
    approved: true,
    message: ""
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=60',
    title: 'Product Photo 3',
    approved: true,
    message: ""
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60',
    title: 'Product Photo 4',
    approved: true,
    message: ""
  },
];

function ArtworkPhotoSample({selectedOrderData, samples, addComment, isLiveSample = false}: PhotoSampleProps) {
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

  const handleApprove = (id: string) => {
    // setImages(images.map(img => {
    //   if (img.id === id) {
    //     return { ...img, approved: true, message: "undefined" };
    //   }
    //   return img;
    // }));
  };

  const handleReject = (id: string) => {
    // setModalState({
    //   isOpen: true,
    //   type: 'reject',
    //   imageId: id,
    //   initialMessage: images.find(img => img.id === id)?.message || '',
    // });
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

  // const anyRejected = images.some(img => !img.approved);
  const anyRejected = false;

  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {samples.map((sample: any) => (
          <div key={sample.id} className="dark:bg-slate-900 bg-gray-600 rounded-lg overflow-hidden">
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
              <h3 className="text-white font-medium mb-3">{sample.name}</h3>
              {sample.message && (
                <div className="flex items-start gap-2 mb-3 bg-slate-800 p-2 rounded">
                  <p className="text-red-400 text-sm flex-1">{sample.message}</p>
                  <button
                    onClick={() => handleEditComment(sample.id, sample.message || '')}
                    className="text-slate-400 hover:text-white p-1"
                    title="Edit comment"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleRemoveComment(sample.id)}
                    className="text-slate-400 hover:text-white p-1"
                    title="Remove comment"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(sample.id)}
                  className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-lg transition-colors ${
                    sample.approved
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Check size={16} />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(sample.id)}
                  className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-lg transition-colors ${
                    !sample.approved
                      ? 'bg-red-600 text-white'
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
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          anyRejected
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white flex items-center justify-center gap-2`}
      >
        {anyRejected ? (
          <>
            <AlertTriangle size={20} />
            <span>Provide Comments</span>
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
