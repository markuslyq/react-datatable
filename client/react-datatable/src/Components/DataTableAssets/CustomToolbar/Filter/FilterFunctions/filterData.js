import processFilter from "./processFilter";

const filterData = (newFilterObjArr, data) => {
  let filteredData = data;
  newFilterObjArr.forEach((filterObj) => {
    filteredData = processFilter(filteredData, filterObj);
  });
  let formattedFilteredData = [];
  filteredData.forEach((individualData) => {
    formattedFilteredData.push(individualData);
  });
  return formattedFilteredData;
};

export default filterData;
