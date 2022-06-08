import React, { useState, useEffect } from "react";
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
  Menu,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FilterDialog(props) {
  const [dialogOpen, setDialogOpen] = useState(props.dialogOpen);
  const [columnSelected, setColumnSelected] = useState("");
  const [dataType, setDataType] = useState(null)

  const columns = props.columns;

  const renderConditions = () => {
    let selectedColumnName = columnSelected.split(".");
    let columnIndex = columns.findIndex(
      (col) => col.name == selectedColumnName[0]
    );
    if (columns[columnIndex]) {
      setDataType(columns[columnIndex]["dataType"]);
      console.log(dataType);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    props.updateDialogStatus(false);
  };

  const handleColumnSelect = (event) => {
    setColumnSelected(event.target.value);
  };

  useEffect(() => {
    setDialogOpen(props.dialogOpen);
    console.log(columnSelected);
    renderConditions();
  });

  return (
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
            {columns.map((col) =>
              col.dataType === "object" ? (
                col.subHeaders.map((subHeader) => (
                  <MenuItem value={col.name + "." + subHeader.toLowerCase()}>
                    {col.label + " - " + subHeader}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={col.name}> {col.label} </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Box>
    </Dialog>
  );
}
