import axios from "axios";
import {
  COUNTRY_ACTION_START,
  COUNTRY_ADD_SUCCESS,
  COUNTRY_DELETE_SUCCESS,
  COUNTRY_EDIT_SUCCESS,
  COUNTRY_LOAD_SUCCESS,
} from "./actionTypes";

export async function countryAddReq(data, dispatch) {
  dispatch({ type: COUNTRY_ACTION_START });
  await axios.post("/api/country/add", data);
  dispatch({ type: COUNTRY_ADD_SUCCESS });
}
export async function countryLoadReq(dispatch) {
  dispatch({ type: COUNTRY_ACTION_START });
  const { data } = await axios.get("/api/country/");
  dispatch({ type: COUNTRY_LOAD_SUCCESS, payload: data });
}

export async function countryEditReq(data, dispatch) {
  dispatch({ type: COUNTRY_ACTION_START });
  await axios.patch("/api/country/edit", data);
  dispatch({ type: COUNTRY_EDIT_SUCCESS });
}

export async function countryDeleteReq(CountryId, dispatch) {
  dispatch({ type: COUNTRY_ACTION_START });
  await axios.delete(`/api/country/delete/${CountryId}`);
  dispatch({ type: COUNTRY_DELETE_SUCCESS });
}
