import actions from "../actions";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.GET_CONTACTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
      };
    case actions.GET_CONTACTS_FAILURE:
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
