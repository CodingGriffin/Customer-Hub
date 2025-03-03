import React from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import ArtworkProofViewer from '../../../page/Customer/OrdersTab/ArtworkProofViewer';
import { VersionsContext } from '../../../types';
import actions from "../../../states/ArtworkProof/actions";

export default function ArtworkProof() {
  const { version_id } = useParams();
  const dispatch = useDispatch();

  const { selectedOrderData, selectedSection, setStep } = useOutletContext<VersionsContext>();

  const updateApproved = async (comment: string, pad_line_items_id: number) => {
    await dispatch({
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
    await setStep(4);
  }

  const rejectApproved = async (comment: string, pad_line_items_id: number) => {
    await dispatch({
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
    await setStep(2);
  }

  const inviteReviewer = (contactName: string, email: [string], type: string, isApprover: boolean, isUploader: boolean) => {
    dispatch({
      type: actions.INVITE_REVIEWER,
      payload: {
        mode: "insert",
        entities_id: 163,
        job_number: selectedOrderData.job.job_number,
        contact_name: contactName,
        email: email,
        phone_types_id:2,
        contact_acl: type,
        approver: isApprover,
        uploader: isUploader,
      }
    });
  }

return <ArtworkProofViewer setStep={setStep} selectedOrderData={selectedOrderData} updateApproved={updateApproved} rejectApproved={rejectApproved} inviteReviewer={inviteReviewer} />;
}