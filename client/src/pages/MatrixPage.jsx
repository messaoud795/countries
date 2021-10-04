import React, { useEffect, useState } from "react";
import "./MatrixPage.css";
import { Button } from "@material-ui/core";
import Matrix from "../components/matrix/Matrix";

export default function MatrixPage() {
  const colorsSelection = ["#6F69AC", "#95DAC1", "#FFEBA1"];
  const [colorSelected, setColorSelected] = useState(colorsSelection[0]);
  const [reset, setReset] = useState(false);
  const [colorOptionsVisible, setColorOptionsVisible] = useState(false);
  const headers = " abcdefghij".toUpperCase().split("");

  useEffect(() => {}, [colorSelected]);
  console.log(reset);
  //dispath action to reset the background color
  const handleReset = (event) => {
    event.preventDefault();
    setColorSelected(colorsSelection[0]);
    setReset(true);
    setColorOptionsVisible(false);
  };

  return (
    <div className="matrixPage">
      <div className="matrixPage__header">
        <h1>Select multiple matrix cells color</h1>
        <div className="matrixPage__colorSelector">
          <div
            style={{
              backgroundColor: colorSelected,
            }}
            onClick={() => setColorOptionsVisible(!colorOptionsVisible)}
          ></div>
          {colorOptionsVisible &&
            colorsSelection.map((color) => (
              <div
                key={color}
                style={{
                  backgroundColor: color,
                }}
                onClick={() => {
                  setColorSelected(color);
                  setColorOptionsVisible(!colorOptionsVisible);
                }}
              ></div>
            ))}
        </div>
        <Button
          variant="contained"
          onClick={handleReset}
          className="MatrixPage__reset"
        >
          Reset
        </Button>
      </div>
      <Matrix
        colorSelected={colorSelected}
        reset={reset}
        headers={headers}
        setReset={setReset}
      />
    </div>
  );
}
