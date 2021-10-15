/* eslint-disable */
import { COUNTRY_ACTION_ERROR, ADD_ROW, SAVE_ROW } from "./actionTypes";
import { toastr } from "react-redux-toastr";
import {
  countryAddReq,
  countryDeleteReq,
  countryEditReq,
  countryLoadReq,
} from "./endPoints";

//add a country: reload countries in case of success  or show an error message
export const addCountry = (data) => {
  return async (dispatch) => {
    try {
      countryAddReq(data, dispatch);
      toastr.success("success", "country added successfully");
      dispatch(loadCountries());
    } catch (error) {
      dispatch({ type: COUNTRY_ACTION_ERROR, payload: error });
    }
  };
};
//load all countries from the db
export const loadCountries = () => {
  return async (dispatch) => {
    try {
      countryLoadReq(dispatch);
    } catch (error) {
      dispatch({ type: COUNTRY_ACTION_ERROR, payload: error });
    }
  };
};
//edit an action: reload actions in case of success  or show an error message
export const editCountry = (data) => {
  return async (dispatch) => {
    try {
      countryEditReq(data, dispatch);
      toastr.success("Success", "Country data updated successfully");
      dispatch(loadCountries());
    } catch (error) {
      dispatch({ type: COUNTRY_ACTION_ERROR, payload: error });
      toastr.error("Error", "Country data is not updated ");
    }
  };
};

//delete an action: reload actions in case of success  or show an error message
export const deleteCountry = (CountryId) => {
  return async (dispatch) => {
    try {
      countryDeleteReq(CountryId, dispatch);
      dispatch(loadCountries());
      toastr.info("Operation completed", "Country data deleted ");
    } catch (error) {
      dispatch({ type: COUNTRY_ACTION_ERROR });
      toastr.info("Operation not completed", "Country data not deleted ");
    }
  };
};

export const addRow = (tableNum) => {
  return (dispatch) =>
    dispatch({
      type: ADD_ROW,
      payload: { newRow: true, tableNum: tableNum },
    });
};

export const saveRow = () => {
  return (dispatch) => dispatch({ type: SAVE_ROW, payload: { newRow: false } });
};
