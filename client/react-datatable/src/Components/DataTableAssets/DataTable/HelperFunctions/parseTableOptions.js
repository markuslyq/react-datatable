import React from "react";
import CustomToolbar from "../../CustomToolbar/CustomToolbar";
import CustomToolbarSelect from "../../CustomToolbarSelect/CustomToolbarSelect";

export default function parseTableOptions(tableOptionsParams) {
  const parsedTableOptions = {
    ...tableOptionsParams.options,
    onColumnOrderChange: (newColumnOrder, columnIndex, newPosition) => {
      tableOptionsParams.setColumnOrder(newColumnOrder);
    },
    onChangeRowsPerPage: (numberOfRows) => {
      tableOptionsParams.setNumRowsPerPage(numberOfRows);
    },
  };

  if (tableOptionsParams.onViewColumnChange) {
    parsedTableOptions["onViewColumnChange"] = tableOptionsParams.onViewColumnChange;
  }

  if (tableOptionsParams.onColumnOrderChange) {
    parsedTableOptions["onColOrderChange"] = tableOptionsParams.onColumnOrderChange;
  }

  if (tableOptionsParams.onRowsPerPageChange) {
    parsedTableOptions["onRowsPerPageChange"] = tableOptionsParams.onRowsPerPageChange;
  }

  if (tableOptionsParams.onFilterSaveClick) {
    parsedTableOptions["onFilterSaveClick"] = tableOptionsParams.onFilterSaveClick;
  }

  if (tableOptionsParams.options.customToolbar) {
    parsedTableOptions["customToolbar"] = () => {
      return (
        <CustomToolbar
          columns={tableOptionsParams.columns}
          data={tableOptionsParams.data}
          columnOrder={tableOptionsParams.options.columnOrder}
          tableName={tableOptionsParams.tableName}
          numRowsPerPage={tableOptionsParams.options.rowsPerPage}
          setColumns={tableOptionsParams.setColumns}
        />
      );
    };
    parsedTableOptions["download"] = false;
    parsedTableOptions["filter"] = false;
    parsedTableOptions["print"] = false;
    parsedTableOptions["viewColumn"] = false;
  }

  if (tableOptionsParams.options.customToolbarSelect) {
    parsedTableOptions["customToolbarSelect"] = (selectedRows, displayData, setSelectedRows) => {
      let selectParams = {
        columns: tableOptionsParams.columns,
        selectedRows: selectedRows,
        data: tableOptionsParams.data,
        columnOrder: tableOptionsParams.options.columnOrder,
      };
      return <CustomToolbarSelect params={selectParams} setSelectedRows={setSelectedRows} />;
    };
  }

  return parsedTableOptions;
}
