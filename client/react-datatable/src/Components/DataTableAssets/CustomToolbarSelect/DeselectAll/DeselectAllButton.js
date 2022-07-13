import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeselectIcon from "@mui/icons-material/Deselect";

export default function DeselectAllButton(props) {
  const handleDeselectAll = () => {
    props.setSelectedRows([]);
  };

  return (
    <Tooltip title="Deselect All Rows">
      <IconButton onClick={handleDeselectAll}>
        <DeselectIcon />
      </IconButton>
    </Tooltip>
  );
}
