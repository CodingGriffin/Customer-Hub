import { combineReducers } from "redux";

import ordersReducer from "./Orders/reducer";
import contactsReducer from "./Contacts/reducer";
import addressesReducer from "./Addresses/reducer";
import shipmentsReducer from "./Shipments/reducer"

const rootReducer = combineReducers({
  orders: ordersReducer,
  contacts: contactsReducer,
  addresses: addressesReducer,
  shipments: shipmentsReducer,
});

export default rootReducer;
