import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import VendorFiles from '../../../page/Vendor/Files';
import { VersionsContext } from '../../../types';
import actions from "../../../states/Revisions/actions";
import commentActions from "../../../states/Comments/actions";
import photoSampleActions from "../../../states/PhotoSamples/actions";
import padActions from "../../../states/PADStatus/actions";

export default function FilesContainer() {

  const { selectedOrderData } = useOutletContext<VersionsContext>();
  const dispatch = useDispatch();

  const {
    revisions,
  } = useSelector((state: any) => state.revisions);

  const {
    samples,
  } = useSelector((state: any) => state.samples);

  const {
    comments,
    partitionComments,
  } = useSelector((state: any) => state.comments);

  const { version_id, section } = useParams();

  const pad_line_items_id = selectedOrderData?.pad_line_items?.find(
    (item: any) => item.pad_abbreviation == section && item.versions_id == version_id
  )?.pad_line_items_id;

  useEffect(() => {
    if (version_id) {
      getRevisions();
      getPhotoSamples();
    };
  }, [dispatch, version_id, section]);

  useEffect(() => {
    if (samples.data && samples.data.length > 0) {
      getPhotoSampleComments();
    }
  }, [samples.data]);

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

  const getPhotoSamples = () => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');

    dispatch({
      type: photoSampleActions.GET_SAMPLES,
      payload: {
        mode: "getPhotoSamples",
        jobs_id: selectedOrderData.job.job_number,
        versions_id: version_id,
        pads_type: padType,
      }
    });
  }

  const deletePhotoSample = (photo_sample_id: number) => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');

    dispatch({
      type: photoSampleActions.GET_SAMPLES,
      payload: {
        mode: "deleteSample",
        jobs_id: selectedOrderData.job.job_number,
        versions_id: version_id,
        pads_type: padType,
        photo_sample_id: photo_sample_id
      }
    });
  }

  const updatePartitionVerificationState = (rev_partition_id: number, state: string, rev_partition: number) => {
    const version = selectedOrderData?.versions?.find(
      (v: any) => v.version_id == version_id
    );
    const version_number = version?.version_number;

    dispatch({
      type: actions.UPDATE_PARTITIONVERFICATIONSTATE,
      payload: {
        mode: "updatePartitionVerificationState",
        rev_partition_id: rev_partition_id,
        rev_partition: rev_partition,
        verification_state: state,
        jobs_id: selectedOrderData.job.job_number, // Adjust this based on how you want to get the job number
        version_number: version_number,
        pads_type: section
      }
    });
  }

  const getPartitionComments = (resource_ids: any) => {
    // Extract all photo_sample_ids and add 100000 to each
    dispatch({
      type: commentActions.GET_PARTITIONCOMMENTS,
      payload: {
        mode: "getPartitionComments",
        resource_ids: resource_ids, // Convert array to comma-separated string
      }
    });
  }

  const getPhotoSampleComments = () => {
    // Extract all photo_sample_ids and add 100000 to each
    const resourceIds = samples.data 
      ? samples.data.map((sample: any) => 100000 + sample.photo_sample_id)
      : [];

    dispatch({
      type: commentActions.GET_COMMENTS,
      payload: {
        mode: "getPhotoSampleComments",
        resource_ids: '[' + resourceIds.join(',') + ']', // Convert array to comma-separated string
      }
    });
  }

  const addPartitionComment = (comment: string, partition_id: number, field: string) => {
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

  const addPhotoSampleComment = (comment: string, sample_id: number) => {
    dispatch({
      type: commentActions.ADD_COMMENTS,
      payload: {
        mode: "insertSampleComment",
        comment: comment,
        resource_id: 100000 + sample_id,
        table_code: "vendor_table"
      }
    });
    getPhotoSampleComments();
  }

  const updateStatus = () => {
    dispatch({
      type: padActions.UPDATE_STATUS,
      payload: {
        mode: "proofSent",
        pad_line_items_id: pad_line_items_id,
        status: 0,
        job_number: selectedOrderData.job.job_number,
        code: "p",
        abbr: "v-photo-sample-received",
        onlyPhoto: false
      }
    });
  }

  return <VendorFiles selectedOrderData={selectedOrderData} revisions={revisions.data ? revisions.data : []} samples={samples.data ? samples.data : []} comments={comments.data ? comments.data : []} partitionComments={partitionComments.data ? partitionComments.data : []} addPhotoSampleComment={addPhotoSampleComment} addPartitionComment={addPartitionComment} getPartitionComments={getPartitionComments} updatePartitionVerificationState={updatePartitionVerificationState} updateStatus={updateStatus} deletePhotoSample={deletePhotoSample} />;
}
