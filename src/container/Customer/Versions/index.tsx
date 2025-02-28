import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Versions from '../../../page/Customer/OrdersTab/Versions';
import { useDispatch, useSelector } from 'react-redux';

import { STEP_STATUS } from '../../../types';
import actions from '../../../states/PADStatus/actions';
interface OrderContext {
  selectedOrderData: any;
  selectedSection: 'packaging' | 'artwork' | 'data' | 'shipments' | null;
  selectedStep: number;
  setSelectedStep: (step: number) => void;
}

export default function VersionsContainer() {
  const { selectedOrderData, selectedSection, selectedStep, setSelectedStep } = useOutletContext<OrderContext>();
  const navigate = useNavigate();
  const { version_id } = useParams();
  const dispatch = useDispatch();

  const {
    status,
    loading,
    error,
  } = useSelector((state: any) => state.PADStatus);

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

          setStep(currentStep);
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
    switch (selectedSection) {
      case 'data':
        if (step ==1) {
          navigate(`../${selectedSection}/${version_id}/setup`);
        } else if (step == 2) {
          navigate(`../${selectedSection}/${version_id}/data-upload`);
        } else if (step == 3) {
          navigate(`../${selectedSection}/${version_id}/data-proof`);
        }
        break;
      case 'artwork':
        if (step ==1) {
          navigate(`../${selectedSection}/${version_id}/setup`);
        } else if (step == 2) {
          navigate(`../${selectedSection}/${version_id}/artwork-upload`);
        } else if (step == 3) {
          navigate(`../${selectedSection}/${version_id}/artwork-proof`);
        }
        break;
      default:
        if (step ==1) {
          navigate(`../${selectedSection}/${version_id}/setup`);
        } else if (step == 2) {
          navigate(`../${selectedSection}/${version_id}/artwork-upload`);
        } else if (step == 3) {
          navigate(`../${selectedSection}/${version_id}/artwork-proof`);
        }
        break;
    }
  };

  return (
    <Versions 
      selectedOrderData={selectedOrderData}
      selectedSection={selectedSection}
      selectedStep={selectedStep}
      setStep={setStep}
    />
  );
}
