import actions from "./actions";

const initialState = {
  shipments: {
    shipments: [],
    job_number: null,
    versions: [],
    entity_name: null
  },
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
      case actions.GET_SHIPMENTS:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case actions.GET_SHIPMENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          shipments: {
            shipments: action.payload.shipments,
            job_number: action.payload.job_number,
            versions: action.payload.versions,
            entity_name: action.payload.entity_name
          },
        };
      case actions.GET_SHIPMENTS_FAILURE:
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
