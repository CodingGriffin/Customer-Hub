import { combineReducers } from "redux";

import ordersReducer from "./Orders/list/reducer";

const rootReducer = combineReducers({
  orders: ordersReducer,
});

export default rootReducer;
