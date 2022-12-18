import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const FormDialog = ({
  open,
  handleClose,
  handleConfirm,
  title,
  content,
  disableCancel,
  disableConfirm,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: "#383838" } }}
      >
        <DialogTitle bgcolor={"#136536"}>{title}</DialogTitle>
        <DialogContent>{content()}</DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={disableCancel}
            sx={{
              "&.Mui-disabled": {
                color: "#575757",
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={disableConfirm}
            sx={{
              "&.Mui-disabled": {
                color: "#575757",
              },
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
