import React from "react";
import { useSelector } from "react-redux";
import RevertButton from "./Revert/RevertButton";
import SaveTableButton from "./Save/SaveTableButton";
import SaveFilterButton from "./Save/SaveFilterButton";
import FilterButton from "./Filter/FilterButton";
import LoadFilterButton from "./Load/LoadFilterButton";
import ViewColumnsButton from "./ViewColumns/ViewColumnsButton";
import OpenToolbarButton from "./ToolbarToggle/OpenToolbarButton";
import CloseToolbarButton from "./ToolbarToggle/CloseToolbarButton";

export default function CustomToolbar(props) {
  const isToolbarOpen = useSelector((state) => state.toolbar.isToolbarOpen);

  const columnOrder = props.columnOrder;
  const columns = props.columns;
  const data = props.data;
  const tableName = props.tableName;

  return (
    <React.Fragment>
      {isToolbarOpen ? (
        <React.Fragment>
          <ViewColumnsButton columns={columns} setColumns={props.setColumns} />
          <RevertButton />
          <SaveTableButton
            columnSettings={columns}
            columnOrder={columnOrder}
            tableName={tableName}
          />
          <SaveFilterButton tableName={tableName} />
          <LoadFilterButton tableName={tableName} />
          <FilterButton columns={columns} data={data} />
          <CloseToolbarButton />
        </React.Fragment>
      ) : (
        <OpenToolbarButton />
      )}
    </React.Fragment>
  );
}
