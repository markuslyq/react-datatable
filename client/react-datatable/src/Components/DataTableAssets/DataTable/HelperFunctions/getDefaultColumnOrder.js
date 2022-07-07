const getDefaultColumnOrder = (columnDetails) => {
  let colOrderArr = [];
  // if (columns !== null) {
  for (let i = 0; i < columnDetails.length; i++) {
    colOrderArr.push(i);
    // }
  }
  return colOrderArr;
};

export default getDefaultColumnOrder