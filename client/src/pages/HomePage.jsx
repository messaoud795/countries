import React, { useEffect, useState } from "react";
import "./HomePage.css";
import CountriesTable from "../components/CountriesTable";
import { useDispatch, useSelector } from "react-redux";
import { addRow, loadCountries } from "../actions/country_actions";
import { Button, CircularProgress } from "@material-ui/core";

export default function HomePage() {
  const dispatch = useDispatch();
  //api request to get the countries from the back end
  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);
  const { countries, loadingAction } = useSelector((state) => state.country);
  const [localCountriesData, setLocalCountriesData] = useState(countries);

  useEffect(() => {
    setLocalCountriesData(countries);
  }, [countries]);

  const columns = [
    // { id: "flag", label: "flag", disableSorting: true },
    { id: "name", label: "name" },
    { id: "capital", label: "capital" },
    { id: "population", label: "population" },
    { id: "currency", label: "currency" },
    { id: "timezone", label: "timezone" },
  ];
  const addNewLine = () => {
    const newLine = {
      flag: undefined,
      name: undefined,
      capital: undefined,
      population: undefined,
      currency: undefined,
      timezone: undefined,
    };
    setLocalCountriesData([newLine, ...countries]);
    addRow(dispatch);
  };

  return (
    <div className="home">
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
      {/* <footer>Developed By Nabil Messaoud in 2021 </footer> */}
    </div>
  );
}
