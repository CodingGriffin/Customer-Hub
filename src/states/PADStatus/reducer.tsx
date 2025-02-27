import actions from "./actions";

const initialState = {
  status: {},
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
      case actions.GET_STATUS:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case actions.GET_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          status: action.payload,
        };
      case actions.GET_STATUS_FAILURE:
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
