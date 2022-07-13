import React, { useState } from "react";
import "../../../../App.css";
import { IconButton, Tooltip } from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import ViewColumnsMenu from "./ViewColumnsMenu";

export default function ViewColumnsButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const columns = props.columns;

  const handleViewCols = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <React.Fragment>
      <Tooltip title="View Columns">
        <IconButton className="IconButton" onClick={handleViewCols}>
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
      <ViewColumnsMenu
        columns={columns}
        setColumns={props.setColumns}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </React.Fragment>
  );
}
