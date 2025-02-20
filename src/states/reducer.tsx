import { combineReducers } from "redux";

import ordersReducer from "./Orders/list/reducer";
import contactsReducer from "./Contacts/list/reducer";
import addressesReducer from "./Addresses/list/reducer";

const rootReducer = combineReducers({
  orders: ordersReducer,
  contacts: contactsReducer,
  addresses: addressesReducer,
});

export default rootReducer;
