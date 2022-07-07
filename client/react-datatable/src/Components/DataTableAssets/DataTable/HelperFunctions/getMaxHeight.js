const getMaxHeight = (dataRow) => {
  let maxHeight = 40;
  for (let key in dataRow) {
    if (typeof dataRow[key] === "object") {
      if (dataRow[key] != null) {
        let height = 10 + dataRow[key].length * 30;
        if (height > maxHeight) {
          maxHeight = height;
        }
      }
    }
  }
  return maxHeight;
};

export default getMaxHeight;