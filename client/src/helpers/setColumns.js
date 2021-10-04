import { isEmpty } from "lodash";

export const setTableHeaders = (countries, predifinedHeaders) => {
  let addedHeaders = [];
  let i = 0;
  for (i; i < countries.length; i++) {
    if (!isEmpty(countries[i].addColumns)) {
      countries[i].addColumns.map((el) =>
        addedHeaders.push({ id: el.fieldName, label: el.fieldName })
      );
    }
  }
  return predifinedHeaders.concat(addedHeaders);
};

export const initialData = (keys) => {
  let x = {};
  for (let i in keys) {
    x[keys[i]] = " ";
  }
  return x;
};
