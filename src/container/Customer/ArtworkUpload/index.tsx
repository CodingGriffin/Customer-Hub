import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ArtworkManagerPage from '../../../page/Customer/OrdersTab/ArtworkManager';
import { VersionsContext } from '../../../types';
import actions from "../../../states/PADStatus/actions";
import fileActions from "../../../states/Files/actions";

export default function ArtworkUpload() {
  const { setStep, currentStep, selectedOrderData } = useOutletContext<VersionsContext>();
  const dispatch = useDispatch();
  const { version_id, section } = useParams();

  const {
    files,
    loading,
    error,
  } = useSelector((state: any) => state.files);

  if (currentStep) {
    setStep(currentStep);
  }

  useEffect(() => {
    if (version_id) {
      getFiles();
    }
  }, [dispatch, version_id, section]);

  const updateStatus = (pad_line_items_id: number) => {
    dispatch({
      type: actions.UPDATE_STATUS,
      payload: {
        mode: "proofSent",
        pad_line_items_id: pad_line_items_id,
        status: 1,
        job_number: selectedOrderData.job.job_number,
        code: "p",
        abbr: "v-upload-receive",
        onlyPhoto: false
      }
    });
  }

  const getFiles = async () => {
    const padType = (section === 'data' ? 3 : section === 'artwork' ? 1 : 2);

    await dispatch({
      type: fileActions.GET_FILES,
      payload: {
        mode: "listFilesByPAD",
        job_id: selectedOrderData.job.job_number,
        version_id: version_id,
        pad_id: padType,
      }
    });
  }

  const updateName = async (oldName: any, newName: any) => {
    await dispatch({
      type: fileActions.UPDATE_NAME,
      payload: {
        mode: "renameFile",
        job_id: selectedOrderData.job.job_number,
        version_id: version_id,
        pad_id: 1,
        file_name: oldName,
        new_name: newName,
      }
    });
  }

  return <ArtworkManagerPage setStep={setStep} selectedOrderData={selectedOrderData} updateStatus={updateStatus} files={files.data ? files.data : []} updateName={updateName} />;
}