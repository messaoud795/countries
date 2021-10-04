import React, { useEffect, useState } from "react";
import { colors } from "../../pages/colors.js";
import { SelectableGroup } from "react-selectable";
import MatrixLine from "./MatrixLine";
import PropTypes from "prop-types";
import "./Matrix.css";

export default function Matrix({ colorSelected, reset, headers, setReset }) {
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    if (reset) setSelectedKeys([]);
  }, [reset]);
  //uupdate the selected keys state with the index of the cells selected
  const handleSelection = (selectedKeys) => {
    setSelectedKeys(selectedKeys);
    setReset(false);
  };

  return (
    <SelectableGroup
      onSelection={(selectedKeys) => handleSelection(selectedKeys)}
    >
      <table className="matrix">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}> {header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {colors.map((line, i) => (
            <MatrixLine
              colorsArray={line}
              index={i}
              key={i}
              selectedKeys={selectedKeys}
              colorSelected={colorSelected}
            />
          ))}
        </tbody>
      </table>
    </SelectableGroup>
  );
}

Matrix.propTypes = {
  colorSelected: PropTypes.string,
  headers: PropTypes.array,
  reset: PropTypes.bool,
  setReset: PropTypes.func,
};
