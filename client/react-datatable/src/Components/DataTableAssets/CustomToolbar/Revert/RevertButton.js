import React from "react";
import "../../../../App.css";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Tooltip, Badge } from "@mui/material";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";

import { setIsRevertClicked } from "./revertSlice";

export default function RevertButton() {
  const dispatch = useDispatch();

  const handleRevertSettings = () => {
    dispatch(setIsRevertClicked(true));
  };

  return (
    <Tooltip title={"Revert Default Table Configuration"}>
      <IconButton className="IconButton" onClick={handleRevertSettings}>
        <SettingsBackupRestoreIcon />
      </IconButton>
    </Tooltip>
  );
}
