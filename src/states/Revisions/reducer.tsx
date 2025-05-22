import actions from "./actions";

const initialState = {
  revisions: {},
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.GET_REVISIONS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_REVISIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        revisions: action.payload,
      };
    case actions.GET_REVISIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.UPDATE_PARTITIONVERFICATIONSTATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.UPDATE_PARTITIONVERFICATIONSTATE_SUCCESS:
      return {
        ...state,
        loading: false,
        // revisions: action.payload,
      };
    case actions.UPDATE_PARTITIONVERFICATIONSTATE_FAILURE:
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
