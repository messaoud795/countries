import React from "react";
import "@testing-library/jest-dom";
import { MemoizedCountriesTable } from "../components/countries/CountriesTable";
import { render, fireEvent } from "./test-utilis";
import { countriesData } from "../actions/getCountries";
import { setTableHeaders } from "../helpers/setColumns";
import { act } from "react-dom/test-utils";

let countriesTable;
let tableNum = 0;
let columns = setTableHeaders(countriesData);
beforeAll(async () => {
  countriesTable = await render(
    <MemoizedCountriesTable
      countries={countriesData}
      columns={columns}
      tableNum={tableNum}
    />
  );
});

test("click edit and edit a row ", async () => {
  let countriesRows = await countriesTable.container.getElementsByClassName(
    "tableRow"
  );

  //click edit button
  await act(async () => {
    let firstRowEditBtn = await countriesTable.container.getElementsByClassName(
      "editBtn"
    )[0];
    await fireEvent.click(firstRowEditBtn);
    let modalEditInput = await countriesTable.container.getElementsByClassName(
      "MuiOutlinedInput-input"
    );
    console.log(modalEditInput);
  });
});
