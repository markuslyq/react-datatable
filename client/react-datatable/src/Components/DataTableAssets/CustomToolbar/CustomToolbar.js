import React from "react";
import { useSelector } from "react-redux";
import RevertButton from "./Revert/RevertButton";
import SaveTableSettingsButton from "./Save/SaveTableSettingsButton";
import SaveFilterSettingsButton from "./Save/SaveFilterSettingsButton";
import FilterButton from "./Filter/FilterButton";
import LoadFilterSettingsButton from "./Load/LoadFilterSettingsButton";
import ViewColumnsButton from "./ViewColumns/ViewColumnsButton";
import OpenToolbarButton from "./ToolbarToggle/OpenToolbarButton";
import CloseToolbarButton from "./ToolbarToggle/CloseToolbarButton";

export default function CustomToolbar(props) {
  const isToolbarOpen = useSelector((state) => state.toolbar.isToolbarOpen);

  const columnOrder = props.columnOrder;
  const columns = props.columns;
  const data = props.data;
  const tableName = props.tableName;
  const numRowsPerPage = props.numRowsPerPage;

  return (
    <React.Fragment>
      {isToolbarOpen ? (
        <React.Fragment>
          <ViewColumnsButton columns={columns} setColumns={props.setColumns} />
          <RevertButton />
          <SaveTableSettingsButton
            columnSettings={columns}
            columnOrder={columnOrder}
            tableName={tableName}
            numRowsPerPage={numRowsPerPage}
          />
          <SaveFilterSettingsButton tableName={tableName} />
          <LoadFilterSettingsButton tableName={tableName} />
          <FilterButton columns={columns} data={data} />
          <CloseToolbarButton />
        </React.Fragment>
      ) : (
        <OpenToolbarButton />
      )}
    </React.Fragment>
  );
}
