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

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_SAMPLES, getSamples)]);
}
