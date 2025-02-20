import { combineReducers } from "redux";

import ordersReducer from "./Orders/list/reducer";
import contactsReducer from "./Contacts/list/reducer";

const rootReducer = combineReducers({
  orders: ordersReducer,
  contacts: contactsReducer,
});

export default rootReducer;
