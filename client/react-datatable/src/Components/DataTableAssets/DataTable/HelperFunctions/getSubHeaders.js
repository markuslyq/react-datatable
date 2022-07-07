const capitalizeFirstLetter = (str) => {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
};

const getSubHeaders = (dataToProcess, key) => {
  let subHeaderObj = dataToProcess[0][key];
  let subHeaders = [];
  for (let key in subHeaderObj) {
    key = capitalizeFirstLetter(key);
    subHeaders.push(key);
  }
  subHeaders = subHeaders.sort();
  return subHeaders;
};

const addSubHeaders = (cols, dataToProcess) => {
  for (let i = 0; i < cols.length; i++) {
    if (cols[i]["dataType"] === "group") {
      cols[i]["subHeaders"] = getSubHeaders(dataToProcess, cols[i].name);
    }
  }
  return cols;
};

export default addSubHeaders;
