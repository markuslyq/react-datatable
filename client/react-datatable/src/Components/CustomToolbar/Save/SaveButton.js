import React from "react";
import { IconButton, Tooltip, Badge } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function SaveButton() {
  return (
    <Tooltip title={"Save Table Configuration"}>
      <IconButton>
        <SaveIcon />
      </IconButton>
    </Tooltip>
  );
}
