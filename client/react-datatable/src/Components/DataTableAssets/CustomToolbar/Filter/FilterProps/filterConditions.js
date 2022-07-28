const filterConditions = [
  {
    dataType: "id",
    conditionOptions: ["EQUAL"],
    renderOptions: ["numOnlyMultiEntry"],
  },
  {
    dataType: "string",
    conditionOptions: ["EQUAL", "NOT EQUAL", "CONTAIN"],
    renderOptions: ["multiEntry", "multiEntry", "multiEntryFreeSolo"],
  },
  {
    dataType: "longString",
    conditionOptions: ["EQUAL", "NOT EQUAL", "CONTAIN"],
    renderOptions: ["multiEntry", "multiEntry", "multiEntryFreeSolo"],
  },
  {
    dataType: "date",
    conditionOptions: ["AFTER", "BEFORE", "BETWEEN", "ISEMPTY"],
    renderOptions: ["datePicker", "datePicker", "twoDatePicker", "empty"],
  },
  {
    dataType: "number",
    conditionOptions: ["EQUAL", "LESS THAN", "MORE THAN"],
    renderOptions: ["numOnlyMultiEntry", "numOnlyTextBox", "numOnlyTextBox"],
  },
  {
    dataType: "array",
    conditionOptions: ["IN LIST", "NOT IN LIST", "LIST NOT EQUAL", "CONTAIN"],
    renderOptions: ["multiEntry", "multiEntry", "multiEntry", "multiEntryFreeSolo"],
  },
  {
    dataType: "group",
    conditionOptions: ["IN LIST", "NOT IN LIST", "LIST NOT EQUAL", "CONTAIN"],
    renderOptions: ["multiEntry", "multiEntry", "multiEntry", "multiEntryFreeSolo"],
  },
];

export default filterConditions;
