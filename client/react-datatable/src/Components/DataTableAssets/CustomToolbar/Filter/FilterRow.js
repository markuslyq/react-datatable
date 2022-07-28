import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
  TextField,
  Chip,
  Tooltip,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { pushFilterObjArr, setDeleteFilterRowIndex } from "./filterSlice";
import filterConditions from "./FilterProps/filterConditions";

export default function FilterRow(props) {
  const dispatch = useDispatch();

  const isFilterAppliedClicked = useSelector((state) => state.filter.isFilterAppliedClicked);
  const filterObj = useSelector((state) => state.filter.filterObjArr[props.id]);

  const [dataType, setDataType] = useState(null);
  const [renderSelected, setRenderSelected] = useState("");

  const [columnSelected, setColumnSelected] = useState(filterObj ? filterObj.column : "");
  const [conditionSelected, setConditionSelected] = useState(filterObj ? filterObj.condition : "");

  const [multiEntryValue, setMultiEntryValue] = useState(
    filterObj ? (Array.isArray(filterObj.value) ? filterObj.value : null) : null
  );

  const [filterDate, setFilterDate] = useState(
    filterObj ? (filterObj.value instanceof Date ? filterObj.value : null) : null
  );

  const [filterStartDate, setFilterStartDate] = useState(
    filterObj
      ? typeof filterObj.value === "object" &&
        !Array.isArray(filterObj.value) &&
        filterObj.value !== null
        ? filterObj.value.filterStartDate
        : null
      : null
  );
  const [filterEndDate, setFilterEndDate] = useState(
    filterObj
      ? typeof filterObj.value === "object" &&
        !Array.isArray(filterObj.value) &&
        filterObj.value !== null
        ? filterObj.value.filterEndDate
        : null
      : null
  );
  const [numberValue, setNumberValue] = useState(
    filterObj
      ? !isNaN(filterObj.value) && !Array.isArray(filterObj.value)
        ? filterObj.value
        : null
      : null
  );

  const id = props.id;
  const columns = props.columns;
  const data = props.data;

  const filterCriteria = filterConditions;

  const getDataType = () => {
    let selectedColumnName = columnSelected.split(".");
    let columnIndex = columns.findIndex((col) => col.name === selectedColumnName[0]);
    if (columns[columnIndex]) {
      setDataType(columns[columnIndex]["dataType"]);
    }
  };

  const getConditionOptions = () => {
    if (dataType) {
      let filterObj = filterCriteria.find((conditionObj) => conditionObj.dataType === dataType);
      return filterObj.conditionOptions;
    }
    return [];
  };

  const getRenderOption = () => {
    if (dataType && conditionSelected) {
      let filterObj = filterCriteria.find((conditionObj) => conditionObj.dataType === dataType);
      let index = filterObj.conditionOptions.indexOf(conditionSelected);
      return filterObj.renderOptions[index];
    }
    return "";
  };

  const getFilterValues = () => {
    if (dataType && conditionSelected) {
      switch (renderSelected) {
        case "multiEntry":
        case "multiEntryFreeSolo":
        case "numOnlyMultiEntry":
          return multiEntryValue;
        case "datePicker":
          return filterDate;
        case "twoDatePicker":
          return {
            filterStartDate: filterStartDate,
            filterEndDate: filterEndDate,
          };
        case "numOnlyTextBox":
          return numberValue;
        default:
          return "--";
      }
    }
  };

  const getTextBoxOptions = () => {
    let textBoxOptions = new Set();
    if (dataType && conditionSelected) {
      for (let i = 0; i < data.length; i++) {
        let dataObj = data[i];
        let columnNameSplit = columnSelected.split(".");
        if (columnNameSplit.length === 2) {
          let selectedColVals = dataObj[columnNameSplit[0]][columnNameSplit[1]];
          selectedColVals.map((subHeaderValues) => {
            textBoxOptions.add(subHeaderValues);
          });
        } else {
          let selectedColVals = dataObj[columnSelected];
          if (selectedColVals !== null && Array.isArray(selectedColVals)) {
            selectedColVals.map((colVal) => {
              textBoxOptions.add(colVal);
            });
          } else {
            textBoxOptions.add(selectedColVals);
          }
        }
      }
    }
    let formattedOptions = Array.from(textBoxOptions);
    if (typeof formattedOptions[0] === "number") {
      return formattedOptions.map(String).sort((a, b) => {
        return a - b;
      });
    }
    return formattedOptions.sort();
  };

  const renderTextBox = () => {
    if (dataType && conditionSelected) {
      switch (renderSelected) {
        case "multiEntry":
          return (
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <Autocomplete
                multiple
                key={conditionSelected}
                id={dataType + "-multiEntry"}
                options={getTextBoxOptions()}
                defaultValue={multiEntryValue === null ? [] : multiEntryValue}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Value" placeholder="Filter Value" />
                )}
                onChange={(event, values) => {
                  setMultiEntryValue(values);
                }}
              />
            </FormControl>
          );
        case "multiEntryFreeSolo":
          return (
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <Autocomplete
                multiple
                key={conditionSelected}
                id="multiEntryFreeSolo"
                options={getTextBoxOptions()}
                defaultValue={multiEntryValue === null ? [] : multiEntryValue}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Value" placeholder="Filter Value" />
                )}
                onChange={(event, values) => {
                  setMultiEntryValue(values);
                }}
              />
            </FormControl>
          );
        case "datePicker":
          return (
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={filterDate}
                  inputFormat="dd/MM/yyyy"
                  onChange={(newDate) => {
                    setFilterDate(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          );
        case "twoDatePicker":
          return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <DatePicker
                  label="Start"
                  value={filterStartDate}
                  inputFormat="dd/MM/yyyy"
                  onChange={(newDate) => {
                    setFilterStartDate(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <DatePicker
                  label="End"
                  value={filterEndDate}
                  inputFormat="dd/MM/yyyy"
                  onChange={(newDate) => {
                    setFilterEndDate(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </LocalizationProvider>
          );
        case "numOnlyTextBox":
          return (
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <TextField
                key={conditionSelected}
                id="numOnlyTextBox"
                label="Value"
                placeholder="Filter Value"
                defaultValue={numberValue === null ? "" : numberValue}
                variant="outlined"
                type="number"
                onChange={(event) => {
                  setNumberValue(event.target.value);
                }}
              />
            </FormControl>
          );
        case "numOnlyMultiEntry":
          return (
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <Autocomplete
                multiple
                key={conditionSelected}
                id={dataType + "-multiEntry"}
                options={getTextBoxOptions()}
                defaultValue={multiEntryValue === null ? [] : multiEntryValue}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Value" placeholder="Filter Value" type="number" />
                )}
                onChange={(event, values) => {
                  setMultiEntryValue(values);
                }}
              />
            </FormControl>
          );
        default:
          return <></>;
      }
    }
  };

  const handleColumnSelect = (event) => {
    setColumnSelected(event.target.value);
    setConditionSelected("");
  };

  const handleConditionSelect = (event) => {
    setConditionSelected(event.target.value);
    setMultiEntryValue(null);
    setFilterDate(null);
    setFilterStartDate(null);
    setFilterEndDate(null);
    setNumberValue(null);
  };

  const handleRemoveFilterRow = () => {
    dispatch(setDeleteFilterRowIndex(id));
  };

  useEffect(() => {
    getDataType();
    getConditionOptions();
    let textBoxToRender = getRenderOption();
    setRenderSelected(textBoxToRender);
    if (isFilterAppliedClicked) {
      let filterObj = {
        column: columnSelected,
        condition: conditionSelected,
        value: getFilterValues(),
      };
      dispatch(pushFilterObjArr(filterObj));
    }
  });

  return (
    <Grid container spacing={0}>
      <Grid item xs={11}>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "fit-content",
            alignItems: "left",
            justifyContent: "center",
          }}
        >
          {/* Column Select Option Box */}
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
                col.dataType === "group" ? (
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

          {/* Condition Select Option Box */}
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
      </Grid>

      {/* Remove Filter Row Icon */}
      <Grid item xs={1}>
        <FormControl sx={{ mt: 2, minWidth: 150 }}>
          <Tooltip title={"Remove Filter"}>
            <IconButton sx={{ maxHeight: "50px", maxWidth: "50px" }}>
              <RemoveCircleOutlineIcon onClick={handleRemoveFilterRow} />
            </IconButton>
          </Tooltip>
        </FormControl>
      </Grid>
    </Grid>
  );
}
