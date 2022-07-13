import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import FilterRow from "./FilterRow";
import {
  closeFilterDialog,
  clearFilterObjArr,
  setIsFilterAppliedClicked,
  setDeleteFilterRowIndex,
} from "./filterSlice";
import store from "../../../../store";

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

  const isFilterDialogOpen = useSelector((state) => state.filter.isFilterDialogOpen);
  const [filterObjArr, setFilterObjArr] = useState(store.getState().filter.filterObjArr);
  const deleteFilterRowIndex = useSelector((state) => state.filter.deleteFilterRowIndex);

  const [filterRowArr, setFilterRowArr] = useState([]);
  const [renderCount, setRenderCount] = useState(0);

  const columns = props.columns;
  const data = props.data;

  const handleCloseDialog = () => {
    if (filterObjArr.length === 0) {
      let newFilterRowArr = [<FilterRow id={0} key={0} columns={columns} data={data} />];
      setFilterRowArr(newFilterRowArr);
    }
    setRenderCount(0);
    dispatch(closeFilterDialog());
  };

  const handleAddFilter = () => {
    let newFilterRowArr = filterRowArr;
    let index = filterRowArr.length;
    newFilterRowArr.push(<FilterRow id={index} key={index} columns={columns} data={data} />);
    setFilterRowArr([...newFilterRowArr]);
  };

  const handleApplyFilter = () => {
    dispatch(clearFilterObjArr());
    dispatch(setIsFilterAppliedClicked(true));
    setRenderCount(0);
    dispatch(closeFilterDialog());
  };

  const handleDeleteFilterRow = () => {
    let newFilterRowArr = filterRowArr;
    delete newFilterRowArr[deleteFilterRowIndex];
    setFilterRowArr(newFilterRowArr);
    dispatch(setDeleteFilterRowIndex(-1));
  };

  const handleClearFilter = () => {
    for (let i = 0; i < filterRowArr.length; i++) {
      setFilterRowArr([]);
    }
  };

  useEffect(() => {
    let latestFilterObjArr = store.getState().filter.filterObjArr;
    setFilterObjArr(latestFilterObjArr);

    //Generate initial filter row
    if (isFilterDialogOpen) {
      if (renderCount == 0) {
        //To account for the "empty" element
        let filterRowArrLength = filterRowArr.reduce(
          (prevVal, currVal) => (currVal ? prevVal + 1 : prevVal),
          0
        );
        if (filterRowArrLength === 0) {
          let newFilterRowArr = [<FilterRow id={0} key={0} columns={columns} data={data} />];
          setFilterRowArr(newFilterRowArr);
        }
        if (latestFilterObjArr.length > 0) {
          let newFilterRowArr = [];
          for (let i = 0; i < latestFilterObjArr.length; i++) {
            newFilterRowArr.push(<FilterRow id={i} key={i} columns={columns} data={data} />);
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
  }, [isFilterDialogOpen, filterObjArr, deleteFilterRowIndex, renderCount]);

  return (
    <Dialog fullWidth={true} maxWidth="md" open={isFilterDialogOpen} onClose={handleCloseDialog}>
      <DialogTitle sx={{ fontWeight: "bold", pr: 0 }}>
        <Grid container spacing={0}>
          <Grid item xs={10} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <FilterListIcon sx={{ mr: 1 }} />
            Filters:
          </Grid>
          <Grid item xs={2}>
            <Button onClick={handleClearFilter}>
              <ClearIcon fontSize="small" />
              CLEAR FILTER
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent style={{ overflowX: "hidden" }}>{filterRowArr}</DialogContent>
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
