import React from "react";
import { Popover, FormControlLabel, Switch, List, ListItem } from "@mui/material";

export default function ViewColumnsMenu(props) {
  const columns = props.columns;
  const anchorEl = props.anchorEl;
  const isOpen = Boolean(anchorEl);

  const handleViewColsClose = () => {
    props.setAnchorEl(null);
  };

  const handleViewColSwitch = (event) => {
    props.setColumns(
      columns.map((col) => {
        if (col.name === event.target.name) {
          col.options.display = event.target.checked;
        }
        return col;
      })
    );
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleViewColsClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 10,
          fontFamily: "Roboto-Regular",
        }}
      >
        Show Columns
      </div>
      <List>
        {columns.map((col) => {
          return (
            <ListItem key={col.name} style={{ padding: 0, marginLeft: 10 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={col.options.display}
                    onChange={handleViewColSwitch}
                    name={col.name}
                  />
                }
                label={col.label}
              />
            </ListItem>
          );
        })}
      </List>
    </Popover>
  );
}
