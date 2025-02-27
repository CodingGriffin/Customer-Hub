import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import StepSetup from '../../../page/Customer/OrdersTab/StepSetup';
import { VersionsContext } from '../../../types';
import actions from '../../../states/PADStatus/actions';

export default function StepSetupContainer() {
  const { version_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    status,
    loading,
    error,
  } = useSelector((state: any) => state.PADStatus);

  const { selectedSection, selectedOrderData, setSelectedStep } = useOutletContext<VersionsContext>();

  const padType = (selectedSection === 'data' ? 'data' : selectedSection === 'artwork' ? 'artw' : 'pack');
  const pad_line_items_id = selectedOrderData?.pad_line_items?.find(
    (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
  )?.pad_line_items_id;
  const job_number = selectedOrderData?.job?.job_number;

  useEffect(() => {
    if (pad_line_items_id) {
      getStatus();
    }
    console.log("status=======>", status);
  }, [pad_line_items_id]);

  const getStatus = () => {
    dispatch({
      type: actions.GET_STATUS,
      payload: {
        mode: "getEventStatus",
        pad_line_items_id: pad_line_items_id,
        job_number: job_number
      }
    });
  };

  const setStep = async (step: number) => {
    await setSelectedStep(step)
    console.log(version_id)
    if (step === 2) {
      if (selectedSection === 'data') {
        navigate(`../${version_id}/data-upload`);
      } else {
        navigate(`../${version_id}/artwork-upload`);
      }
    }
  };

  return <StepSetup setSelectedStep={setStep} />;
}