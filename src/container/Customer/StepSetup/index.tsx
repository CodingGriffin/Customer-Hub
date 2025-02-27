import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import StepSetup from '../../../page/Customer/OrdersTab/StepSetup';
import { VersionsContext, STEP_STATUS } from '../../../types';
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
  let currentStatus: any = null;

  useEffect(() => {
    const fetchStatus = async () => {
      if (pad_line_items_id) {
        await getStatus();
      }
      
      if (status?.data) {
        currentStatus = status.data.length > 0 
          ? status.data.reduce((max: any, current: any) => 
              (current.event_id > max.event_id) ? current : max
            )
          : null;

        if (currentStatus) {
          const currentAbbr = currentStatus.event_type_abbr;
          let currentStep = 1;

          if (STEP_STATUS.setup.includes(currentAbbr)) {
            currentStep = 1;
          } else if (STEP_STATUS.upload.includes(currentAbbr)) {
            currentStep = 2;
          } else if (STEP_STATUS.proof.includes(currentAbbr)) {
            currentStep = 3;
          } else if (STEP_STATUS.photoSample.includes(currentAbbr)) {
            currentStep = 4;
          } else if (STEP_STATUS.liveSample.includes(currentAbbr)) {
            currentStep = 5;
          }

          setSelectedStep(currentStep);
        }
      }
    };

    fetchStatus();
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
