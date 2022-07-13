import React from "react";
import { useDispatch } from "react-redux";
import "../../../../App.css";
import { Tooltip, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { setIsToolbarOpen } from "./toolbarSlice";

export default function OpenToolbarButton(props) {
  const dispatch = useDispatch();

  const handleOpenToolbar = () => {
    dispatch(setIsToolbarOpen(true));
  };

  return (
    <Tooltip title="Open Toolbar">
      <IconButton className="IconButton" onClick={handleOpenToolbar}>
        <MenuIcon />
      </IconButton>
    </Tooltip>
  );
}
