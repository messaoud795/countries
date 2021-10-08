export const setTableHeaders = (countries) => {
  let columns = Object.keys(countries[0]).slice(1);
  let i = 1;
  for (i; i < countries.length; i++) {
    let keys = Object.keys(countries[i]).slice(1);
    keys.map((key) => {
      if (columns.indexOf(key) === -1) columns.push(key);
    });
  }

  return columns.map((column) => ({ id: column, label: column }));
};

//set the inputs data for the add country modal
export const initialData = (keys) => {
  let x = {};
  keys.map((key) => (x[key] = " "));
  return x;
};
