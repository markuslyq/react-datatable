const defaultTableColumn = [
  {
    name: "user_id",
    label: "User ID",
    dataType: "id",
    options: {
      display: false,
    },
  },
  {
    name: "name",
    label: "Name",
    dataType: "string",
    options: {
      display: true,
      sortThirdClickReset: true,
    },
  },
  {
    name: "phone",
    label: "Phone",
    dataType: "string",
    options: {
      display: true,
      sortThirdClickReset: true,
    },
  },
  {
    name: "email",
    label: "Email",
    dataType: "string",
    options: {
      display: true,
      sortThirdClickReset: true,
    },
  },
  {
    name: "start_date",
    label: "Start Date",
    dataType: "date",
    options: {
      display: true,
      sortThirdClickReset: true,
    },
  },
  {
    name: "end_date",
    label: "End Date",
    dataType: "date",
    options: {
      display: true,
      sortThirdClickReset: true,
    },
  },
  {
    name: "deadline",
    label: "Deadline",
    dataType: "date",
    options: {
      display: true,
      sortThirdClickReset: true,
    },
  },
  {
    name: "postal_code",
    label: "Postal Zip",
    dataType: "string",
    options: {
      display: true,
      sortThirdClickReset: true,
    },
  },
  {
    name: "country",
    label: "Country",
    dataType: "string",
    options: {
      display: true,
      sortThirdClickReset: true,
    },
  },
  {
    name: "age",
    label: "Age",
    dataType: "number",
    options: {
      display: true,
      sortThirdClickReset: true,
    },
  },
  {
    name: "cars",
    label: "Cars",
    dataType: "array",
    options: {
      display: true,
      sort: false,
    },
  },
  {
    name: "previous_company_info",
    label: "Previous Companies",
    subHeaders: ["Company", "Department", "Years"],
    dataType: "group",
    options: {
      display: true,
      sort: false,
    },
  },
  {
    name: "password",
    label: "Password",
    dataType: "string",
    options: {
      display: true,
      sortThirdClickReset: true,
    },
  },
  {
    name: "notes",
    label: "Notes",
    dataType: "longString",
    options: {
      display: true,
      sortThirdClickReset: true,
    },
  },
];

export default defaultTableColumn;