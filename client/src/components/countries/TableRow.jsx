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
import { capitalize, isEqual } from "lodash";

function tableLinePropsAreEqual(prevTableProps, nextTableProps) {
  return isEqual(prevTableProps, nextTableProps);
}

function CountriesTableRow({ country, columns, index, tableRef }) {
  const refs = useRef([createRef()]);
  const {
    newRow: { newRow, tableNum },
  } = useSelector((state) => state.country);
  const [inputsData, setInputsData] = useState(initialData(columns));

  useEffect(() => {
    //target the first raw cells in the dom
    // if (newRow) console.log({ index }, { newRow });
    if (refs.current[0].current && newRow && tableRef === tableNum) {
      const cells = refs.current[0].current.children;
      //set inputs to be able to type in
      let i = 0;
      for (i; i < cells.length; i++) {
        cells[i].children[0].disabled = false;
        //focus on the first input on the row
        if (i === 0) cells[i].children[0].focus();
      }
    }
  }, [country, newRow]);

  //funtion to set the cell value: if we are about to add a new row
  // we use inputsdata object else we use country data if it is not undefined
  const setInputValue = (index, newRow, keyName, inputsData, country) => {
    if (index === 0 && newRow && tableRef === tableNum)
      return inputsData[keyName];
    else if (country[keyName] === undefined) return "";
    else return country[keyName];
  };

  return (
    <TableRow ref={refs.current[index]} className="tableRow">
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
        {index === 0 && newRow && tableRef === tableNum ? (
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
export const MemoizedCountriesTableRow = React.memo(
  CountriesTableRow,
  tableLinePropsAreEqual
);
CountriesTableRow.propTypes = {
  country: PropTypes.object,
  columns: PropTypes.array,
  index: PropTypes.number,
  tableRef: PropTypes.number,
};
