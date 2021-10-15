import React from "react";
import "@testing-library/jest-dom";
import { MemoizedCountriesTable } from "../components/countries/CountriesTable";
import { render, fireEvent, waitFor, screen } from "./test-utilis";
import { countriesData } from "../actions/getCountries";
import { setTableHeaders } from "../helpers/setColumns";
import { act } from "react-dom/test-utils";

let countriesTable;
let tableNum = 0;
beforeAll(async () => {
  countriesTable = await render(
    <MemoizedCountriesTable
      countries={countriesData}
      columns={setTableHeaders(countriesData)}
      tableNum={tableNum}
    />
  );
});

test("click add btn and add new row ", async () => {
  let countriesRows = await countriesTable.container.getElementsByClassName(
    "tableRow"
  );
  //verify number of table lines are equal to the length of data array
  expect(countriesRows.length).toEqual(countriesData.length);
  //click add button
  await act(async () => {
    let addBtn = await countriesTable.getByTestId(tableNum);
    fireEvent.click(addBtn);
  });
  countriesRows = await countriesTable.container.getElementsByClassName(
    "tableRow"
  );
  expect(countriesRows.length).toEqual(countriesData.length + 1);

  //check the number of rows after adding a new one
  let newCountry = {
    name: "France",
    area: 74000000,
    region: "Europe",
    latlng: "-74.65 - 4.48",
    numericCode: "010",
  };
  let inputsValues = Object.values(newCountry);
  let inputs = countriesRows[0].getElementsByClassName("countriesTable__input");

  //check the new line
  expect(inputs.length).toEqual(inputsValues.length);
  Array.from(inputs).map((input) => expect(input.textContent).toBe(""));

  //enter data in inputs and check the value of inputs afterwards
  for (let i = 0; i < inputs.length; i++) {
    await fireEvent.change(inputs[i], { target: { value: inputsValues[i] } });
    expect(inputs[i]).toHaveValue(inputsValues[i].toString());
  }
  //click save icon to add the new row the table
  await act(async () => {
    let saveBtn = await countriesTable.getByTestId("saveBtn");
    fireEvent.click(saveBtn);
    let confirmBtn = await countriesTable.getByTestId("confirmBtn");
    fireEvent.click(confirmBtn);
  });

  //check if the last added line  rendred in the table is equal to the values entered
  countriesTable = await render(
    <MemoizedCountriesTable
      countries={[...countriesData, newCountry]}
      columns={setTableHeaders(countriesData)}
      tableNum={tableNum}
    />
  );

  countriesRows = await countriesTable.container.getElementsByClassName(
    "tableRow"
  );
  let lastRowCells = countriesRows[
    countriesRows.length - 1
  ].getElementsByClassName("countriesTable__input");

  for (let i = 0; i < inputs.length; i++) {
    expect(lastRowCells[i]).toHaveValue(inputsValues[i].toString());
  }
});
