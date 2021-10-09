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
import { capitalize } from "lodash";

export default function ModalEdit({ row, columns }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let initialInputsObject = { id: row._id };

  //initialInputsObject contains the keys equals to headers of the table
  //and the value of the country data if it's not undefined
  useEffect(() => {
    columns.map((column) => {
      if (row[column] === undefined) initialInputsObject[column] = "";
      else initialInputsObject[column] = row[column];
    });
  }, [row]);

  const [data, setData] = useState(initialInputsObject);
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
            {columns.map((column, i) => (
              <TextField
                key={i}
                label={column}
                name={column}
                variant="outlined"
                className="ModalEdit__input"
                value={data[column]}
                onChange={(event) =>
                  setData({
                    ...data,
                    [event.target.name]: capitalize(event.target.value),
                  })
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
  columns: PropTypes.array,
};
