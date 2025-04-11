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

function* getSamples(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.photoSample.php", {...action.payload});
    yield put({ type: actions.GET_SAMPLES_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_SAMPLES_FAILURE, payload: error });
  }
}

function* addSamples(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.photoSample.php", {...action.payload});
    yield put({ type: actions.ADD_SAMPLES_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.ADD_SAMPLES_FAILURE, payload: error });
  }
}

function* updateStatus(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.photoSample.php", {...action.payload});
    yield put({ type: actions.UPDATE_STATUS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.UPDATE_STATUS_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_SAMPLES, getSamples)]);
  yield all([takeLatest(actions.ADD_SAMPLES, addSamples)]);
  yield all([takeLatest(actions.UPDATE_STATUS, updateStatus)]);
}
