import React,  { useState, useEffect, useCallback } from 'react';
import { Folder, File, ChevronRight, Upload, Trash2, FolderPlus, MoreVertical, Pencil, Search, Sparkles, MessageSquare } from 'lucide-react';
import { useParams } from 'react-router-dom';

import Header from '../../../../component/ArtworkManager/HeaderComponent';
import WelcomeModal from './WelcomeModal';
import UploadModal from './UploadModal';
import AIModal from './AIModal';
import CommentModal from './CommentModal';
import Bottom from './Bottom';
import { ArtworkManagerItemType } from '../../../../types';

interface ArtworkManagerProps {
  updateStatus: (pad_line_items_id: number) => void;
  setStep: (id: number) => void;
  updateName: (oldName: any, newName: any) => void;
  removeFile: (name: any) => void;
  selectedOrderData: any;
  files: any;
}

const PRINT_LOCATIONS = ['Front', 'Back', 'Cap - Front', 'Cap - Back', 'To Be Pulled From flash_drives table'];

const ArtworkManagerPage = ({selectedOrderData, files, setStep, updateStatus, updateName, removeFile}: ArtworkManagerProps) => {
  const { version_id, section } = useParams();
  
  // Find the version in the selectedOrderData.versions array
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );

  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [oldName, setOldName] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [items, setItems] = useState<any>([]);

  const padType = section?.substring(0, 4);

  const pad_line_items_id = selectedOrderData?.pad_line_items?.find(
    (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
  )?.pad_line_items_id;

  useEffect(() => {
    if (files && files.length > 0) {
      setItems(files);
    }
  }, [files])

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAIModal) {
      timer = setInterval(() => {
        setAnalysisStep(prev => {
          if (prev < 4) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showAIModal]);

  const handleCloseWelcomeModal = useCallback(() => {
    setShowWelcomeModal(false);
  }, []);

  const handleCloseAIModal = useCallback(() => {
    setShowAIModal(false);
  }, []);

  const handleCloseWUploadModal = useCallback(() => {
    setShowUploadModal(false);
  }, []);

  const handleAIAnalysis = () => {
    setShowAIModal(true);
    setAnalysisStep(0);

    // setTimeout(() => {
    //   setShowAIModal(false);
    //   setItems(prevItems => prevItems.map(item => ({
    //     ...item,
    //     aiRecommendation: Math.random() > 0.5 
    //       ? { type: 'rename', newName: `optimized_${item.name}` }
    //       : { type: 'delete' }
    //   })));
    // }, 5000);
  };

  const handlePrintLocationChange = (id: string, location: string) => {
    // setItems(prevItems =>
    //   prevItems.map(item =>
    //     item.upload_id === id ? { ...item, printLocation: location } : item
    //   )
    // );
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleCommentClick = (id: string) => {
    setActiveFileId(id);
    // const file = items.find(item => item.upload_id === id);
    // setCommentText(file?.comment || '');
    setShowCommentModal(true);
    setActiveDropdown(null);
  };

  const handleDelete = (id: string, name: string) => {
    setItems((prevItems: any) => prevItems.filter((item: any) => item.upload_id !== id));
    removeFile(name);
    setActiveDropdown(null);
  };

  // const filteredItems = items.filter(item =>
  //   item.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const handleRename = (id: string, currentName: string) => {
    setIsRenaming(id);
    setNewName(currentName);
    setOldName(currentName);
    setActiveDropdown(null);
  };

  const handleRenameSubmit = (id: any) => {
    if (newName.trim()) {
      setItems((prevItems: any) =>
        prevItems.map((item: any) =>
          item.upload_id == id ? { ...item, file_name: newName.trim() } : item
        )
      );
    }
    updateName(oldName ,newName);
    setIsRenaming(null);
    setNewName('');
  };

  const handleMove = (id: string) => {
    setActiveDropdown(null);
  };

  const handleCopy = (id: string) => {
    setActiveDropdown(null);
  };

  const handleToggleHidden = (id: string) => {
    // setItems(prevItems =>
    //   prevItems.map(item =>
    //     item.upload_id === id ? { ...item, hidden: !item.hidden } : item
    //   )
    // );
    setActiveDropdown(null);
  };

  const handleAcceptRecommendation = (id: string) => {
    // setItems(prevItems => prevItems.map(item => {
    //   if (item.upload_id === id && item.aiRecommendation) {
    //     if (item.aiRecommendation.type === 'rename' && item.aiRecommendation.newName) {
    //       return { ...item, name: item.aiRecommendation.newName, aiRecommendation: undefined };
    //     }
    //     return item.aiRecommendation.type === 'delete' ? null : item;
    //   }
    //   return item;
    // }).filter((item): item is ArtworkManagerItemType => item !== null));
  };

  const handleDiscardRecommendation = (id: string) => {
    // setItems(prevItems => prevItems.map(item => 
    //   item.upload_id === id ? { ...item, aiRecommendation: undefined } : item
    // ));
  };

  const handleCommentSubmit = () => {
    // if (activeFileId) {
    //   setItems(prevItems =>
    //     prevItems.map(item =>
    //       item.upload_id === activeFileId ? { ...item, comment: commentText } : item
    //     )
    //   );
    //   setShowCommentModal(false);
    //   setCommentText('');
    //   setActiveFileId(null);
    // }
  };

  return (
    <div className="h-screen">
      {/* Welcome Modal */}
      {showWelcomeModal && <WelcomeModal _closeWelcomeModal = {handleCloseWelcomeModal} />}

      {/* Main Content */}
      <Header setStep={setStep} updateStatus={updateStatus} pad_line_items_id={pad_line_items_id} />
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Breadcrumb */}
      {/* <div className="flex items-center space-x-2 mb-4 text-sm dark:text-gray-600 overflow-x-auto whitespace-nowrap pb-2">
        {currentPath.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
            <span className="hover:text-blue-600 cursor-pointer">{item}</span>
          </React.Fragment>
        ))}
      </div> */}

        {/* Action Bar */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Left side - Buttons */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                onClick={handleAIAnalysis}
                className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                <Sparkles className="w-4 h-4 mr-1.5" />
                <span>Analyze with AI</span>
              </button>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Upload className="w-4 h-4 mr-1.5" />
                <span>Upload</span>
              </button>
            </div>
          </div>

          {/* Right side - Drag target area */}
          {/* <div
            className={`flex-1 border-2 border-dashed rounded-lg p-3 flex items-center justify-center ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex items-center text-sm text-gray-500">
              <Upload className="w-4 h-4 mr-2 text-gray-400" />
              <span>Drag files here to upload into the current folder</span>
            </div>
          </div> */}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Files and Folders Grid */}
        <div className="rounded-lg shadow overflow-hidden">
          <div className="hidden sm:grid px-4 sm:px-6 py-3 border-b border-gray-200 grid-cols-8 text-xs sm:text-sm font-medium text-gray-500">
            <div className="col-span-5">Name</div>
            <div className="col-span-1">Size</div>
            <div className="col-span-1">Modified</div>
            <div className="col-span-1">Actions</div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {items.map((item: any) => (
              <div key={item.upload_id}>
                <div className={`px-4 sm:px-6 py-3 hover:bg-gray-50 hover:dark:bg-gray-700 ${item.hidden ? 'opacity-50' : ''}`}>
                  <div className="sm:grid sm:grid-cols-8 sm:gap-4">
                    <div className="col-span-5">
                      <div className="flex items-center">
                        <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        {isRenaming === item.upload_id ? (
                          <form 
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleRenameSubmit(item.upload_id);
                            }}
                            className="flex-1 ml-3"
                          >
                            <input
                              type="text"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              autoFocus
                              onBlur={() => handleRenameSubmit(item.upload_id)}
                            />
                          </form>
                        ) : (
                          <span className="ml-3 text-gray-900 text-sm dark:text-white">{item.file_name}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 col-span-1">
                      {item.size || '--'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 col-span-1">
                      {item.modified || '--'}
                    </div>
                    <div className="flex justify-end col-span-1">
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.upload_id ? null : item.upload_id)}
                          className="p-1.5 hover:bg-gray-100 rounded-full"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {activeDropdown === item.upload_id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                              <button
                                onClick={() => handleRename(item.upload_id, item.file_name)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Pencil className="w-4 h-4 mr-2" />
                                Rename
                              </button>
                              <button
                                onClick={() => handleDelete(item.upload_id, item.file_name)}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-8 mt-2 ml-8">
                    <div className="flex items-center space-x-4">
                      <select
                        value={item.printLocation || ''}
                        onChange={(e) => handlePrintLocationChange(item.upload_id, e.target.value)}
                        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select print location...</option>
                        {PRINT_LOCATIONS.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleCommentClick(item.upload_id)}
                        className="flex items-center text-gray-500 hover:text-gray-700 text-sm hover:dark:text-gray-400"
                      >
                        <MessageSquare className="w-4 h-4 mr-1.5" />
                        <span>Tell our designers about this file...</span>
                      </button>
                    </div>
                  </div>
                </div>
                {item.comment && (
                  <div className="px-4 sm:px-6 py-2 bg-gray-50">
                    <div className="flex items-start">
                      <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="ml-2 text-sm text-gray-600">{item.comment}</p>
                    </div>
                  </div>
                )}
                {item.aiRecommendation && (
                  <div className="px-4 sm:px-6 py-2 bg-purple-50 dark:bg-gray-500">
                    <div className="flex items-start">
                      <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div className="ml-2">
                        <p className="text-sm text-purple-900">
                          AI Recommendation: {item.aiRecommendation.type === 'rename' 
                            ? `Rename File: ${item.aiRecommendation.newName}`
                            : 'Delete File'
                          }
                        </p>
                        <div className="mt-1 space-x-2">
                          <button
                            onClick={() => handleAcceptRecommendation(item.upload_id)}
                            className="text-xs text-purple-700 hover:text-purple-900 font-medium"
                          >
                            Accept
                          </button>
                          <span className="text-purple-300">|</span>
                          <button
                            onClick={() => handleDiscardRecommendation(item.upload_id)}
                            className="text-xs text-purple-700 hover:text-purple-900 font-medium"
                          >
                            Discard
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      {showCommentModal && <CommentModal commentText={commentText} setCommentText={setCommentText} setShowCommentModal={setShowCommentModal} handleCommentSubmit={handleCommentSubmit} />}
      {/* Upload Modal */}
      {showUploadModal && <UploadModal _closeUploadModal = {handleCloseWUploadModal} version_name={currentVersion?.version_name} section={section} />}

      {/* AI Modal */}
      {showAIModal && <AIModal analysisStep = {analysisStep} _closeAIModal = {handleCloseAIModal} />}
      <div className="fixed mb-6 bottom-0" style={{width: "850px"}}> {/* Add padding bottom to prevent content from being hidden behind the fixed bottom bar */}
        <Bottom setStep={setStep} updateStatus={updateStatus} pad_line_items_id={pad_line_items_id} />
      </div>

    </div>
    
  )
}

export default ArtworkManagerPage;
