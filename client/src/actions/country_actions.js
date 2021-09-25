import axios from "axios";
import {
  COUNTRY_ACTION_START,
  COUNTRY_ACTION_ERROR,
  COUNTRY_LOAD_SUCCESS,
  COUNTRY_ADD_SUCCESS,
  COUNTRY_DELETE_SUCCESS,
  COUNTRY_EDIT_SUCCESS,
  ADD_ROW,
  SAVE_ROW,
} from "./actionTypes";
import { toastr } from "react-redux-toastr";

//add a country: reload countries in case of success  or show an error message
export const addCountry = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COUNTRY_ACTION_START });
      await axios.post("/api/country/add", data);
      dispatch({ type: COUNTRY_ADD_SUCCESS });
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
      dispatch({ type: COUNTRY_ACTION_START });
      const { data } = await axios.get("/api/country/");
      dispatch({ type: COUNTRY_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: COUNTRY_ACTION_ERROR, payload: error });
    }
  };
};
//edit an action: reload actions in case of success  or show an error message
export const editCountry = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: COUNTRY_ACTION_START });
      await axios.patch("/api/country/edit", data);
      dispatch({ type: COUNTRY_EDIT_SUCCESS });
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
      dispatch({ type: COUNTRY_ACTION_START });
      await axios.delete(`/api/country/delete/${CountryId}`);
      dispatch({ type: COUNTRY_DELETE_SUCCESS });
      dispatch(loadCountries());
      toastr.info("Operation completed", "Country data deleted ");
    } catch (error) {
      dispatch({ type: COUNTRY_ACTION_ERROR });
      toastr.info("Operation not completed", "Country data not deleted ");
    }
  };
};

export const addRow = (dispatch) => {
  return dispatch({ type: ADD_ROW });
};

export const saveRow = (dispatch) => {
  return dispatch({ type: SAVE_ROW });
};
