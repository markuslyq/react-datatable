import areArraysEqual from "../../../../../HelperFunctions/areArraysEqual";

const processFilter = (dataToFilter, filterObj) => {
  let column = filterObj.column;
  let condition = filterObj.condition;
  let filterValue = filterObj.value;
  let columnSplit = column.split(".");
  switch (condition) {
    case "EQUAL":
      /*
      filterValue datatype: Array
      For each data row, return true if value of the selected column is EQUALs to one of that in the filterValue array.
      Get those row which returns true.

      filterValue datatype: Number
      For each data row, return true if value of the selected column is EQUALs to that of filterValue.
      Get those row which returns true.
      */
      if (Array.isArray(filterValue)) {
        let filteredData = dataToFilter.filter((dataRow) => {
          return filterValue.includes(dataRow[column].toString());
        });
        return filteredData;
      } else {
        return dataToFilter.filter((dataRow) => {
          return dataRow[column] == filterValue;
        });
      }
    case "NOT EQUAL":
      /*
      filterValue datatype: Array
      For each data row, return true if value of the selected column is NOT EQUALs to one of that in the filterValue array.
      Get those row which returns true.
      */
      if (Array.isArray(filterValue)) {
        let filteredData = dataToFilter.filter((dataRow) => {
          return !filterValue.includes(dataRow[column].toString());
        });
        return filteredData;
      } else {
        return dataToFilter.filter((dataRow) => {
          return dataRow[column] != filterValue;
        });
      }
    case "CONTAIN":
      /*
      filterValue datatype: Array
      Value of the selected column (dataRow[column]) datatype: Array || string
      For each data row, return true if value of the selected column CONTAINs one of the value in the filterValue array.
      (i.e. 'Markus' contains 'M' or 'Mark')
      Get those row which returns true.
      */
      return dataToFilter.filter((dataRow) => {
        if (columnSplit.length === 2) {
          return filterValue.some((val) => {
            return dataRow[columnSplit[0]][columnSplit[1]].some((variable) =>
              variable.includes(val)
            );
          });
        }
        if (Array.isArray(dataRow[column])) {
          return filterValue.some((val) => {
            return dataRow[column].some((variable) => variable.includes(val));
          });
          // return dataRow[column].some((val) => {
          //   return filterValue.includes(val);
          // });
        }
        return filterValue.some((val) => dataRow[column].toString().includes(val));
      });
    case "AFTER": //filterValue datatype is a date object
      return dataToFilter.filter((dataRow) => {
        return dataRow[column] > filterValue;
      });
    case "BEFORE": //filterValue datatype is a date object
      return dataToFilter.filter((dataRow) => {
        return dataRow[column] < filterValue;
      });
    case "BETWEEN": //filterValue datatype is an object of 2 date objects - filterStartDate and filterEndDate
      return dataToFilter.filter((dataRow) => {
        return (
          dataRow[column] > filterValue.filterStartDate &&
          dataRow[column] < filterValue.filterEndDate
        );
      });
    case "ISEMPTY": //no filterValue
      return dataToFilter.filter((dataRow) => {
        return dataRow[column] == "--";
      });
      break;
    case "LESS THAN": //filterValue datatype is a number
      return dataToFilter.filter((dataRow) => {
        return dataRow[column] < filterValue;
      });
    case "MORE THAN": //filterValue datatype is a number
      return dataToFilter.filter((dataRow) => {
        return dataRow[column] > filterValue;
      });
    case "IN LIST":
      /*
      filterValue datatype: Array
      Value of the selected column (dataRow[column]) datatype: Array
      For each data row, returns true if either one of the values in dataRow[column] exists in the filterValue array.
      */
      return dataToFilter.filter((dataRow) => {
        if (columnSplit.length === 2) {
          return dataRow[columnSplit[0]][columnSplit[1]].every((val) => {
            return filterValue.includes(val);
          });
        }
        return dataRow[column].every((val) => {
          return filterValue.includes(val);
        });
      });
    case "NOT IN LIST":
      /*
      filterValue datatype: Array
      Value of the selected column (dataRow[column]) datatype: Array
      For each data row, returns false if either one of the values in dataRow[column] exist in the filterValue array.
      */
      return dataToFilter.filter((dataRow) => {
        let isNotInList = true;
        if (columnSplit.length === 2) {
          dataRow[columnSplit[0]][columnSplit[1]].forEach((val) => {
            if (filterValue.includes(val)) {
              isNotInList = false;
            }
          });
        } else {
          dataRow[column].forEach((val) => {
            if (filterValue.includes(val)) {
              isNotInList = false;
            }
          });
        }
        return isNotInList;
      });
    case "LIST NOT EQUAL":
      /* 
      filterValue dataType: Array
      Returns true if the list is not a direct match to the entered variables.
      */
      let variable = [];
      return dataToFilter.filter((dataRow) => {
        if (columnSplit.length === 2) {
          variable = dataRow[columnSplit[0]][columnSplit[1]];
        } else {
          variable = dataRow[column];
        }
        return !areArraysEqual(variable, filterValue);
      });
    default:
      return [];
  }
};

export default processFilter;
