import { isEmpty } from "lodash";

export const setCountry = (keys, country) => {
  let countryClone = {};
  //extract object without the addColmuns key
  for (let key in country) {
    if (key !== "addColumns") countryClone[key] = country[key];
  }

  if (!isEmpty(country.addColumns)) {
    for (let z = 0; z < country.addColumns.length; z++) {
      for (let j in keys) {
        if (keys[j] === country.addColumns[z].fieldName)
          countryClone[keys[j]] = country.addColumns[z].fieldValue;
      }
    }
  } else countryClone = country;

  return countryClone;
};
