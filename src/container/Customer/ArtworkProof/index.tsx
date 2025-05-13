import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import ArtworkProofViewer from '../../../page/Customer/OrdersTab/ArtworkProofViewer';
import { VersionsContext } from '../../../types';
import actions from "../../../states/ArtworkProof/actions";

export default function ArtworkProof() {
  const { version_id } = useParams();
  const hash = window.location.hash;

  const {
    reviewers,
    loading,
    error,
  } = useSelector((state: any) => state.artworkProof);

  const dispatch = useDispatch();

  const { selectedOrderData, selectedSection, setStep } = useOutletContext<VersionsContext>();

  useEffect(() => {
    getReviewers();
  }, [dispatch]);

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

  const inviteReviewer = async (contactName: string, email: [string], type: string, isApprover: boolean, isUploader: boolean, isData: boolean, isArtwork: boolean) => {
    await dispatch({
      type: actions.INVITE_REVIEWER,
      payload: {
        mode: "insert",
        entities_id: 163,
        job_number: selectedOrderData.job.job_number,
        contact_name: contactName,
        email: email,
        phone_types_id:2,
        contact_acl: type,
        data: isData,
        artwork: isArtwork,
        approver: isApprover,
        uploader: isUploader,
      }
    });
    await getReviewers()
  }

  const getReviewers = () => {
    dispatch({
      type: actions.GET_REVIEWERS,
      payload: {
        mode: "getReviewers",
        entities_id: 163,
        job_number: Number(selectedOrderData.job.job_number),
        hash: encodeURIComponent(hash)
      }
    });
  }

  const removeReviewer = async (contactId: number) => {
    await dispatch({
      type: actions.REMOVE_REVIEWER,
      payload: {
        mode: "contoggle",
        entities_id: 163,
        job_number: Number(selectedOrderData.job.job_number),
        contact_id: contactId,
      }
    });
    await getReviewers()
  }

return <ArtworkProofViewer setStep={setStep} selectedOrderData={selectedOrderData} reviewers={reviewers.data ? reviewers.data : []} updateApproved={updateApproved} rejectApproved={rejectApproved} inviteReviewer={inviteReviewer} removeReviewer={removeReviewer} />;
}