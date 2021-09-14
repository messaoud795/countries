import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import TableHead from "@material-ui/core/TableHead";
import TablePaginationActions from "./TablePaginationActions";
import { loadCountries } from "../actions/country_actions";
import { useDispatch, useSelector } from "react-redux";
import "./CountriesTable.css";
import { TableSortLabel } from "@material-ui/core";
import ModalEdit from "./ModalEdit";

export default function CountriesTable() {
  const dispatch = useDispatch();
  //api request to get the countries from the back end
  useEffect(() => {
    dispatch(loadCountries());
  }, [dispatch]);
  const { countries } = useSelector((state) => state.country);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState();
  const [orderBy, setOrderBy] = React.useState();
  const columns = [
    { id: "flag", label: "flag", disableSorting: true },
    { id: "name", label: "name" },
    { id: "capital", label: "capital" },
    { id: "population", label: "population" },
    { id: "currency", label: "currency" },
    { id: "timezone", label: "timezone" },
  ];

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
    console.log({ order, orderBy });
    setOrderBy(cellId);
  };
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  //handle countries data after sorting and paging
  const DataAfterSortingAndPaging = (rows) => {
    console.log(stableSort(rows, getComparator(order, orderBy)));
    return rowsPerPage > 0
      ? stableSort(rows, getComparator(order, orderBy)).slice(
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
              <TableCell>
                <ModalEdit />
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
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
