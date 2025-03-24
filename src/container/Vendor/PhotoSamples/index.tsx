import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';

import PhotoSamples from '../../../page/Vendor/PhotoSamples';
import { VersionsContext } from '../../../types';
import actions from "../../../states/PhotoSamples/actions";
import { useDispatch, useSelector } from 'react-redux';

export default function PhotoSampleContainer() {

  const { selectedOrderData } = useOutletContext<VersionsContext>();
  const dispatch = useDispatch();

  const {
    samples,
    loading,
    error,
  } = useSelector((state: any) => state.samples);
  
  const { version_id, section } = useParams();

  useEffect(() => {
    if (version_id) getPhotoSamples();
  }, [dispatch, version_id, section]);

  const getPhotoSamples = () => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');

    dispatch({
      type: actions.GET_SAMPLES,
      payload: {
        mode: "getPhotoSamples",
        jobs_id: selectedOrderData.job.job_number,
        version_number: version_id,
        pad: padType,
      }
    });
  }

  return <PhotoSamples selectedOrderData={selectedOrderData} samples={samples.data ? samples.data : []} />
}
