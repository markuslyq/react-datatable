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
TableOptions takes an `options` object and 4 other callback functions.

#### ·options·


