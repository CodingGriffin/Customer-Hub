import actions from "./actions";

const initialState = {
  files: {},
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.GET_FILES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        files: action.payload,
      };
    case actions.GET_FILES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.ADD_FILES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.ADD_FILES_SUCCESS:
      return {
        ...state,
        loading: false,
        // files: action.payload,
      };
    case actions.ADD_FILES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.UPDATE_STATUS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.UPDATE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        // files: action.payload,
      };
    case actions.UPDATE_STATUS_FAILURE:
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
