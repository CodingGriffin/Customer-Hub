import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { Coffee, MailCheck, MessageSquare, X } from 'lucide-react';
import { PHOTOSAMPLE_STATUS, SAMPLE_STATUS, PRODUCTION_STATUS } from '../../../types'

interface ProductionProps {
  currentAbbr: string;
  selectedOrderData: any;
  isLiveSample: boolean;
  comments: any[];
  addComment: (comment: string) => void;
}

function Production({selectedOrderData, currentAbbr, isLiveSample, comments, addComment}: ProductionProps) {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  // Filter and group the line items - only 'conf' items
  const groupedItems = selectedOrderData?.line_items
    ?.filter((item: any) => item.pad_abbreviation === 'conf')
    ?.reduce((acc: any, item: any) => {
      // Create unique key for deduplication
      const uniqueKey = `${item.line_item_name}-${item.line_item_desc}`;
      
      if (!acc[item.pad_abbreviation]) {
        acc[item.pad_abbreviation] = {
          pad_name: item.pad_name,
          items: new Map()
        };
      }
      
      // Only add if this combination doesn't exist yet
      if (!acc[item.pad_abbreviation].items.has(uniqueKey)) {
        acc[item.pad_abbreviation].items.set(uniqueKey, {
          line_item_name: item.line_item_name,
          line_item_desc: item.line_item_desc
        });
      }
      
      return acc;
    }, {});

  // Determine status text and styling based on currentAbbr
  const getPhotoSampleStatus = () => {
    if (Object.keys(PHOTOSAMPLE_STATUS).includes(currentAbbr)) {
      return {
        text: PHOTOSAMPLE_STATUS[currentAbbr as keyof typeof PHOTOSAMPLE_STATUS],
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        borderColor: 'border-blue-600'
      };
    } else if (Object.keys(SAMPLE_STATUS).includes(currentAbbr) || Object.keys(PRODUCTION_STATUS).includes(currentAbbr)) {
      return {
        text: 'APPROVED',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-500',
        borderColor: 'border-orange-500'
      };
    } else {
      return {
        text: 'UNAPPROVED',
        bgColor: 'bg-red-600',
        textColor: 'text-white',
        borderColor: 'border-red-600'
      };
    }
  };

  const getLiveSampleStatus = () => {
    if (Object.keys(SAMPLE_STATUS).includes(currentAbbr)) {
      return {
        text: SAMPLE_STATUS[currentAbbr as keyof typeof SAMPLE_STATUS],
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-500',
        borderColor: 'border-orange-500'
      };
    } else if (Object.keys(PRODUCTION_STATUS).includes(currentAbbr)) {
      return {
        text: 'APPROVED',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-500',
        borderColor: 'border-orange-500'
      };
    } else {
      return {
        text: 'UNAPPROVED',
        bgColor: 'bg-red-600',
        textColor: 'text-white',
        borderColor: 'border-red-600'
      };
    }
  };

  const getProductionStatus = () => {
    if (Object.keys(PRODUCTION_STATUS).includes(currentAbbr)) {
      return {
        text: PRODUCTION_STATUS[currentAbbr as keyof typeof PRODUCTION_STATUS],
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
        borderColor: 'border-green-600'
      };
    } else {
      return {
        text: 'UNAPPROVED',
        bgColor: 'bg-red-600',
        textColor: 'text-white',
        borderColor: 'border-red-600'
      };
    }
  };

  const photoSampleStatus = getPhotoSampleStatus();
  const liveSampleStatus = getLiveSampleStatus();
  const productionStatus = getProductionStatus();

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    
    // Here you would add the logic to send the comment
    console.log("Sending comment:", commentText);
    addComment(commentText);
    // Close modal and reset comment
    setShowCommentModal(false);
    setCommentText('');
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedItems || {}).map(([abbreviation, data]: [string, any]) => (
        <div key={abbreviation} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {data.pad_name}
          </h2>
          
          <div className="space-y-4">
            {Array.from(data.items.values()).map((item: any, index: number) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {item.line_item_name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.line_item_desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className={`w-full max-w-4xl mx-auto mt-6 p-3 font-bold text-2xl text-center border-2 ${photoSampleStatus.textColor} ${photoSampleStatus.borderColor} ${photoSampleStatus.bgColor}`}>
        PHOTO SAMPLE - {photoSampleStatus.text}
      </div>

      {isLiveSample &&
        <div className={`w-full max-w-4xl mx-auto mt-6 p-3 font-bold text-2xl text-center border-2 ${liveSampleStatus.textColor} ${liveSampleStatus.borderColor} ${liveSampleStatus.bgColor}`}>
          LIVE SAMPLE - {liveSampleStatus.text}
        </div>
      }
      <div className={`w-full max-w-4xl mx-auto mt-6 p-3 font-bold text-2xl text-center border-2 ${productionStatus.textColor} ${productionStatus.borderColor} ${productionStatus.bgColor}`}>
        MASS PRODUCTION - {productionStatus.text}
      </div>

      <button 
        onClick={() => setShowCommentModal(true)}
        className="w-full max-w-4xl mx-auto mt-6 p-3 font-bold text-2xl text-center border-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center"
      >
        <MessageSquare className="mr-2" size={24} />
        Send Comment
      </button>

      {/* Comments Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Comments
        </h2>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments && comments.length > 0 ? (
            comments.map((comment: any, index: number) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    comment.table_code === 'vendor_table'
                      ? 'bg-blue-100 text-blue-800'
                      : comment.table_code.startsWith('staff_table')
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {comment.table_code.includes('vendor_table') 
                      ? 'Vendor'
                      : 'Staff'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(comment.timestamp).toLocaleDateString()} {new Date(comment.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No comments yet
            </div>
          )}
        </div>
      </div>

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Add Comment</h2>
                <button
                  onClick={() => setShowCommentModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full h-32 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your comment here..."
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowCommentModal(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCommentSubmit}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Production;
