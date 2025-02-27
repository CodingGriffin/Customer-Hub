import { all, put, takeLatest } from "redux-saga/effects";
import actions from "./actions.tsx";
import { callApi } from "../saga";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  postRequestNoToken,
  postRequestNoTokenXWWW,
} from "../../utils/axios-client.ts";

function* updateApproved(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.proofNew.php", {...action.payload});
    yield put({ type: actions.UPDATE_APPROVED_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.UPDATE_APPROVED_FAILURE, payload: error });
  }
}

function* rejectApproved(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.proofNew.php", {...action.payload});
    yield put({ type: actions.REJECT_APPROVED_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.REJECT_APPROVED_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.REJECT_APPROVED, updateApproved)]);
  yield all([takeLatest(actions.REJECT_APPROVED, rejectApproved)]);
}
