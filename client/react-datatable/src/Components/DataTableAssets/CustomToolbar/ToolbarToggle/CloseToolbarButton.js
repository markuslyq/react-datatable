import React from "react";
import { useDispatch } from "react-redux";
import "../../../../App.css";
import { Tooltip, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { setIsToolbarOpen } from "./toolbarSlice";

export default function CloseToolbarButton() {
  const dispatch = useDispatch();

  const handleCloseToolbar = () => {
    dispatch(setIsToolbarOpen(false));
  };

  return (
    <Tooltip title="Close Toolbar">
      <IconButton className="IconButton" onClick={handleCloseToolbar}>
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
}
