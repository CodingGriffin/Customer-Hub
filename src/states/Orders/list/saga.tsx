import { all, put, takeLatest } from "redux-saga/effects";
import actions from "./actions";
import { callApi } from "../../saga";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../../../utils/axios-client.ts";

function* getOrders() {
  try {
    const response: any = yield* callApi(getRequest, "/orders");
    yield put({ type: actions.GET_ORDERS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: actions.GET_ORDERS_FAILURE, payload: error });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_ORDERS, getOrders)]);
}
