import actions from "./actions";

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
    case actions.ADD_CONTACT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.ADD_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        // contacts: [...state.contacts, action.payload],
      };
    case actions.ADD_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.EDIT_CONTACT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.EDIT_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        // contacts: state.contacts.map(contact =>
        //   contact.id === action.payload.id ? action.payload : contact
        // ),
      };
    case actions.EDIT_CONTACT_FAILURE:
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
