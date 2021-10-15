import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { MemoizedCountriesTable } from "../components/countries/CountriesTable";
import { useDispatch, useSelector } from "react-redux";
import { loadCountries } from "../actions/country_actions";
import { Button } from "@material-ui/core";
import { setTableHeaders } from "../helpers/setColumns";
import { useHistory } from "react-router";
import { countriesData as countriesTable2 } from "../actions/getCountries";

export default function HomePage() {
  const { countries } = useSelector((state) => state.country);
  const [columnsTable1, setColumnsTable1] = useState([]);
  const [columnsTable2, setColumnsTable2] = useState([]);
  const [globalTablesData, setGlobalTablesData] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  //api request to get the countries from the back end
  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);
  //initialize countries data and headers
  useEffect(() => {
    if (countries.length > 0) setColumnsTable1(setTableHeaders(countries));
    if (countriesTable2.length > 0)
      setColumnsTable2(setTableHeaders(countriesTable2));
  }, [countries]);
  useEffect(() => {
    setGlobalTablesData([
      [columnsTable1, countries],
      [columnsTable2, countriesTable2],
    ]);
  }, [countries, columnsTable1, columnsTable2]);
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
      {globalTablesData.map((el, i) => (
        <MemoizedCountriesTable
          columns={el[0]}
          countries={el[1]}
          key={i}
          tableNum={i}
        />
      ))}
    </div>
  );
}
