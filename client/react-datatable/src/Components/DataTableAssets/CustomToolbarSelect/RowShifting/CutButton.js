import React from "react";
import "../../../../App.css";
import { IconButton, Tooltip } from "@mui/material";
import ContentCutIcon from "@mui/icons-material/ContentCut";

export default function CutButton() {
  return (
    <Tooltip title="Cut Selected Rows">
      <IconButton disabled className="IconButton">
        <ContentCutIcon />
      </IconButton>
    </Tooltip>
  );
}
