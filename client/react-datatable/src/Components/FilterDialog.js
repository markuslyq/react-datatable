import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterRow from "./FilterRow";

export default function FilterDialog(props) {
  const [dialogOpen, setDialogOpen] = useState(props.dialogOpen);

  const [filterCount, setFilterCount] = useState(1);

  const columns = props.columns;
  const data = props.data;

  const renderFilterRows = () => {
    console.log("renderFilterRow");
    let filterRowsRender = [];
    for (let i = 0; i < filterCount; i++) {
      filterRowsRender.push(
        <FilterRow
          columns={columns}
          data={data}
          filterCount={filterCount}
          updateFilterCount={setFilterCount}
        />
      );
    }
    return filterRowsRender;
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    props.updateDialogStatus(false);
  };

  const handleAddFilter = () => {
    let newFilterCount = filterCount;
    newFilterCount += 1;
    setFilterCount(newFilterCount);
  };

  useEffect(() => {
    setDialogOpen(props.dialogOpen);
    console.log("filterCount: " + filterCount);
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
        {renderFilterRows()}
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="text">
          <Button onClick={handleAddFilter}>ADD FILTER</Button>
          <Button>APPLY FILTER</Button>
          <Button onClick={handleCloseDialog}>CLOSE</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}
