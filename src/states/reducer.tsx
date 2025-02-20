import { combineReducers } from "redux";

import ordersReducer from "./Orders/reducer";
import contactsReducer from "./Contacts/reducer";
import addressesReducer from "./Addresses/reducer";

const rootReducer = combineReducers({
  orders: ordersReducer,
  contacts: contactsReducer,
  addresses: addressesReducer,
});

export default rootReducer;
