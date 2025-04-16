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

function* getFiles(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.filehub.php", {...action.payload});
    yield put({ type: actions.GET_FILES_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_FILES_FAILURE, payload: error });
  }
}

function* addFiles(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.filehub.php", {...action.payload});
    yield put({ type: actions.ADD_FILES_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.ADD_FILES_FAILURE, payload: error });
  }
}

function* updateName(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.filehub.php", {...action.payload});
    yield put({ type: actions.UPDATE_NAME_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.UPDATE_NAME_FAILURE, payload: error });
  }
}

function*  removeFile(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "j/inc/class/class.filehub.php", {...action.payload});
    yield put({ type: actions.REMOVE_FILE_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.REMOVE_FILE_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_FILES, getFiles)]);
  yield all([takeLatest(actions.ADD_FILES, addFiles)]);
  yield all([takeLatest(actions.UPDATE_NAME, updateName)]);
  yield all([takeLatest(actions.REMOVE_FILE, removeFile)]);
}
