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

function* getContacts(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "inc/class/class.contacts.php", {...action.payload});
    yield put({ type: actions.GET_CONTACTS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_CONTACTS_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_CONTACTS, getContacts)]);
}
