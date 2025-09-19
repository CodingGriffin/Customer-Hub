import { all, put, takeLatest } from "redux-saga/effects";
import actions from "./actions.tsx";
import { callApi } from "../saga.tsx";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  postRequestNoToken,
  postRequestNoTokenXWWW,
} from "../../utils/axios-client.ts";

function* getRevisions(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.revisions.php", {...action.payload});
    yield put({ type: actions.GET_REVISIONS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_REVISIONS_FAILURE, payload: error });
  }
}

function* getIcon(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.dataProofGenerated.php", {...action.payload});
    yield put({ type: actions.GET_ICON_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_ICON_FAILURE, payload: error });
  }
}

function* updatePartitionVerificationState(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.revisions.php", {...action.payload});
    yield put({ type: actions.UPDATE_PARTITIONVERFICATIONSTATE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.UPDATE_PARTITIONVERFICATIONSTATE_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_REVISIONS, getRevisions)]);
  yield all([takeLatest(actions.GET_ICON, getIcon)]);
  yield all([takeLatest(actions.UPDATE_PARTITIONVERFICATIONSTATE, updatePartitionVerificationState)]);
}
