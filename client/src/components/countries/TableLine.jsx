import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./CountriesTable.css";

import { useSelector } from "react-redux";
import { TableCell, TableRow } from "@material-ui/core";
import ModalEdit from "../Modals/ModalEdit";
import ModalDelete from "../Modals/ModalDelete";
import ModalAddCol from "../Modals/ModalAddCol";
import ModalAddRow from "../Modals/ModalAddRow";
import { initialData } from "../../helpers/setColumns";

export default function TableLine({ country, keys, index }) {
  const refs = useRef([React.createRef()]);
  const { newRow } = useSelector((state) => state.country);

  const [inputsData, setInputsData] = useState(initialData(keys));

  useEffect(() => {
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
  return (
    <TableRow ref={refs.current[index]}>
      {keys.map((keyName, i) => (
        <TableCell key={i}>
          <input
            value={
              index === 0 && newRow ? inputsData[keyName] : country[keyName]
            }
            className="countriesTable__input"
            name={keyName}
            onChange={(e) =>
              setInputsData({
                ...inputsData,
                [e.target.name]: e.target.value,
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
            <ModalAddCol row={country} headers={keys} />
            <ModalEdit row={country} />
            <ModalDelete id={country._id} />
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
TableLine.propTypes = {
  country: PropTypes.object,
  keys: PropTypes.array,
  index: PropTypes.number,
};
