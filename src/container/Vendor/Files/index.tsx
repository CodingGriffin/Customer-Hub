import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';

import VendorFiles from '../../../page/Vendor/Files';
import { VersionsContext } from '../../../types';
import actions from "../../../states/Revisions/actions";
import { useDispatch, useSelector } from 'react-redux';

export default function FilesContainer() {

  const { selectedOrderData } = useOutletContext<VersionsContext>();
  const hash = window.location.hash;
  const dispatch = useDispatch();

  const {
    revisions,
    loading,
    error,
  } = useSelector((state: any) => state.revisions);

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
        hash: encodeURIComponent(hash)
      }
    });
  }

  return <VendorFiles selectedOrderData={selectedOrderData} revisions={revisions.data ? revisions.data : []} />;
}
