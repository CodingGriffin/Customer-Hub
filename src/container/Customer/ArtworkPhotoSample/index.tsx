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
  const { selectedOrderData, selectedSection, setSelectedStep } = useOutletContext<VersionsContext>();
  const dispatch = useDispatch();

  // Get the current version and its live sample status
  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );
  const isLiveSample = currentVersion?.isReqApp || false;

  const {
    samples,
    loading,
    error,
  } = useSelector((state: any) => state.samples);

  const setStep = async (step: number) => {
    await setSelectedStep(step)
    if (step === 5) {
      if (selectedSection === 'data') {
        navigate(`../${version_id}/data-live-sample`);
      } else {
        navigate(`../${version_id}/artwork-live-sample`);
      }
    }
  };

  useEffect(() => {
    if (version_id) {
      getPhotoSamples();
    }
  }, [dispatch, version_id, section]);

  const getPhotoSamples = () => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');

    dispatch({
      type: actions.GET_SAMPLES,
      payload: {
        mode: "getPhotoSamples",
        jobs_id: selectedOrderData.job.job_number,
        versions_id: version_id,
        pads_type: padType,
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
  }

  // return <PhotoSamples selectedOrderData={selectedOrderData} samples={samples.data ? samples.data : []} comments={comments.data ? comments.data : []} addComment={addComment} />

  return <ArtworkPhotoSample 
    selectedOrderData={selectedOrderData} 
    samples={samples.data ? samples.data : []} 
    addComment={addComment} 
    isLiveSample={isLiveSample} 
    updatePhotoSample={updatePhotoSample} 
  />;
}
