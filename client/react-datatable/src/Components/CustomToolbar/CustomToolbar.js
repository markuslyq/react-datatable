import React, { useState, useEffect } from "react";
import RevertButton from "./Revert/RevertButton";
import SaveButton from "./Save/SaveButton";
import FilterButton from "./Filter/FilterButton";

export default function CustomToolbar(props) {

  const columnOrder = props.columnOrder
  const columns = props.columns;
  const data = props.data;

  return (
    <React.Fragment>
      <RevertButton />
      <SaveButton columnSettings={columns} columnOrder={columnOrder}/>
      <FilterButton columns={columns} data={data} />
    </React.Fragment>
  );
}
