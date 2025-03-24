import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { FileSearch, FileX } from 'lucide-react';

import Empty from '../../../component/Vendor/Files/Empty';

interface RevisionsProps {
  selectedOrderData: any,
  revisions: any,
}

function Files({selectedOrderData, revisions}: RevisionsProps) {

  const { version_id, section } = useParams();
  
  // Find the version in the selectedOrderData.versions array
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );

  return (
    <div>
      {revisions == "No revisions found." ? <Empty />
      : "files"}
      
    </div>
  )
}

export default Files;