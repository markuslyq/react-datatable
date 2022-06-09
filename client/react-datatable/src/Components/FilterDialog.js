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
  MenuItem,
  Select,
  Autocomplete,
  TextField,
  Chip,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function FilterDialog(props) {
  const [dialogOpen, setDialogOpen] = useState(props.dialogOpen);
  const [dataType, setDataType] = useState(null);
  const [columnSelected, setColumnSelected] = useState("");
  const [conditionSelected, setConditionSelected] = useState("");
  const [renderSelected, setRenderSelected] = useState("");

  const [value, setValue] = useState(null);

  const columns = props.columns;
  const data = props.data;

  const filterCriteria = [
    {
      dataType: "string",
      conditionOptions: ["EQUAL", "NOT EQUAL", "CONTAIN"],
      renderOptions: ["multiEntry", "multiEntry", "multiEntryFreeSolo"],
    },
    {
      dataType: "date",
      conditionOptions: ["AFTER", "BEFORE", "BETWEEN", "ISEMPTY"],
      renderOptions: ["datePicker", "datePicker", "twoDatePicker", "empty"],
    },
    {
      dataType: "number",
      conditionOptions: ["EQUALS", "LESS THAN", "MORE THAN"],
      renderOptions: ["numOnlyTextBox", "numOnlyTextBox", "numOnlyTextBox"],
    },
    {
      dataType: "array",
      conditionOptions: ["IN LIST", "NOT IN LIST", "LIST NOT EQUAL", "CONTAIN"],
      renderOptions: ["multiEntry", "multiEntry", "multiEntry", "multiEntry"],
    },
    {
      dataType: "object",
      conditionOptions: ["IN LIST", "NOT IN LIST", "LIST NOT EQUAL", "CONTAIN"],
      renderOptions: ["multiEntry", "multiEntry", "multiEntry", "multiEntry"],
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
      let filterObj = filterCriteria.find(
        (conditionObj) => conditionObj.dataType == dataType
      );
      return filterObj.conditionOptions;
    }
    return [];
  };

  const getRenderOption = () => {
    if (dataType && conditionSelected) {
      let filterObj = filterCriteria.find(
        (conditionObj) => conditionObj.dataType == dataType
      );
      let index = filterObj.conditionOptions.indexOf(conditionSelected);
      return filterObj.renderOptions[index];
    }
    return "";
  };

  const getTextBoxOptions = () => {
    let textBoxOptions = new Set();
    if (dataType && conditionSelected) {
      for (let i = 0; i < data.length; i++) {
        let dataObj = data[i];
        let columnNameSplit = columnSelected.split(".");
        if (columnNameSplit.length === 2) {
          let selectedColVals = dataObj[columnNameSplit[0]][columnNameSplit[1]];
          if (selectedColVals === null) {
            textBoxOptions.add("--");
          } else if (selectedColVals === "") {
            textBoxOptions.add("-");
          } else {
            selectedColVals.map((subHeaderValues) =>
              textBoxOptions.add(subHeaderValues)
            );
          }
        } else {
          let selectedColVals = dataObj[columnSelected];
          if (selectedColVals !== null && Array.isArray(selectedColVals)) {
            selectedColVals.map((colVal) => {
              if (colVal === null) {
                textBoxOptions.add("--");
              } else if (colVal === "") {
                textBoxOptions.add("-");
              } else {
                textBoxOptions.add(colVal);
              }
            });
          } else if (selectedColVals === null) {
            textBoxOptions.add("--");
          } else if (selectedColVals === "") {
            textBoxOptions.add("-");
          } else {
            textBoxOptions.add(selectedColVals);
          }
        }
      }
    }
    return Array.from(textBoxOptions);
  };

  const renderTextBox = () => {
    if (dataType && conditionSelected) {
      switch (renderSelected) {
        case "multiEntry":
          return (
            <Autocomplete
              multiple
              id={dataType + " multiEntry"}
              options={getTextBoxOptions()}
              filterSelectedOptions
              sx={{ m: 1, minWidth: 250 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Value"
                  placeholder="Filter Value"
                />
              )}
            />
          );
        case "multiEntryFreeSolo":
          return (
            <Autocomplete
              multiple
              id="multiEntryFreeSolo"
              options={getTextBoxOptions()}
              freeSolo
              sx={{ m: 1, minWidth: 250 }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Value"
                  placeholder="Filter Value"
                />
              )}
            />
          );
        case "datePicker":
          return (
            <div style={{ padding: 8}}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  sx={{ m: 1, minWidth: 50 }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          );
        case "twoDatePicker":
          break;
        case "numOnlyTextBox":
          break;
        default:
          return <></>;
      }
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    props.updateDialogStatus(false);
  };

  const handleColumnSelect = (event) => {
    setColumnSelected(event.target.value);
    setConditionSelected("");
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
    let textBoxToRender = getRenderOption();
    setRenderSelected(textBoxToRender);
  });

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
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
            <InputLabel>Condition</InputLabel>
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
          {renderTextBox()}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
