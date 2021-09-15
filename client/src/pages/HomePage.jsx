import React, { useEffect } from "react";
import "./HomePage.css";
import CountriesTable from "../components/CountriesTable";
import { useDispatch, useSelector } from "react-redux";
import { loadCountries } from "../actions/country_actions";
import { CircularProgress } from "@material-ui/core";

export default function HomePage() {
  const dispatch = useDispatch();
  //api request to get the countries from the back end
  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);
  const { countries, loadingAction } = useSelector((state) => state.country);
  const columns = [
    { id: "flag", label: "flag", disableSorting: true },
    { id: "name", label: "name" },
    { id: "capital", label: "capital" },
    { id: "population", label: "population" },
    { id: "currency", label: "currency" },
    { id: "timezone", label: "timezone" },
  ];
  return (
    <div className="home">
      <h1 className="home__title"> Countries Browser</h1>
      {loadingAction ? (
        <CircularProgress className="homePage__spinner" />
      ) : (
        <CountriesTable columns={columns} countries={countries} />
      )}
      {/* <footer>Developed By Nabil Messaoud in 2021 </footer> */}
    </div>
  );
}
