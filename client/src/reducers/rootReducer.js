import { countryReducer } from "./countryReducer";
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  country: countryReducer,
});

export default rootReducer;
