import React, { useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { VersionsContext } from '../../../types';
import Production from '../../../page/Vendor/Production';
import actions from "../../../states/PADStatus/actions";
import commentActions from "../../../states/Comments/actions";

export default function ProductionContainer() {

  const { selectedOrderData, currentAbbr } = useOutletContext<VersionsContext>();
  const dispatch = useDispatch();
  const { version_id, section } = useParams();
  const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');

  const {
    comments,
  } = useSelector((state: any) => state.comments);

  const currentVersion = selectedOrderData?.versions?.find(
    (version: any) => version.version_id == version_id
  );

  const isLiveSample = currentVersion?.isSample || false;

  useEffect(() => {
      getComments();
  }, []);

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

  const addComment = (comment: string) => {
    dispatch({
      type: commentActions.ADD_COMMENTS,
      payload: {
        mode: "insertProductionComment",
        comment: comment,
        resource_id: 100000 + Number(version_id),
        table_code: padType+ "_vendor" + "_table"
      }
    });
    getComments();
  }

  const getComments = () => {
    dispatch({
      type: commentActions.GET_COMMENTS,
      payload: {
        mode: "getProductionComments",
        resource_id: 100000 + Number(version_id),
        table_code: padType
      }
    });
  }

  return <Production selectedOrderData={selectedOrderData} currentAbbr={currentAbbr} isLiveSample={isLiveSample} addComment={addComment} comments={comments.data ? comments.data : []} />
}
