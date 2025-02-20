import actions from "../actions";

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
    default:
      return state;
  }
}

export default Reducer;
