import React, { useState, useEffect } from "react";
import RevertButton from "./Revert/RevertButton";
import SaveButton from "./Save/SaveButton";
import FilterButton from "./Filter/FilterButton";

export default function CustomToolbar(props) {

  const columns = props.columns;
  const data = props.data;

  return (
    <React.Fragment>
      <RevertButton />
      <SaveButton />
      <FilterButton columns={columns} data={data} />
    </React.Fragment>
  );
}
