import React, { useEffect, useRef, useState, createRef } from "react";
import PropTypes from "prop-types";
import "./CountriesTable.css";
import { useSelector } from "react-redux";
import { TableCell, TableRow } from "@material-ui/core";
import ModalEdit from "../Modals/ModalEdit";
import ModalDelete from "../Modals/ModalDelete";
import ModalAddCol from "../Modals/ModalAddCol";
import ModalAddRow from "../Modals/ModalAddRow";
import { initialData } from "../../helpers/setColumns";
import { capitalize } from "lodash";

export default function TableLine({ country, columns, index }) {
  const refs = useRef([createRef()]);
  const { newRow } = useSelector((state) => state.country);
  const [inputsData, setInputsData] = useState(initialData(columns));
  useEffect(() => {
    //target the first raw cells in the dom
    if (refs.current[0].current && newRow) {
      const cells = refs.current[0].current.children;
      //set inputs to be able to type in
      let i = 0;
      for (i; i < cells.length; i++) {
        cells[i].children[0].disabled = false;
        if (i === 0) cells[i].children[0].focus();
      }
    }
  }, [country, newRow]);

  //funtion to set the cell value: if we are about to add a new row
  // we use inputsdata object else we use country data if it is not undefined
  const setInputValue = (index, newRow, keyName, inputsData, country) => {
    if (index === 0 && newRow) return inputsData[keyName];
    else if (country[keyName] === undefined) return "";
    else return country[keyName];
  };

  return (
    <TableRow ref={refs.current[index]}>
      {columns.map((keyName, i) => (
        <TableCell key={i}>
          <input
            value={setInputValue(index, newRow, keyName, inputsData, country)}
            className="countriesTable__input"
            name={keyName}
            onChange={(e) =>
              setInputsData({
                ...inputsData,
                [e.target.name]: capitalize(e.target.value),
              })
            }
            disabled
          />
        </TableCell>
      ))}
      <TableCell>
        {index === 0 && newRow ? (
          <ModalAddRow data={inputsData} />
        ) : (
          <div className="countriesTable__actions">
            <ModalAddCol row={country} headers={columns} />
            <ModalEdit row={country} columns={columns} />
            <ModalDelete id={country._id} />
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
TableLine.propTypes = {
  country: PropTypes.object,
  columns: PropTypes.array,
  index: PropTypes.number,
};
