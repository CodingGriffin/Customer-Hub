import React, { useState, useRef, useEffect } from 'react';
import { Folder, File, ChevronRight, Upload, Trash2, FolderPlus, MoreVertical, Copy, Pencil, FolderInput, X, Image, Search, Menu, Binary as Binoculars, EyeOff, Eye, Sparkles, Info } from 'lucide-react';

type FileItem = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified?: string;
  hidden?: boolean;
  aiRecommendation?: {
    type: 'rename' | 'delete';
    newName?: string;
  };
};

function App() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [items, setItems] = useState<FileItem[]>([
    { id: '1', name: 'Documents', type: 'folder', hidden: false },
    { id: '2', name: 'Images', type: 'folder', hidden: false },
    { id: '3', name: 'report.pdf', type: 'file', size: '2.4 MB', modified: '2024-03-15', hidden: false },
    { id: '4', name: 'presentation.pptx', type: 'file', size: '5.1 MB', modified: '2024-03-14', hidden: false },
  ]);

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

  const handleAIAnalysis = () => {
    setShowAIModal(true);
    setAnalysisStep(0);

    setTimeout(() => {
      setShowAIModal(false);
      setItems(prevItems => prevItems.map(item => ({
        ...item,
        aiRecommendation: Math.random() > 0.5 
          ? { type: 'rename', newName: `optimized_${item.name}` }
          : { type: 'delete' }
      })));
    }, 5000);
  };

  const handleAcceptRecommendation = (id: string) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id && item.aiRecommendation) {
        if (item.aiRecommendation.type === 'rename' && item.aiRecommendation.newName) {
          return { ...item, name: item.aiRecommendation.newName, aiRecommendation: undefined };
        }
        return item.aiRecommendation.type === 'delete' ? null : item;
      }
      return item;
    }).filter((item): item is FileItem => item !== null));
  };

  const handleDiscardRecommendation = (id: string) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, aiRecommendation: undefined } : item
    ));
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleRename = (id: string, currentName: string) => {
    setIsRenaming(id);
    setNewName(currentName);
    setActiveDropdown(null);
  };

  const handleRenameSubmit = (id: string) => {
    if (newName.trim()) {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, name: newName.trim() } : item
        )
      );
    }
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
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, hidden: !item.hidden } : item
      )
    );
    setActiveDropdown(null);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Info className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Important Guidelines</h2>
                </div>
                <button
                  onClick={() => setShowWelcomeModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">File Naming Best Practices:</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Use short, descriptive names that explain the content</li>
                    <li>• Avoid special characters (only use letters, numbers, hyphens, and underscores)</li>
                    <li>• It is best to place all of your files in one folder, then upload the entire folder.</li>
                    <li>• Our most successful customers create a USB master and asks their colleagues to review before uploading.</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600">Large file uploads:</span> Don't worry if you have a slow connection - uploads are resumable and can be paused/resumed at any time.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowWelcomeModal(false)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">File Manager</h1>
            <div className="flex items-center gap-4">
              <button
                disabled
                className="hidden sm:flex items-center px-3 py-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed text-sm"
              >
                <Binoculars className="w-4 h-4 mr-1.5" />
                <span>View Active Uploads</span>
              </button>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="sm:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600 overflow-x-auto whitespace-nowrap pb-2">
          {currentPath.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
              <span className="hover:text-blue-600 cursor-pointer">{item}</span>
            </React.Fragment>
          ))}
        </div>

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
              <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                <FolderPlus className="w-4 h-4 mr-1.5" />
                <span>New Folder</span>
              </button>
            </div>
          </div>

          {/* Right side - Drag target area */}
          <div
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
          </div>
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
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="hidden sm:grid px-4 sm:px-6 py-3 border-b border-gray-200 grid-cols-12 text-xs sm:text-sm font-medium text-gray-500">
            <div className="col-span-6">Name</div>
            <div className="col-span-3">Size</div>
            <div className="col-span-3">Modified</div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredItems.length === 0 ? (
              <div className="px-4 sm:px-6 py-8 text-center text-gray-500 text-sm">
                No items found matching your search
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id}>
                  <div
                    className={`px-4 sm:px-6 py-3 sm:grid sm:grid-cols-12 sm:items-center hover:bg-gray-50 ${
                      item.hidden ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center col-span-6 mb-2 sm:mb-0">
                      {item.type === 'folder' ? (
                        <Folder className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      ) : (
                        <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      {isRenaming === item.id ? (
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleRenameSubmit(item.id);
                          }}
                          className="flex-1 ml-3"
                        >
                          <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            autoFocus
                            onBlur={() => handleRenameSubmit(item.id)}
                          />
                        </form>
                      ) : (
                        <span className="ml-3 text-gray-900 text-sm">{item.name}</span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 col-span-3">
                      {item.size || '--'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 col-span-2">
                      {item.modified || '--'}
                    </div>
                    <div className="flex justify-end col-span-1">
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                          className="p-1.5 hover:bg-gray-100 rounded-full"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {activeDropdown === item.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                              <button
                                onClick={() => handleRename(item.id, item.name)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Pencil className="w-4 h-4 mr-2" />
                                Rename
                              </button>
                              <button
                                onClick={() => handleMove(item.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <FolderInput className="w-4 h-4 mr-2" />
                                Move to...
                              </button>
                              <button
                                onClick={() => handleCopy(item.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy to...
                              </button>
                              <button
                                onClick={() => handleToggleHidden(item.id)}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {item.hidden ? (
                                  <>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Unhide
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-4 h-4 mr-2" />
                                    Hide
                                  </>
                                )}
                              </button>
                              <button
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
                  {/* AI Recommendation */}
                  {item.aiRecommendation && (
                    <div className="px-4 sm:px-6 py-2 bg-purple-50">
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
                              onClick={() => handleAcceptRecommendation(item.id)}
                              className="text-xs text-purple-700 hover:text-purple-900 font-medium"
                            >
                              Accept
                            </button>
                            <span className="text-purple-300">|</span>
                            <button
                              onClick={() => handleDiscardRecommendation(item.id)}
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
              ))
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Upload Files</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drag and Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 sm:p-8 mb-6 text-center ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div className="flex flex-col items-center">
                  <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-4" />
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    Drag and drop files here, or{' '}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Supported files: Images, Documents, and more
                  </p>
                </div>
              </div>

              {/* Selected Files List */}
              {selectedFiles.length > 0 && (
                <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="p-3 sm:p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3 min-w-0">
                        <Image className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-600 ml-3 flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedFiles([]);
                  }}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={selectedFiles.length === 0}
                >
                  Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Analyzing Partition with AI</h2>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full ${analysisStep >= 1 ? 'bg-purple-600' : 'bg-gray-200'} mr-3`} />
                  <span className={`text-sm ${analysisStep >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                    Determining Data Upload Type
                  </span>
                </div>
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full ${analysisStep >= 2 ? 'bg-purple-600' : 'bg-gray-200'} mr-3`} />
                  <span className={`text-sm ${analysisStep >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                    Looking for common extraneous, unnecessary files
                  </span>
                </div>
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full ${analysisStep >= 3 ? 'bg-purple-600' : 'bg-gray-200'} mr-3`} />
                  <span className={`text-sm ${analysisStep >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>
                    Examining file name length
                  </span>
                </div>
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full ${analysisStep >= 4 ? 'bg-purple-600' : 'bg-gray-200'} mr-3`} />
                  <span className={`text-sm ${analysisStep >= 4 ? 'text-gray-900' : 'text-gray-500'}`}>
                    Formulating Recommendations
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;