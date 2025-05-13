import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import StepSetup from '../../../page/Customer/OrdersTab/StepSetup';
import actions from "../../../states/PADStatus/actions";
import { VersionsContext, STEP_STATUS } from '../../../types';

export default function StepSetupContainer() {

  const [pad_line_items_id, setPadLineItemsId] = useState<number | null>(null);
  const [currentStatus, setCurrentStatus] = useState<any>(null);
  
  const { setStep, currentStep, selectedOrderData } = useOutletContext<VersionsContext>();
  const { version_id, section } = useParams();
  
  const dispatch = useDispatch();
  const hash = window.location.hash;

  const [searchParams] = useSearchParams();
  const fromParam = searchParams.get('from');
  const {
    status,
    loading,
    error,
  } = useSelector((state: any) => state.PADStatus);

  // useEffect(() => {
  //   if (currentStep) {
  //     console.log("here is setup step===>", currentStep)
  //     setStep(currentStep);
  //   }
  // }, [currentStep]);

  useEffect(() => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');
    const _pad_line_items_id = selectedOrderData?.pad_line_items?.find(
      (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
    )?.pad_line_items_id;

    setPadLineItemsId(_pad_line_items_id);

    const fetchStatus = async () => {
      if (pad_line_items_id) {
        await getStatus();
      }
    };

    fetchStatus();
  }, [pad_line_items_id]);

  const getStatus = async () => {
    await dispatch({
      type: actions.GET_STATUS,
      payload: {
        mode: "getEventStatus",
        pad_line_items_id: pad_line_items_id,
        job_number: selectedOrderData.job.job_number,
        hash: hash
      }
    });
  };

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

  useEffect(() => {
    if (status?.data) {
      const data = status.data.length > 0 
        ? status.data.reduce((max: any, current: any) => 
            (current.event_id > max.event_id) ? current : max
          )
        : null;

      setCurrentStatus(data);

      if (currentStatus) {
        const currentAbbr = currentStatus.event_type_abbr;
        let step = 1;
        console.log('currentAbbr===>', currentAbbr)

        if (STEP_STATUS.setup.includes(currentAbbr)) {
          step = 1;
        } else if (STEP_STATUS.upload.includes(currentAbbr)) {
          step = 2;
        } else if (STEP_STATUS.proof.includes(currentAbbr)) {
          step = 3;
        } else if (STEP_STATUS.photoSample.includes(currentAbbr)) {
          step = 4;
        } else if (STEP_STATUS.liveSample.includes(currentAbbr)) {
          step = 5;
        }

        console.log(currentAbbr, step, currentStatus)

        setStep(step);
      }
    }
  }, [status, currentStatus, version_id]);

  return <StepSetup setStep={setStep} selectedOrderData={selectedOrderData} updateStatus={updateStatus} fromParam={fromParam} />;
}
