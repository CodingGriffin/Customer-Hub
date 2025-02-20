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

function* getAddresses(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "inc/class/class.addresses.php", {...action.payload});
    yield put({ type: actions.GET_ADDRESSES_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_ADDRESSES_FAILURE, payload: error });
  }
}

function* addAddress(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "inc/class/class.addresses.php", {...action.payload});
    yield put({ type: actions.ADD_ADDRESS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.ADD_ADDRESS_FAILURE, payload: error });
  }
}

function* editAddress(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "inc/class/class.addresses.php", {...action.payload});
    yield put({ type: actions.EDIT_ADDRESS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.EDIT_ADDRESS_FAILURE, payload: error });
  }
}

function* deleteAddress(action: any) {
  try {
    const response: any = yield* callApi(postRequestNoToken, "inc/class/class.addresses.php", {...action.payload});
    yield put({ type: actions.EDIT_ADDRESS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.EDIT_ADDRESS_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_ADDRESSES, getAddresses)]);
    yield all([takeLatest(actions.ADD_ADDRESS, addAddress)]);
    yield all([takeLatest(actions.EDIT_ADDRESS, editAddress)]);
    yield all([takeLatest(actions.DELETE_ADDRESS, deleteAddress)]);
}
