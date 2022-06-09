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
      {/* <Dialog
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
              {columns.map(
                (col) =>
                  col.dataType === "object" ? (
                    col.subHeaders.map((subHeader) => (
                      <MenuItem value={col.name + " - " + subHeader}>
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
      </Dialog> */}
      <FilterDialog
        dialogOpen={dialogOpen}
        columns={columns}
        updateDialogStatus={setDialogOpen}
      />
    </React.Fragment>
  );
}
