const isIsoDate = (dateStr) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateStr)) return false;
  var d = new Date(dateStr);
  return d.toISOString() === dateStr;
};

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
