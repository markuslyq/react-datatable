const isIsoDate = (dateStr) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateStr)) return false;
  var d = new Date(dateStr);
  return d.toISOString() === dateStr;
};

export default isIsoDate;