import React from "react";
import "../../../../App.css";
import { IconButton, Tooltip } from "@mui/material";
import DeselectIcon from "@mui/icons-material/Deselect";

export default function DeselectAllButton(props) {
  const handleDeselectAll = () => {
    props.setSelectedRows([]);
  };

  return (
    <Tooltip title="Deselect All Rows">
      <IconButton className="IconButton" onClick={handleDeselectAll}>
        <DeselectIcon />
      </IconButton>
    </Tooltip>
  );
}
