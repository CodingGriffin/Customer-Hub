import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Versions from '../../../page/Customer/OrdersTab/Versions';
import { useDispatch, useSelector } from 'react-redux';

import { STEP_STATUS } from '../../../types';
import actions from '../../../states/PADStatus/actions';
interface OrderContext {
  selectedOrderData: any;
  setSelectedStep: (step: number) => void;
}

export default function VersionsContainer() {
  const { selectedOrderData, setSelectedStep } = useOutletContext<OrderContext>();
  const { version_id, section } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentStatus, setCurrentStatus] = useState<any>(null);

  const {
    status,
    loading,
    error,
  } = useSelector((state: any) => state.PADStatus);

  const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');
  const pad_line_items_id = selectedOrderData?.pad_line_items?.find(
    (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
  )?.pad_line_items_id;
  const job_number = selectedOrderData?.job?.job_number;

  useEffect(() => {
    const fetchStatus = async () => {
      if (pad_line_items_id) {
        await getStatus();
      }
    };

    fetchStatus();
  }, [pad_line_items_id]);

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

        if (STEP_STATUS.setup.includes(currentAbbr)) {
          setCurrentStep(1)
        } else if (STEP_STATUS.upload.includes(currentAbbr)) {
          setCurrentStep(2)
        } else if (STEP_STATUS.proof.includes(currentAbbr)) {
          setCurrentStep(3)
        } else if (STEP_STATUS.photoSample.includes(currentAbbr)) {
          setCurrentStep(4)
        } else if (STEP_STATUS.liveSample.includes(currentAbbr)) {
          setCurrentStep(5)
        }

        console.log(currentStep, currentStatus)

        // setStep(currentStep);
      }
    }
  }, [status, currentStep, currentStatus]);

  const getStatus = async () => {
    await dispatch({
      type: actions.GET_STATUS,
      payload: {
        mode: "getEventStatus",
        pad_line_items_id: pad_line_items_id,
        job_number: job_number
      }
    });
  };


  const setStep = async (step: number) => {
    await setCurrentStep(step);
    await setSelectedStep(step)
    switch (section) {
      case 'data':
        if (step ==1) {
          navigate(`../${section}/${version_id}/setup`);
        } else if (step == 2) {
          navigate(`../${section}/${version_id}/data-upload`);
        } else if (step == 3) {
          navigate(`../${section}/${version_id}/data-proof`);
        } else if (step == 4) {
          navigate(`../${section}/${version_id}/data-photo-sample`);
        }
        break;
      case 'artwork':
        if (step ==1) {
          navigate(`../${section}/${version_id}/setup`);
        } else if (step == 2) {
          navigate(`../${section}/${version_id}/artwork-upload`);
        } else if (step == 3) {
          navigate(`../${section}/${version_id}/artwork-proof`);
        } else if (step == 4) {
          navigate(`../${section}/${version_id}/artwork-photo-sample`);
        }
        break;
      default:
        if (step ==1) {
          navigate(`../${section}/${version_id}/setup`);
        } else if (step == 2) {
          navigate(`../${section}/${version_id}/artwork-upload`);
        } else if (step == 3) {
          navigate(`../${section}/${version_id}/artwork-proof`);
        } else if (step == 4) {
          navigate(`../${section}/${version_id}/artwork-photo-sample`);
        }
        break;
    }
  };

  return (
    <Versions 
      selectedOrderData={selectedOrderData}
      currentStep={currentStep}
      setStep={setStep}
    />
  );
}
