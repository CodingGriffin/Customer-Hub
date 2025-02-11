import React, { useState } from 'react';

import Header from '../../../../component/StepUpload/HeaderComponent';
import Nav from '../../../../component/StepUpload/NavComponent';
import Advanced from './Advanced';
import Review from './Review';
import NameIcon from './NameIcon';

function StepUpload() {
  const [windowsDriveLabel, setWindowsDriveLabel] = useState('USB DRIVE');
  const [macosDriveLabel, setMacosDriveLabel] = useState('USB DRIVE');
  const [activeTab, setActiveTab] = useState('format');
  const [selectedFormat, setSelectedFormat] = useState('FAT32');

  const formatContent = (
    <Advanced selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat} />
  );

  const finalizeContent = (
    <Review selectedFormat={selectedFormat} windowsDriveLabel={windowsDriveLabel} macosDriveLabel={macosDriveLabel} />
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'advanced':
        return formatContent;
      case 'review':
        return finalizeContent;
      case 'data-files':
        return <div></div>; // Empty content for data-files tab
      default:
        return <NameIcon windowsDriveLabel={windowsDriveLabel} setWindowsDriveLabel={setWindowsDriveLabel} setMacosDriveLabel={setMacosDriveLabel} macosDriveLabel={macosDriveLabel} />
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1d24] text-white p-8">
      {/* Header */}
      <Header />

      {/* Top Navigation */}
      <Nav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      {renderContent()}
    </div>
  );
}

export default StepUpload;