import {
  ADD_ROW,
  COUNTRY_ACTION_ERROR,
  COUNTRY_ACTION_START,
  COUNTRY_ADD_SUCCESS,
  COUNTRY_DELETE_SUCCESS,
  COUNTRY_EDIT_SUCCESS,
  COUNTRY_LOAD_SUCCESS,
  SAVE_ROW,
} from "../actions/actionTypes";

// 3 states of promise :pending for loadingAction before getting response from server,
// fulfilled which set actions with data received , rejected which launch an error
const initialState = {
  countries: [],
  loadingAction: false,
  error: null,
  newRow: false,
};
export const countryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case COUNTRY_ACTION_START:
      return (state = { ...state, loadingAction: true });
    case COUNTRY_LOAD_SUCCESS:
      return (state = {
        ...state,
        loadingAction: false,
        error: null,
        countries: payload,
      });
    case COUNTRY_ADD_SUCCESS:
      return (state = { ...state, loadingAction: false, error: null });
    case COUNTRY_DELETE_SUCCESS:
      return (state = { ...state, loadingAction: false, error: null });
    case COUNTRY_EDIT_SUCCESS:
      return (state = { ...state, loadingAction: false, error: null });
    case COUNTRY_ACTION_ERROR:
      return (state = { ...state, loadingAction: false, error: payload });
    case ADD_ROW:
      return (state = { ...state, newRow: true });
    case SAVE_ROW:
      return (state = { ...state, newRow: false });
    default:
      return state;
  }
};
