import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import "./ModalEdit.css";
import { editCountry } from "../../actions/country_actions";
import { useDispatch } from "react-redux";

export default function ModalEdit({ row }) {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    _id: row._id,
    // flag: row.flag,
    name: row.name,
    capital: row.capital,
    currency: row.currency,
    timeZone: row.timeZone,
    population: row.population,
  });
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleSubmit() {
    dispatch(editCountry(data));
    handleClose();
  }

  return (
    <div className="ModalEdit">
      <EditIcon type="button" onClick={handleClickOpen} className="EditIcon">
        react-transition-group
      </EditIcon>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit country informations
        </DialogTitle>
        <DialogContent>
          <form
            autoComplete="off"
            className="ModalEdit__form"
            // onSubmit={handleSubmit}
          >
            {/* <TextField
              label="flag"
              variant="outlined"
              className="ModalEdit__input"
              value={data.flag}
              onChange={(event) =>
                setData({ ...data, flag: event.target.value })
              }
            /> */}
            <TextField
              label="name"
              variant="outlined"
              className="ModalEdit__input"
              value={data.name}
              onChange={(event) =>
                setData({ ...data, name: event.target.value })
              }
            />
            <TextField
              label="capital"
              variant="outlined"
              className="ModalEdit__input"
              value={data.capital}
              onChange={(event) =>
                setData({ ...data, capital: event.target.value })
              }
            />
            <TextField
              label="population"
              variant="outlined"
              className="ModalEdit__input"
              value={data.population}
              onChange={(event) =>
                setData({ ...data, population: event.target.value })
              }
            />
            <TextField
              label="currency"
              variant="outlined"
              className="ModalEdit__input"
              value={data.currency}
              onChange={(event) =>
                setData({ ...data, currency: event.target.value })
              }
            />
            <TextField
              label="timeZone"
              variant="outlined"
              className="ModalEdit__input"
              value={data.timeZone}
              onChange={(event) =>
                setData({ ...data, timeZone: event.target.value })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            className="ModalEdit__Btn"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            className="ModalEdit__Btn"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ModalEdit.propTypes = {
  row: PropTypes.object,
};
