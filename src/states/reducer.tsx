import { combineReducers } from "redux";

import ordersReducer from "./Orders/reducer";
import contactsReducer from "./Contacts/reducer";
import addressesReducer from "./Addresses/reducer";
import shipmentsReducer from "./Shipments/reducer"
import artworkProofReducer from "./ArtworkProof/reducer";
import PADStatusReducer from "./PADStatus/reducer";

const rootReducer = combineReducers({
  orders: ordersReducer,
  contacts: contactsReducer,
  addresses: addressesReducer,
  shipments: shipmentsReducer,
  artworkProof: artworkProofReducer,
  PADStatus: PADStatusReducer,
});

export default rootReducer;
