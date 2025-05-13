import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';

import PhotoSamples from '../../../page/Vendor/PhotoSamples';
import { VersionsContext } from '../../../types';
import actions from "../../../states/PhotoSamples/actions";
import commentActions from "../../../states/Comments/actions";
import { useDispatch, useSelector } from 'react-redux';

export default function PhotoSampleContainer() {

  const { selectedOrderData, currentAbbr } = useOutletContext<VersionsContext>();
  const hash = window.location.hash;
  const dispatch = useDispatch();

  const {
    samples,
    loading,
    error,
  } = useSelector((state: any) => state.samples);

  const {
    comments,
  } = useSelector((state: any) => state.comments);

  
  const { version_id, section } = useParams();

  useEffect(() => {
    if (version_id) {
      getPhotoSamples();
    }
  }, [dispatch, version_id, section]);

  useEffect(() => {
    if (samples.data && samples.data.length > 0) {
      getComments();
    }
  }, [samples.data]);

  const getPhotoSamples = () => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');

    dispatch({
      type: actions.GET_SAMPLES,
      payload: {
        mode: "getPhotoSamples",
        jobs_id: selectedOrderData.job.job_number,
        versions_id: version_id,
        pads_type: padType,
        hash: encodeURIComponent(hash)
      }
    });
  }

  const addComment = (comment: string, sample_id: number) => {
    dispatch({
      type: commentActions.ADD_COMMENTS,
      payload: {
        mode: "insertSampleComment",
        comment: comment,
        resource_id: 100000 + sample_id,
        table_code: "vendor_table"
      }
    });
    getComments();
  }

  const getComments = () => {
    // Extract all photo_sample_ids and add 100000 to each
    const resourceIds = samples.data 
      ? samples.data.map((sample: any) => 100000 + sample.photo_sample_id)
      : [];

    dispatch({
      type: commentActions.GET_COMMENTS,
      payload: {
        mode: "getPhotoSampleComments",
        resource_ids: '[' + resourceIds.join(',') + ']', // Convert array to comma-separated string
        hash: encodeURIComponent(hash)
      }
    });
  }

  return <PhotoSamples selectedOrderData={selectedOrderData} currentAbbr={currentAbbr} samples={samples.data ? samples.data : []} comments={comments.data ? comments.data : []} addComment={addComment} />
}
