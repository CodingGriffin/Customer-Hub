import React, { useState } from 'react';

import Header from '../../../../component/StepUpload/HeaderComponent';
import Nav from '../../../../component/StepUpload/NavComponent';
import Advanced from './Advanced';
import Review from './Review';
import NameIcon from './NameIcon';
import { useParams } from 'react-router-dom';

interface StepUploadProps {
  updateStatus: (pad_line_items_id: number) => void;
  setStep: (id: number) => void;
  selectedOrderData: any
}

function StepUpload({selectedOrderData, setStep, updateStatus}: StepUploadProps) {
  const { version_id, section } = useParams();
  const [windowsDriveLabel, setWindowsDriveLabel] = useState('USB DRIVE');
  const [macosDriveLabel, setMacosDriveLabel] = useState('USB DRIVE');
  const [activeTab, setActiveTab] = useState('format');
  const [selectedFormat, setSelectedFormat] = useState('FAT32');
  const [nameIconStep, setNameIconStep] = useState(1);

  const padType = section?.substring(0, 4);

  const pad_line_items_id = selectedOrderData?.pad_line_items?.find(
    (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
  )?.pad_line_items_id;

  const continueSetup = async () => {
    await updateStatus(pad_line_items_id);
    await setStep(3);
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