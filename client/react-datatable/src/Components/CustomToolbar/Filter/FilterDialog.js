import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterRow from "./FilterRow";
import {
  closeFilterDialog,
  setFilterCount,
  clearFilterObjArr,
  setIsFilterAppliedClicked,
  setIsFilterApplied,
  setDeleteFilterRowIndex,
  pushFilterObjArr,
  deleteFilterObj,
  setFilteredData,
} from "./filterSlice";
import { setDayOfYear } from "date-fns";
import store from "../../../store";

function areArraysEqual(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every((element) => {
      if (array2.includes(element)) {
        return true;
      }

      return false;
    });
  }
  return false;
}

export default function FilterDialog(props) {
  const dispatch = useDispatch();

  const isFilterDialogOpen = useSelector(
    (state) => state.filter.isFilterDialogOpen
  );
  const filterCount = useSelector((state) => state.filter.filterCount);
  const [filterObjArr, setFilterObjArr] = useState(
    store.getState().filter.filterObjArr
  );
  const isFilterApplied = useSelector((state) => state.filter.isFilterApplied);
  const isFilterAppliedClicked = useSelector(
    (state) => state.filter.isFilterAppliedClicked
  );
  const deleteFilterRowIndex = useSelector(
    (state) => state.filter.deleteFilterRowIndex
  );

  const [filterRowArr, setFilterRowArr] = useState([]);
  const [renderCount, setRenderCount] = useState(0);

  const columns = props.columns;
  const data = props.data;

  const processFilter = (dataToFilter, filterObj) => {
    let column = filterObj.column;
    let condition = filterObj.condition;
    let filterValue = filterObj.value;
    let columnSplit = column.split(".");
    switch (condition) {
      case "EQUAL":
        /*
        filterValue datatype: Array
        For each data row, return true if value of the selected column is EQUALs to one of that in the filterValue array.
        Get those row which returns true.

        filterValue datatype: Number
        For each data row, return true if value of the selected column is EQUALs to that of filterValue.
        Get those row which returns true.
        */
        if (Array.isArray(filterValue)) {
          let filteredData = dataToFilter.filter((dataRow) => {
            return filterValue.includes(dataRow[column].toString());
          });
          return filteredData;
        } else {
          return dataToFilter.filter((dataRow) => {
            return dataRow[column] == filterValue;
          });
        }
      case "NOT EQUAL":
        /*
        filterValue datatype: Array
        For each data row, return true if value of the selected column is NOT EQUALs to one of that in the filterValue array.
        Get those row which returns true.
        */
        if (Array.isArray(filterValue)) {
          let filteredData = dataToFilter.filter((dataRow) => {
            return !filterValue.includes(dataRow[column].toString());
          });
          return filteredData;
        } else {
          return dataToFilter.filter((dataRow) => {
            return dataRow[column] != filterValue;
          });
        }
      case "CONTAIN":
        /*
        filterValue datatype: Array
        Value of the selected column (dataRow[column]) datatype: Array || string
        For each data row, return true if value of the selected column CONTAINs one of the value in the filterValue array.
        (i.e. 'Markus' contains 'M' or 'Mark')
        Get those row which returns true.
        */
        return dataToFilter.filter((dataRow) => {
          if (columnSplit.length === 2) {
            return filterValue.some((val) => {
              return dataRow[columnSplit[0]][columnSplit[1]].some((variable) =>
                variable.includes(val)
              );
            });
          }
          if (Array.isArray(dataRow[column])) {
            return filterValue.some((val) => {
              return dataRow[column].some((variable) => variable.includes(val));
            });
            // return dataRow[column].some((val) => {
            //   return filterValue.includes(val);
            // });
          }
          return filterValue.some((val) =>
            dataRow[column].toString().includes(val)
          );
        });
      case "AFTER": //filterValue datatype is a date object
        return dataToFilter.filter((dataRow) => {
          return dataRow[column] > filterValue;
        });
      case "BEFORE": //filterValue datatype is a date object
        return dataToFilter.filter((dataRow) => {
          return dataRow[column] < filterValue;
        });
      case "BETWEEN": //filterValue datatype is an object of 2 date objects - filterStartDate and filterEndDate
        return dataToFilter.filter((dataRow) => {
          return (
            dataRow[column] > filterValue.filterStartDate &&
            dataRow[column] < filterValue.filterEndDate
          );
        });
      case "ISEMPTY": //no filterValue
        return dataToFilter.filter((dataRow) => {
          return dataRow[column] == "--";
        });
        break;
      case "LESS THAN": //filterValue datatype is a number
        return dataToFilter.filter((dataRow) => {
          return dataRow[column] < filterValue;
        });
      case "MORE THAN": //filterValue datatype is a number
        return dataToFilter.filter((dataRow) => {
          return dataRow[column] > filterValue;
        });
      case "IN LIST":
        /*
        filterValue datatype: Array
        Value of the selected column (dataRow[column]) datatype: Array
        For each data row, returns true if either one of the values in dataRow[column] exists in the filterValue array.
        */
        return dataToFilter.filter((dataRow) => {
          if (columnSplit.length === 2) {
            return dataRow[columnSplit[0]][columnSplit[1]].every((val) => {
              return filterValue.includes(val);
            });
          }
          return dataRow[column].every((val) => {
            return filterValue.includes(val);
          });
        });
      case "NOT IN LIST":
        /*
        filterValue datatype: Array
        Value of the selected column (dataRow[column]) datatype: Array
        For each data row, returns false if either one of the values in dataRow[column] exist in the filterValue array.
        */
        return dataToFilter.filter((dataRow) => {
          let isNotInList = true;
          if (columnSplit.length === 2) {
            dataRow[columnSplit[0]][columnSplit[1]].forEach((val) => {
              if (filterValue.includes(val)) {
                isNotInList = false;
              }
            });
          } else {
            dataRow[column].forEach((val) => {
              if (filterValue.includes(val)) {
                isNotInList = false;
              }
            });
          }
          return isNotInList;
        });
      case "LIST NOT EQUAL":
        /* 
        filterValue dataType: Array
        Returns true if the list is not a direct match to the entered variables.
        */
        let variable = [];
        return dataToFilter.filter((dataRow) => {
          if (columnSplit.length === 2) {
            variable = dataRow[columnSplit[0]][columnSplit[1]];
          } else {
            variable = dataRow[column];
          }
          return !areArraysEqual(variable, filterValue);
        });
      default:
        return [];
    }
  };

  const filterData = (newFilterObjArr) => {
    let filteredData = data;
    // setFilterCount(filterObjArr.length);
    newFilterObjArr.forEach((filterObj) => {
      filteredData = processFilter(filteredData, filterObj);
    });
    let formattedFilteredData = [];
    filteredData.forEach((individualData) => {
      formattedFilteredData.push(individualData);
    });
    return formattedFilteredData;
  };

  const handleCloseDialog = () => {
    if (filterObjArr.length === 0) {
      let newFilterRowArr = [
        <FilterRow id={0} key={0} columns={columns} data={data} />,
      ];
      setFilterRowArr(newFilterRowArr);
    } else {
      let newFilterRowArr = [];
      for (let i = 0; i < filterObjArr.length; i++) {
        newFilterRowArr.push(
          <FilterRow id={i} key={i} columns={columns} data={data} />
        );
      }
      setFilterRowArr(newFilterRowArr);
    }
    setRenderCount(0);
    dispatch(closeFilterDialog());
  };

  const handleAddFilter = () => {
    let newFilterRowArr = filterRowArr;
    let index = filterRowArr.length;
    newFilterRowArr.push(
      <FilterRow id={index} key={index} columns={columns} data={data} />
    );
    setFilterRowArr([...newFilterRowArr]);
  };

  const handleApplyFilter = () => {
    dispatch(clearFilterObjArr());
    dispatch(setIsFilterAppliedClicked(true));
    dispatch(closeFilterDialog());
  };

  const handleDeleteFilterRow = () => {
    let newFilterRowArr = filterRowArr;
    delete newFilterRowArr[deleteFilterRowIndex];
    setFilterRowArr(newFilterRowArr);
    // dispatch(deleteFilterObj(deleteFilterRowIndex));
    dispatch(setDeleteFilterRowIndex(-1));
  };

  useEffect(() => {
    setFilterObjArr(store.getState().filter.filterObjArr);

    //Generate initial filter row
    if (isFilterDialogOpen) {
      if (renderCount == 0) {
        let latestFilterObjArr = store.getState().filter.filterObjArr;
        if (filterRowArr.length === 0) {
          let newFilterRowArr = [];
          let index = filterRowArr.length;
          newFilterRowArr.push(
            <FilterRow id={index} key={index} columns={columns} data={data} />
          );
          setFilterRowArr(newFilterRowArr);
        }
        if (latestFilterObjArr.length > 0) {
          let newFilterRowArr = [];
          for (let i = 0; i < latestFilterObjArr.length; i++) {
            newFilterRowArr.push(
              <FilterRow id={i} key={i} columns={columns} data={data} />
            );
          }
          setFilterRowArr(newFilterRowArr);
        }
        let newRenderCount = renderCount;
        newRenderCount++;
        setRenderCount(newRenderCount);
      }
    }

    //Handles deletion of filter row
    if (deleteFilterRowIndex >= 0) {
      handleDeleteFilterRow();
    }

    //Handles application of filter
    if (isFilterAppliedClicked) {
      let newFilterObjArr = store.getState().filter.filterObjArr;
      setFilterObjArr(newFilterObjArr);
      console.log("filteredData: ");
      let filteredData = filterData(newFilterObjArr);
      console.log(filteredData);
      dispatch(setFilteredData(filteredData));

      let newFilterCount = newFilterObjArr.length;
      dispatch(setFilterCount(newFilterCount));

      if (newFilterCount > 0) {
        dispatch(setIsFilterApplied(true));
      } else {
        dispatch(setIsFilterApplied(false));
      }
      dispatch(setIsFilterAppliedClicked(false));
    }
  }, [isFilterDialogOpen, filterObjArr, deleteFilterRowIndex]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={isFilterDialogOpen}
      onClose={handleCloseDialog}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>
        <FilterListIcon sx={{ mr: 1 }} />
        Filters :
      </DialogTitle>
      <DialogContent>{filterRowArr}</DialogContent>
      <DialogActions>
        <ButtonGroup variant="text">
          <Button onClick={handleAddFilter}>ADD FILTER</Button>
          <Button onClick={handleApplyFilter}>APPLY FILTER</Button>
          <Button onClick={handleCloseDialog}>CLOSE</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
