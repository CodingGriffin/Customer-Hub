import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import StepSetup from '../../../page/Customer/OrdersTab/StepSetup';
import { VersionsContext } from '../../../types';
import actions from "../../../states/PADStatus/actions";
import { useDispatch } from 'react-redux';

export default function StepSetupContainer() {

  const { setStep, currentStep, selectedOrderData } = useOutletContext<VersionsContext>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentStep) {
      console.log("here is setup step===>", currentStep)
      setStep(currentStep);
    }
  }, [currentStep]);

  const updateStatus = (pad_line_items_id: number) => {
    dispatch({
      type: actions.UPDATE_STATUS,
      payload: {
        mode: "proofSent",
        pad_line_items_id: pad_line_items_id,
        status: 0,
        job_number: selectedOrderData.job.job_number,
        code: "p",
        abbr: "v-upload-wait",
        onlyPhoto: false
      }
    });
  }

  return <StepSetup setStep={setStep} selectedOrderData={selectedOrderData} updateStatus={updateStatus} />;
}
