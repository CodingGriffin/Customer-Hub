import actions from "./actions";

const initialState = {
  comments: {},
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.ADD_COMMENTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.ADD_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        // revisions: action.payload,
      };
    case actions.ADD_COMMENTS_FAILURE:
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
