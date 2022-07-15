import isIsoDate from "../../../../HelperFunctions/isIsoDate";

const processDateObj = (dataToProcess) => {
  for (let i = 0; i < dataToProcess.length; i++) {
    for (let key in dataToProcess[i]) {
      if (isIsoDate(dataToProcess[i][key])) {
        let newDate = new Date(dataToProcess[i][key]);
        dataToProcess[i][key] = newDate;
      }
    }
  }
  return dataToProcess;
};

export default processDateObj;
