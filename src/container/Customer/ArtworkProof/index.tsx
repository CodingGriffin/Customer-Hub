import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import ArtworkProofViewer from '../../../page/Customer/OrdersTab/ArtworkProofViewer';
import { VersionsContext } from '../../../types';
import actions from "../../../states/ArtworkProof/actions";

export default function ArtworkProof() {
  const { version_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedOrderData, selectedSection, setSelectedStep } = useOutletContext<VersionsContext>();

  const updateApproved = (comment: string, pad_line_items_id: number) => {
      dispatch({
        type: actions.UPDATE_APPROVED,
        payload: {
          mode: "proofSent",
          pad_line_items_id: pad_line_items_id,
          status: 3,
          jobnumber: selectedOrderData.job.job_number,
          code: "p",
          abbr: "v-proof-approved",
          customerComment: comment,
          onlyPhoto: false
        }
      });
    }
  
  const setStep = async (step: number) => {
    await setSelectedStep(step)
    if (step === 4) {
      if (selectedSection === 'data') {
        navigate(`../${version_id}/data-photo-sample`);
      } else {
        navigate(`../${version_id}/artwork-photo-sample`);
      }
    }
  };

  return <ArtworkProofViewer setSelectedStep={setStep} selectedOrderData={selectedOrderData} updateApproved={updateApproved} />;
}