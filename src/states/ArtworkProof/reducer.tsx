import actions from "./actions";

const initialState = {
  reviewers: {},
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
      case actions.GET_REVIEWERS:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case actions.GET_REVIEWERS_SUCCESS:
        return {
          ...state,
          reviewers: action.payload,
          loading: false,
        };
      case actions.GET_REVIEWERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case actions.REMOVE_REVIEWER:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case actions.REMOVE_REVIEWER_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case actions.REMOVE_REVIEWER_FAILURE:
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
