import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';

import VendorFiles from '../../../page/Vendor/Files';
import { VersionsContext } from '../../../types';
import actions from "../../../states/Revisions/actions";
import { useDispatch, useSelector } from 'react-redux';

export default function FilesContainer() {

  const { selectedOrderData } = useOutletContext<VersionsContext>();
  const dispatch = useDispatch();

  const {
    revisions,
    loading,
    error,
  } = useSelector((state: any) => state.revisions);

  const { version_id, section } = useParams();

  // useEffect(() => {
  //   if (currentStep) {
  //     console.log("here is setup step===>", currentStep)
  //     setStep(currentStep);
  //   }
  // }, [currentStep]);

  // const updateStatus = (pad_line_items_id: number) => {
  //   dispatch({
  //     type: actions.UPDATE_STATUS,
  //     payload: {
  //       mode: "proofSent",
  //       pad_line_items_id: pad_line_items_id,
  //       status: 0,
  //       job_number: selectedOrderData.job.job_number,
  //       code: "p",
  //       abbr: "v-upload-wait",
  //       onlyPhoto: false
  //     }
  //   });
  // }

  useEffect(() => {
    if (version_id) getRevisions();
  }, [dispatch, version_id]);

  const getRevisions = () => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');

    dispatch({
      type: actions.GET_REVISIONS,
      payload: {
        mode: "getrevisions",
        job_number: selectedOrderData.job.job_number,
        version_number: version_id,
        pad: padType,
      }
    });
  }

  return <VendorFiles selectedOrderData={selectedOrderData} revisions={revisions.data ? revisions.data : []} />;
}
