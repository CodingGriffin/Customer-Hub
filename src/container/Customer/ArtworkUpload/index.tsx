import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ArtworkManagerPage from '../../../page/Customer/OrdersTab/ArtworkManager';
import { VersionsContext } from '../../../types';
import actions from "../../../states/PADStatus/actions";

export default function ArtworkUpload() {
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


  return <ArtworkManagerPage setStep={setStep} selectedOrderData={selectedOrderData} updateStatus={updateStatus} />;
}