import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import VendorFiles from '../../../page/Vendor/Files';
import { VersionsContext } from '../../../types';
import actions from "../../../states/Revisions/actions";
import commentActions from "../../../states/Comments/actions";

export default function FilesContainer() {

  const { selectedOrderData } = useOutletContext<VersionsContext>();
  const dispatch = useDispatch();

  const {
    revisions,
    loading,
    error,
  } = useSelector((state: any) => state.revisions);

  const {
    comments,
  } = useSelector((state: any) => state.comments);

  const { version_id, section } = useParams();

  useEffect(() => {
    if (version_id) getRevisions();
  }, [dispatch, version_id, section]);

  const getRevisions = () => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');
    
    // Find the version_number from selectedOrderData.versions
    const version = selectedOrderData?.versions?.find(
      (v: any) => v.version_id == version_id
    );
    const version_number = version?.version_number;

    dispatch({
      type: actions.GET_REVISIONS,
      payload: {
        mode: "getrevisions",
        job_number: selectedOrderData.job.job_number,
        version_number: version_number,
        pad: padType,
      }
    });
  }

  const updatePartitionVerificationState = (rev_partition_id: number, state: string) => {
    dispatch({
      type: actions.UPDATE_PARTITIONVERFICATIONSTATE,
      payload: {
        mode: "updatePartitionVerificationState",
        rev_partition_id: rev_partition_id,
        verification_state: state,
      }
    });
  }

  const getComments = (resource_ids: any) => {
    // Extract all photo_sample_ids and add 100000 to each
    dispatch({
      type: commentActions.GET_COMMENTS,
      payload: {
        mode: "getPartitionComments",
        resource_ids: resource_ids, // Convert array to comma-separated string
      }
    });
  }

  const addComment = (comment: string, partition_id: number, field: string) => {
    dispatch({
      type: commentActions.ADD_COMMENTS,
      payload: {
        mode: "insertPartitionComment",
        comment: comment,
        resource_id: partition_id,
        table_code: "partition_" + field + "_table"
      }
    });
  }

  return <VendorFiles selectedOrderData={selectedOrderData} revisions={revisions.data ? revisions.data : []} comments={comments.data ? comments.data : []} addComment={addComment} getComments={getComments} updatePartitionVerificationState={updatePartitionVerificationState} />;
}
