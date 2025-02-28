import actions from "./actions";

const initialState = {
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.UPDATE_APPROVED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.UPDATE_APPROVED_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actions.UPDATE_APPROVED_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.REJECT_APPROVED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.REJECT_APPROVED_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actions.REJECT_APPROVED_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.INVITE_REVIEWER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.INVITE_REVIEWER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actions.INVITE_REVIEWER_FAILURE:
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
