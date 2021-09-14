import React from "react";
import "./HomePage.css";
import CountriesTable from "../components/CountriesTable";

export default function HomePage() {
  return (
    <div className="home">
      <h1> Countries Browser</h1>

      <CountriesTable />
      {/* <footer>Developed By Nabil Messaoud in 2021 </footer> */}
    </div>
  );
}
