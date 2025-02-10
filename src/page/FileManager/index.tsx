import React,  { useState } from 'react';
import { Folder, File, ChevronRight, Upload, Trash2, FolderPlus, MoreVertical, Copy, Pencil, FolderInput, Search, EyeOff, Eye, Sparkles } from 'lucide-react';

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

function index() {

  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRenaming, setIsRenaming] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [items, setItems] = useState<FileItem[]>([
    { id: '1', name: 'Documents', type: 'folder', hidden: false },
    { id: '2', name: 'Images', type: 'folder', hidden: false },
    { id: '3', name: 'report.pdf', type: 'file', size: '2.4 MB', modified: '2024-03-15', hidden: false },
    { id: '4', name: 'presentation.pptx', type: 'file', size: '5.1 MB', modified: '2024-03-14', hidden: false },
  ]);

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

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
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
  )
}

export default index;