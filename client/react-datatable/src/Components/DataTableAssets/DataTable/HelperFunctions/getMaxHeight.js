import isJSON from "../../../../HelperFunctions/isJSON";

const getMaxHeight = (dataRow) => {
  let maxHeight = 40;
  for (let key in dataRow) {
    if (typeof dataRow[key] === "object") {
      if (dataRow[key] !== ["--"]) {
        let height = 40;
        if (isJSON(dataRow[key])) {
          for (let subKey in dataRow[key]) {
            height = 10 + dataRow[key][subKey].length * 30;
          }
        } else {
          height = 10 + dataRow[key].length * 30;
        }
        if (height > maxHeight) {
          maxHeight = height;
        }
      }
    }
  }
  return maxHeight;
};

export default getMaxHeight;
