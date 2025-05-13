import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { VersionsContext } from '../../../types';
import actions from "../../../states/PhotoSamples/actions";
import commentActions from "../../../states/Comments/actions";
import ArtworkPhotoSample from '../../../page/Customer/OrdersTab/ArtworkPhotoSample';

export default function ArtworkPhotoSampleContainer() {
  const { version_id, section } = useParams();
  const navigate = useNavigate();
  const { setStep, currentStep, selectedOrderData, selectedSection, setSelectedStep } = useOutletContext<VersionsContext>();
  const hash = window.location.hash;
  
  const dispatch = useDispatch();
  // if (currentStep) {
  //   setStep(currentStep);
  // }
  // Get the current version and its live sample status
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );
  const isLiveSample = currentVersion?.isSample || false;

  const {
    samples,
    loading,
    error,
  } = useSelector((state: any) => state.samples);

  const {
    comments,
  } = useSelector((state: any) => state.comments);

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

  const getPhotoSamples = async () => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');

    await dispatch({
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

  const updatePhotoSample = (sampleId: any, status: any) => {
    dispatch({
      type: actions.GET_SAMPLES,
      payload: {
        mode: "updateSampleStatus",
        photo_sample_id: sampleId,
        status: status,
      }
    });
    getPhotoSamples()
  }

  const addComment = async (comment: string, sample_id: number) => {
    await dispatch({
      type: commentActions.ADD_COMMENTS,
      payload: {
        mode: "insertSampleComment",
        comment: comment,
        resource_id: 100000 + sample_id,
        table_code: "customer_table"
      }
    });
    await getComments();
  }

  const getComments = async () => {
    // Extract all photo_sample_ids and add 100000 to each
    const resourceIds = samples.data 
      ? samples.data.map((sample: any) => 100000 + sample.photo_sample_id)
      : [];

    await dispatch({
      type: commentActions.GET_COMMENTS,
      payload: {
        mode: "getPhotoSampleComments",
        resource_ids: '[' + resourceIds.join(',') + ']', // Convert array to comma-separated string
        hash: encodeURIComponent(hash)
      }
    });
  }

  // return <PhotoSamples selectedOrderData={selectedOrderData} samples={samples.data ? samples.data : []} comments={comments.data ? comments.data : []} addComment={addComment} />

  return <ArtworkPhotoSample 
    selectedOrderData={selectedOrderData} 
    samples={samples.data ? samples.data : []} 
    comments={comments.data ? comments.data : []}
    isLiveSample={isLiveSample} 
    setStep={setStep}
    addComment={addComment} 
    updatePhotoSample={updatePhotoSample} 
  />;
}
