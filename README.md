# React-Datatable

React-Datatable is a responsive datatables component built on [MUI-Datatables](https://github.com/gregnb/mui-datatables).  It comes with features like sorting, search, customisable layout (view/hide columns, draggable columns, changing number of rows per page), saving of customised layout, customised filtering, saving of filter settings, selectable rows and pagination.

## Usage

## API

### &lt;ReactDataTable />

The component accepts the following props:

|Name|Type|Description
|:--:|:-----|:-----|
|**`tableName.`**|array|Name of the table that will be display on the top left corner
|**`data`**|array|Data used to describe table. Must be either an array containing objects of key/value pairs with values that are strings or numbers, or arrays of strings or numbers (Ex: data: [{"Name": "Joe", "Job Title": "Plumber", "Age": 30}, {"Name": "Jane", "Job Title": "Electrician", "Age": 45}] or data: [["Joe", "Plumber", 30], ["Jane", "Electrician", 45]]). The **customBodyRender** and **customBodyRenderLite** options can be used to control the data display.
|**`columnDetails`**|array|Details used to describe table. Must be either an array of simple strings or objects describing a column.
|**`defaultColumnDetails`**|array|Default column details that will be reverted to upon clicking on the revert button. Similar to that of `columnDetails`, it must be either an array of simple strings or objects describing a column. 
|**`tableOptions`**|object|Options used to describe table

### TableOptions
TableOptions accepts an 'options' object and 4 other optional callback functions - `onViewColumnChange`, `onColumnOrderChange`, `onRowsPerPageChange` and `onFilterSaveClick`.

#### Options
It accepts all [options](https://github.com/gregnb/mui-datatables#options) that MUI-Datatables takes in and on top of that, accepts 2 more other options:  
|Name|Type|Default|Description
|:--:|:-----|:--|:-----|
|**`customToolbar`**|boolean|false|Enable/disable the customed toolbar, which includes customed filters, loading of filters, saving of table layout & filter settings, reverting to the default layout, view/hide columns and search.
|**`customToolbarSelect`**|boolean|false|Enable/disable the customed toolbar upon selection of rows, which includes deselecting all rows and a validation check.

#### Callback functions
|Name|Type|Default|Description
|:--:|:-----|:--|:-----|
|**`onViewColumnChange `**|function||Callback function that triggers when a column view has been changed. `function(newColumnDetails: object) => void``
|**`onColumnOrderChange `**|function||
|**`onRowsPerPageChange `**|function||Enable/disable case sensitivity for search.
|**`onFilterSaveClick `**|function||Enable/disable case sensitivity for search.

