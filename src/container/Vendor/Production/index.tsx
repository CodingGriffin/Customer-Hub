import React, { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';

import Production from '../../../page/Vendor/Production';
import { VersionsContext } from '../../../types';
import actions from "../../../states/PADStatus/actions";
import { useDispatch } from 'react-redux';

export default function ProductionContainer() {

  const { selectedOrderData } = useOutletContext<VersionsContext>();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const fromParam = searchParams.get('from');

  // useEffect(() => {
  //   if (currentStep) {
  //     console.log("here is setup step===>", currentStep)
  //     setStep(currentStep);
  //   }
  // }, [currentStep]);

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

  return <Production selectedOrderData={selectedOrderData} />
}
