import React from "react";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./ModalDelete.css";
import { deleteCountry } from "../../actions/country_actions";
import { useDispatch } from "react-redux";

export default function ModalDelete({ id }) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleSubmit() {
    dispatch(deleteCountry(id));
    handleClose();
  }

  return (
    <div className="ModalEdit">
      <HighlightOffIcon
        type="button"
        onClick={handleClickOpen}
        className="deleteIcon"
      >
        react-transition-group
      </HighlightOffIcon>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Delete country informations
        </DialogTitle>
        <DialogContent></DialogContent>
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
            className="ModalEdit__Btn deleteBtn"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
ModalDelete.propTypes = {
  id: PropTypes.string,
};
