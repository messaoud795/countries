import React from "react";
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
} from "@material-ui/core";
import "./CountriesTable.css";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
var _ = require("lodash");

export default function CountriesTable({ columns, countries }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState();
  const [orderBy, setOrderBy] = React.useState();

  //chnage the page
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
      ? _.orderBy(rows, orderBy, order).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : rows;
  };

  return (
    <TableContainer component={Paper}>
      <Table className="countriesTable" aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
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
        <TableBody>
          {DataAfterSortingAndPaging(countries).map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                <img
                  src={row.flag}
                  className="country_img"
                  alt="country flag"
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.capital}</TableCell>
              <TableCell>{row.population}</TableCell>
              <TableCell>{row.currency}</TableCell>
              <TableCell>{row.timeZone}</TableCell>
              <TableCell className="countriesTable__actions">
                <ModalEdit data={row} />
                <ModalDelete id={row._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={countries?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
