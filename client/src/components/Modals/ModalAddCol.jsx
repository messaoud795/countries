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
import AddBoxIcon from "@material-ui/icons/AddBox";
import "./ModalEdit.css";
import { useDispatch } from "react-redux";
import { addCountryField } from "../../actions/country_actions";
import { isEmpty } from "lodash";

export default function ModalAddCol({ row, headers }) {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    _id: row._id,
    fieldName: "",
    fieldValue: "",
  });
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleSubmit() {
    //validate that the fieled name is not equal to any of the headers
    if (isEmpty(data.fieldName) || isEmpty(data.fieldValue)) return;
    for (let i in headers) {
      if (headers[i] === data.fieldName) {
        alert("field name already exists");
        return;
      }
    }
    dispatch(addCountryField(data));
    handleClose();
  }

  return (
    <div className="ModalEdit">
      <AddBoxIcon type="button" onClick={handleClickOpen} className="EditIcon">
        react-transition-group
      </AddBoxIcon>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add a new Column to this country
        </DialogTitle>
        <DialogContent>
          <form
            autoComplete="off"
            className="ModalEdit__form"
            onSubmit={handleSubmit}
          >
            <TextField
              label="fieldName"
              variant="outlined"
              className="ModalEdit__input"
              value={data.fieldName}
              onChange={(event) =>
                setData({ ...data, fieldName: event.target.value })
              }
            />
            <TextField
              label="fieldValue"
              variant="outlined"
              className="ModalEdit__input"
              value={data.fieldValue}
              onChange={(event) =>
                setData({ ...data, fieldValue: event.target.value })
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

ModalAddCol.propTypes = {
  row: PropTypes.object,
  headers: PropTypes.array,
};