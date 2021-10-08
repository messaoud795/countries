import React, { useEffect, useState } from "react";
import "./HomePage.css";
import CountriesTable from "../components/countries/CountriesTable";
import { useDispatch, useSelector } from "react-redux";
import { addRow, loadCountries } from "../actions/country_actions";
import { Button, CircularProgress } from "@material-ui/core";
import { setTableHeaders } from "../helpers/setColumns";
import { useHistory } from "react-router";

export default function HomePage() {
  const { countries, loadingAction } = useSelector((state) => state.country);
  const [localCountriesData, setLocalCountriesData] = useState(countries);
  const [columns, setColumns] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  //api request to get the countries from the back end
  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);
  //initialize countries data and headers
  useEffect(() => {
    setLocalCountriesData(countries);
    if (countries.length > 0) setColumns(setTableHeaders(countries));
  }, [countries]);

  //add a new line to the countries data that contains an object with the headers keys and empty entries
  const addNewLine = () => {
    let newLine = {};
    columns.map((column) => (newLine[column.label] = undefined));
    setLocalCountriesData([newLine, ...countries]);
    addRow(dispatch);
  };

  return (
    <div className="homePage">
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/matrix")}
        className="homePage__matrixBtn"
      >
        &#8594; Matrix page
      </Button>

      <h1 className="home__title"> Countries Browser</h1>
      {loadingAction ? (
        <CircularProgress className="homePage__spinner" />
      ) : (
        <div>
          <Button
            variant="contained"
            className="homePage__addBtn"
            onClick={addNewLine}
          >
            add a country
          </Button>
          <CountriesTable columns={columns} countries={localCountriesData} />
        </div>
      )}
    </div>
  );
}
