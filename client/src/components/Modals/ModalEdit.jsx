import React, { useEffect, useState } from "react";
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
  const [keys, setKeys] = useState(null);
  const [data, setData] = useState({
    _id: row._id,
    name: row.name,
    capital: row.capital,
    currency: row.currency,
    timeZone: row.timeZone,
    population: row.population,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setKeys(Object.keys(row));
  }, [row]);

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
          <form autoComplete="off" className="ModalEdit__form">
            {keys?.slice(2, keys.length - 2).map((key, i) => (
              <TextField
                key={i}
                label={key}
                name={key}
                variant="outlined"
                className="ModalEdit__input"
                value={data[name]}
                onChange={(event) =>
                  setData({ ...data, [event.target.name]: event.target.value })
                }
              />
            ))}
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
