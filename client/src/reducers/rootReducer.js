import { reducer as toastrReducer } from "react-redux-toastr";
import { countryReducer } from "./countryReducer";
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  country: countryReducer,
  toastr: toastrReducer,
});

export default rootReducer;
