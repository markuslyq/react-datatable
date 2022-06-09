import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterDialog from "./FilterDialog";

export default function CustomToolbar(props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [columnSelected, setColumnSelected] = React.useState("");

  const columns = props.columns;

  const handleClick = () => {
    console.log("Filter icon pressed!");
    handleOpenDialog();
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title={"filter icon"}>
        <IconButton onClick={handleClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <FilterDialog
        dialogOpen={dialogOpen}
        columns={columns}
        data={props.data}
        updateDialogStatus={setDialogOpen}
      />
    </React.Fragment>
  );
}
