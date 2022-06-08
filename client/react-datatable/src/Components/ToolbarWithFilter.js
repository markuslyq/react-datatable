import React from "react";
import {
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function ToolbarWithFilter(props) {
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

  const handleColumnSelect = (event) => {
    setColumnSelected(event.target.value);
    console.log(columnSelected);
  };

  return (
    <React.Fragment>
      <Tooltip title={"filter icon"}>
        <IconButton onClick={handleClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          <FilterListIcon sx={{ mr: 1 }} />
          Filters :
        </DialogTitle>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            m: "auto",
            width: "fit-content",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Column</InputLabel>
            <Select
              autoFocus
              value={columnSelected}
              onChange={handleColumnSelect}
              label="columnSelected"
              inputProps={{
                name: "columnSelected",
                id: "columnSelected",
              }}
            >
              {columns.map((col) => {
                if (col.dataType === "object") {
                  return (
                    <div>
                      {col.subHeaders.map((subHeader) => {
                        return (
                          <MenuItem value={col.name + " - " + subHeader}>
                            {col.label + " - " + subHeader}
                          </MenuItem>
                        );
                      })}
                    </div>
                  );
                } else {
                  return <MenuItem value={col.name}> {col.label} </MenuItem>;
                }
              })}
            </Select>
          </FormControl>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
