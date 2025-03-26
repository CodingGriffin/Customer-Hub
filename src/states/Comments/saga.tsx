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

function* addComments(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.comments.php", {...action.payload});
    yield put({ type: actions.ADD_COMMENTS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.ADD_COMMENTS_FAILURE, payload: error });
  }
}

function* getComments(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.comments.php", {...action.payload});
    yield put({ type: actions.GET_COMMENTS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_COMMENTS_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.ADD_COMMENTS, addComments)]);
  yield all([takeLatest(actions.GET_COMMENTS, getComments)]);
}
