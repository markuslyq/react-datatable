import React, { useState, useEffect } from "react";
import RevertButton from "./Revert/RevertButton";
import SaveTableButton from "./Save/SaveTableButton";
import SaveFilterButton from "./Save/SaveFilterButton";
import FilterButton from "./Filter/FilterButton";

export default function CustomToolbar(props) {
  const columnOrder = props.columnOrder;
  const columns = props.columns;
  const data = props.data;

  return (
    <React.Fragment>
      <RevertButton />
      <SaveTableButton columnSettings={columns} columnOrder={columnOrder} />
      <SaveFilterButton columnSettings={columns} columnOrder={columnOrder} />
      <FilterButton columns={columns} data={data} />
    </React.Fragment>
  );
}
