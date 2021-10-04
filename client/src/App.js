import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MatrixPage from "./pages/MatrixPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/matrix">
            <MatrixPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
