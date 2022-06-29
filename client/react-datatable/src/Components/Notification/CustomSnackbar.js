import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";

import CustomAlert from "./CustomAlert";

import { setIsSnackbarOpen } from "./snackbarSlice";

export default function CustomSnackbar(props) {
  const dispatch = useDispatch();
  const isSnackbarOpen = useSelector((state) => state.snackbar.isSnackbarOpen);
  const snackbarVariant = useSelector((state) => state.snackbar.variant);
  const snackbarDuration = useSelector((state) => state.snackbar.duration);
  const snackbarMessage = useSelector((state) => state.snackbar.message);

  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setIsSnackbarOpen(false));
  };

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={snackbarDuration}
      onClose={handleSnackbarClose}
    >
      <CustomAlert
        onClose={handleSnackbarClose}
        severity={snackbarVariant}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </CustomAlert>
    </Snackbar>
  );
}
