import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { TableCell, TableRow } from "@material-ui/core";
import "./CountriesTable.css";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import { useSelector } from "react-redux";
import ModalAdd from "./ModalAdd";

export default function TableRows({ data }) {
  const refs = useRef([React.createRef()]);
  const { newRow } = useSelector((state) => state.country);

  const [inputsData, setInputsData] = useState({
    name: "",
    capital: "",
    currency: "",
    timeZone: "",
    population: "",
  });

  useEffect(() => {
    // if (newLine) { && newLine
    if (refs.current[0].current && newRow) {
      const cells = refs.current[0].current.children;
      //set inputs to be able to type in
      for (var i = 0; i < cells.length; i++) {
        cells[i].children[0].disabled = false;
        //             const name = cells[i].children[0].name;
        // if (name == "name" && i == 0)
        //         cells[i].children[0].value = inputsData.name;
        //       console.log(name);
        // cells[i].children[0].onChange(e) =setinputsData ();

        if (i === 0) cells[i].children[0].focus();
      }
    }
  }, [data, newRow]);
  console.log(inputsData.name);
  const tableLines = data.map((row, index) => (
    <TableRow key={row.name} ref={refs.current[index]}>
      {/* <TableCell>
              <img
                src={row.flag}
                className="country_img"
                alt="country flag"
              />
            </TableCell> */}
      <TableCell>
        <input
          value={row.name}
          className="countriesTable__input"
          disabled
          onChange={(event) =>
            setInputsData({ ...inputsData, name: event.target.value })
          }
        />
      </TableCell>
      <TableCell>
        <input
          value={row.capital}
          className="countriesTable__input"
          disabled
          onChange={(event) =>
            setInputsData({ ...inputsData, capital: event.target.value })
          }
        />
      </TableCell>
      <TableCell>
        <input
          value={row.population}
          className="countriesTable__input"
          disabled
          onChange={(event) =>
            setInputsData({ ...inputsData, population: event.target.value })
          }
        />
      </TableCell>
      <TableCell>
        <input
          value={row.currency}
          className="countriesTable__input"
          disabled
          onChange={(event) =>
            setInputsData({ ...inputsData, currency: event.target.value })
          }
        />
      </TableCell>
      <TableCell>
        <input
          value={row.timeZone}
          className="countriesTable__input"
          disabled
          onChange={(event) =>
            setInputsData({ ...inputsData, timeZone: event.target.value })
          }
        />
      </TableCell>
      <TableCell>
        {index == 0 && newRow ? (
          <ModalAdd data={inputsData} />
        ) : (
          <div className="countriesTable__actions">
            <ModalEdit row={row} />
            <ModalDelete id={row._id} />
          </div>
        )}
      </TableCell>
    </TableRow>
  ));
  return <>{tableLines}</>;
}
TableRows.propTypes = {
  data: PropTypes.array,
};
