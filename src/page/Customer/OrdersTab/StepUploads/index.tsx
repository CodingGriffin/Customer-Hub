import React, { useState } from 'react';

import Header from '../../../../component/StepUpload/HeaderComponent';
import Nav from '../../../../component/StepUpload/NavComponent';
import Advanced from './Advanced';
import Review from './Review';
import NameIcon from './NameIcon';

interface StepUploadProps {
  setStep: (id: number) => void;
}

function StepUpload({setStep}: StepUploadProps) {
  const [windowsDriveLabel, setWindowsDriveLabel] = useState('USB DRIVE');
  const [macosDriveLabel, setMacosDriveLabel] = useState('USB DRIVE');
  const [activeTab, setActiveTab] = useState('format');
  const [selectedFormat, setSelectedFormat] = useState('FAT32');
  const [nameIconStep, setNameIconStep] = useState(1);

  const continueSetup = () => {
    setStep(3);
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
      <Header activeTab={activeTab} continueSetup={continueSetup}/>

      {/* Top Navigation */}
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      {renderContent()}
    </div>
  );
}

export default StepUpload;