import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import { addCountry, saveRow } from "../../actions/country_actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

export default function ModalAddRow({ data }) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit() {
    let i = 0;
    for (let key in data) {
      if (data[key].length > 2) {
        i++;
        continue;
      } else {
        if (i < 3) {
          alert("please enter at least the first three fields");
          return;
        }
      }
    }
    dispatch(addCountry(data));
    saveRow(dispatch);
    handleClose();
  }

  return (
    <div className="ModalEdit">
      <SaveIcon
        type="button"
        onClick={handleClickOpen}
        style={{ color: "green" }}
      >
        react-transition-group
      </SaveIcon>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add country informations
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
ModalAddRow.propTypes = {
  data: PropTypes.object,
};
