import React, { useState, useEffect } from "react";
import RevertButton from "./Revert/RevertButton";
import SaveTableButton from "./Save/SaveTableButton";
import SaveFilterButton from "./Save/SaveFilterButton";
import FilterButton from "./Filter/FilterButton";
import LoadFilterButton from "./Load/LoadFilterButton";
import ViewColumnsButton from "./ViewColumns/ViewColumnsButton";

export default function CustomToolbar(props) {
  const columnOrder = props.columnOrder;
  const columns = props.columns;
  const data = props.data;
  const tableName = props.tableName;

  return (
    <React.Fragment>
      <ViewColumnsButton columns={columns} setColumns={props.setColumns}/>
      <RevertButton />
      <SaveTableButton columnSettings={columns} columnOrder={columnOrder} tableName={tableName} />
      <SaveFilterButton tableName={tableName} />
      <LoadFilterButton tableName={tableName} />
      <FilterButton columns={columns} data={data} />
    </React.Fragment>
  );
}
