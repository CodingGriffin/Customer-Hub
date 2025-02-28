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

  const { selectedOrderData, selectedSection, setStep } = useOutletContext<VersionsContext>();

  const updateApproved = (comment: string, pad_line_items_id: number) => {
    dispatch({
      type: actions.UPDATE_APPROVED,
      payload: {
        mode: "proofSent",
        pad_line_items_id: pad_line_items_id,
        status: 3,
        job_number: selectedOrderData.job.job_number,
        code: "p",
        abbr: "v-proof-approved",
        customerComment: comment,
        onlyPhoto: false
      }
    });
  }

  const rejectApproved = (comment: string, pad_line_items_id: number) => {
    dispatch({
      type: actions.REJECT_APPROVED,
      payload: {
        mode: "proofSent",
        pad_line_items_id: pad_line_items_id,
        status: 2,
        job_number: selectedOrderData.job.job_number,
        code: "p",
        abbr: "v-proof-rejected",
        customerComment: comment,
        onlyPhoto: false
      }
    });
  }

return <ArtworkProofViewer setStep={setStep} selectedOrderData={selectedOrderData} updateApproved={updateApproved} rejectApproved={rejectApproved} />;
}