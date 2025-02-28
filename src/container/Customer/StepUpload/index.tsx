import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import StepUpload from '../../../page/Customer/OrdersTab/StepUploads';
import { VersionsContext } from '../../../types';
import actions from "../../../states/PADStatus/actions";
import { useDispatch } from 'react-redux';

export default function StepUploadContainer() {
  const { setStep, currentStep, selectedOrderData } = useOutletContext<VersionsContext>();
  const dispatch = useDispatch();

  if (currentStep) {
    setStep(currentStep);
  }

  const updateStatus = (pad_line_items_id: number) => {
    dispatch({
      type: actions.UPDATE_STATUS,
      payload: {
        mode: "proofSent",
        pad_line_items_id: pad_line_items_id,
        status: 1,
        job_number: selectedOrderData.job.job_number,
        code: "p",
        abbr: "v-upload-receive",
        onlyPhoto: false
      }
    });
  }

  return <StepUpload setStep={setStep} updateStatus={updateStatus} selectedOrderData={selectedOrderData} />;
}