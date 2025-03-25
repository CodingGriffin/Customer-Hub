import { combineReducers } from "redux";

import ordersReducer from "./Orders/reducer";
import contactsReducer from "./Contacts/reducer";
import addressesReducer from "./Addresses/reducer";
import shipmentsReducer from "./Shipments/reducer"
import artworkProofReducer from "./ArtworkProof/reducer";
import PADStatusReducer from "./PADStatus/reducer";
import revisionsReducer from "./Revisions/reducer";
import samplesReducer from "./PhotoSamples/reducer";
import commentsReducer from "./Comments/reducer";

const rootReducer = combineReducers({
  orders: ordersReducer,
  contacts: contactsReducer,
  addresses: addressesReducer,
  shipments: shipmentsReducer,
  artworkProof: artworkProofReducer,
  PADStatus: PADStatusReducer,
  revisions: revisionsReducer,
  samples: samplesReducer,
  comments: commentsReducer,
});

export default rootReducer;
