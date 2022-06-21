import React from "react";
import { IconButton, Tooltip, Badge } from "@mui/material";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

export default function RevertButton() {
  return (
    <Tooltip title={"Revert Table Configuration"}>
      <IconButton>
        <SettingsBackupRestoreIcon />
      </IconButton>
    </Tooltip>
  );
}
