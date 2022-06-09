import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
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
  const [dataType, setDataType] = useState(null);
  const [columnSelected, setColumnSelected] = useState("");
  const [conditionSelected, setConditionSelected] = useState("");

  const columns = props.columns;

  const conditionsCriteria = [
    {
      dataType: "string",
      conditionOptions: ["EQUAL", "NOT EQUAL", "CONTAIN"],
    },
    {
      dataType: "date",
      conditionOptions: ["AFTER", "BEFORE", "BETWEEN", "ISEMPTY"],
    },
    {
      dataType: "number",
      conditionOptions: ["EQUALS", "LESS THAN", "MORE THAN"],
    },
    {
      dataType: "array",
      conditionOptions: ["IN LIST", "NOT IN LIST", "LIST NOT EQUAL", "CONTAIN"],
    },
    {
      dataType: "object",
      conditionOptions: ["IN LIST", "NOT IN LIST", "LIST NOT EQUAL", "CONTAIN"],
    },
  ];

  const getDataType = () => {
    let selectedColumnName = columnSelected.split(".");
    let columnIndex = columns.findIndex(
      (col) => col.name == selectedColumnName[0]
    );
    if (columns[columnIndex]) {
      setDataType(columns[columnIndex]["dataType"]);
    }
  };

  const getConditionOptions = () => {
    if (dataType) {
      let conditionObj = conditionsCriteria.find(
        (conditionObj) => conditionObj.dataType == dataType
      );
      return conditionObj.conditionOptions;
    }
    return [];
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    props.updateDialogStatus(false);
  };

  const handleColumnSelect = (event) => {
    setColumnSelected(event.target.value);
  };

  const handleConditionSelect = (event) => {
    setConditionSelected(event.target.value);
  };

  useEffect(() => {
    setDialogOpen(props.dialogOpen);
    getDataType();
    getConditionOptions();
    console.log("column selected: " + columnSelected);
    console.log("condition selected: " + conditionSelected);
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
      <DialogContent>
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
              label="columnSelect"
              inputProps={{
                name: "columnSelect",
                id: "columnSelect",
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
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel>Conditions</InputLabel>
            <Select
              value={conditionSelected}
              onChange={handleConditionSelect}
              label="conditionSelect"
              inputProps={{
                name: "conditionSelect",
                id: "conditionSelect",
              }}
            >
              {getConditionOptions().map((conditionOption) => (
                <MenuItem value={conditionOption}>{conditionOption}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
