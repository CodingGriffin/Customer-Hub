import actions from "./actions";

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.GET_ADDRESSES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: action.payload,
      };
    case actions.GET_ADDRESSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.ADD_ADDRESS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        // addresses: [...state.addresses, action.payload],
      };
    case actions.ADD_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.EDIT_ADDRESS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        // addresses: state.addresses.map(contact =>
        //   contact.id === action.payload.id ? action.payload : contact
        // ),
      };
    case actions.EDIT_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.DELETE_ADDRESS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        // addresses: state.addresses.filter(contact => contact.id !== action.payload.id),
      };
    case actions.DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default Reducer;
