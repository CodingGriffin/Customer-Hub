import React, { useState } from 'react';

import Header from '../../../../component/StepUpload/HeaderComponent';
import Nav from '../../../../component/StepUpload/NavComponent';
import Advanced from './Advanced';
import Review from './Review';
import NameIcon from './NameIcon';

interface StepUploadProps {
  setSelectedStep: (id: number) => void;
}

function StepUpload({setSelectedStep}: StepUploadProps) {
  const [windowsDriveLabel, setWindowsDriveLabel] = useState('USB DRIVE');
  const [macosDriveLabel, setMacosDriveLabel] = useState('USB DRIVE');
  const [activeTab, setActiveTab] = useState('format');
  const [selectedFormat, setSelectedFormat] = useState('FAT32');
  const [nameIconStep, setNameIconStep] = useState(1);

  const continueSetup = () => {
    setSelectedStep(3);
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'advanced':
        return <Advanced selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat} />;
      case 'review':
        return <Review selectedFormat={selectedFormat} windowsDriveLabel={windowsDriveLabel} macosDriveLabel={macosDriveLabel} />;
      case 'data-files':
        return <div></div>; // Empty content for data-files tab
      default:
        return <NameIcon windowsDriveLabel={windowsDriveLabel} setWindowsDriveLabel={setWindowsDriveLabel} setMacosDriveLabel={setMacosDriveLabel} macosDriveLabel={macosDriveLabel} nameIconStep={nameIconStep} setNameIconStep={setNameIconStep} />
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-800/50 p-3">
      {/* Header */}
      <Header />

      {/* Top Navigation */}
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      {renderContent()}
      <div className="flex justify-end">
        <button
          onClick={continueSetup}
          disabled={!(nameIconStep == 3)}
          className={`px-4 py-2 rounded-md text-white ${
            nameIconStep == 3
              ? 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
              : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default StepUpload;