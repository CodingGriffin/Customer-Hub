import actions from "./actions";

const initialState = {
  samples: {},
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.GET_SAMPLES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_SAMPLES_SUCCESS:
      return {
        ...state,
        loading: false,
        samples: action.payload,
      };
    case actions.GET_SAMPLES_FAILURE:
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
