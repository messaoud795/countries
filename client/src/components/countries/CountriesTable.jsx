import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  TableSortLabel,
  Button,
  CircularProgress,
} from "@material-ui/core";
import "./CountriesTable.css";
import { orderBy as lodashOrderBy, isEqual } from "lodash";
import { MemoizedCountriesTableRow } from "./TableRow";
import { addRow } from "../../actions/country_actions";
import { useDispatch, useSelector } from "react-redux";

function tablePropsAreEqual(prevTableProps, nextTableProps) {
  return isEqual(prevTableProps, nextTableProps);
}

function CountriesTable({ columns, countries, tableNum }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [localCountriesData, setLocalCountriesData] = useState(countries);
  const { loadingAction } = useSelector((state) => state.country);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const dispatch = useDispatch();

  //initialize countries data and headers
  useEffect(() => {
    setLocalCountriesData(countries);
  }, [countries]);
  //change the page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //set how much rows to display in the table
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSortRequest = (cellId) => {
    //check the order type of the clicked column
    const isAsc = cellId === orderBy && "asc" === order;
    //toggle to desc if it is asc
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  //handle countries data after sorting and paging
  const DataAfterSortingAndPaging = (rows) => {
    return rowsPerPage > 0
      ? lodashOrderBy(rows, orderBy, order).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : rows;
  };

  //add a new line to the countries data that contains an object with the headers keys and empty entries
  async function addNewLine() {
    let newLine = {};
    await columns.map((column) => (newLine[column.label] = ""));
    await setLocalCountriesData([newLine, ...countries]);
    dispatch(addRow(tableNum));
  }

  return (
    <TableContainer component={Paper} className="countriesTableWrapper">
      {loadingAction ? (
        <CircularProgress className="countriesTable__spinner" />
      ) : (
        <React.Fragment>
          <Button
            variant="contained"
            className="countriesTable__addBtn"
            onClick={addNewLine}
            data-testid={tableNum}
          >
            add a country
          </Button>
          <Table
            className="countriesTable"
            aria-label="custom pagination table"
          >
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    key={column.id}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    {column.label}
                    {column.disableSorting ? null : (
                      <TableSortLabel
                        active={orderBy === column.id}
                        onClick={() => handleSortRequest(column.id)}
                        direction={column.id === orderBy ? order : "asc"}
                      ></TableSortLabel>
                    )}
                  </TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="countriesTable__tbody">
              {DataAfterSortingAndPaging(localCountriesData).map(
                (country, index) => (
                  <MemoizedCountriesTableRow
                    key={index}
                    country={country}
                    columns={columns.map((col) => col.label)}
                    index={index}
                    tableRef={tableNum}
                  />
                )
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  count={localCountriesData?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </React.Fragment>
      )}
    </TableContainer>
  );
}
export const MemoizedCountriesTable = React.memo(
  CountriesTable,
  tablePropsAreEqual
);

CountriesTable.propTypes = {
  columns: PropTypes.array,
  countries: PropTypes.array,
  tableNum: PropTypes.number,
};
