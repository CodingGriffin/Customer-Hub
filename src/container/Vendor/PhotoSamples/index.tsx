import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';

import PhotoSamples from '../../../page/Vendor/PhotoSamples';
import { VersionsContext } from '../../../types';
import actions from "../../../states/PhotoSamples/actions";
import commentActions from "../../../states/Comments/actions";
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
        versions_id: version_id,
        pads_type: padType,
      }
    });
  }

  const addComment = (comment: string, sample_id: number) => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');
    const pad_line_items_id = selectedOrderData?.pad_line_items?.find(
      (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
    )?.pad_line_items_id;
    dispatch({
      type: commentActions.ADD_COMMENTS,
      payload: {
        mode: "insertSampleComment",
        comment: comment,
        resource_id: 100000 + sample_id,
        table_code: "vendor_table"
        // onlyPhoto: false
      }
    });
  }

  return <PhotoSamples selectedOrderData={selectedOrderData} samples={samples.data ? samples.data : []} addComment={addComment} />
}
