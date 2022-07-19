const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const isArray = (stringToCheck) => {
  if (stringToCheck.startsWith("[") && stringToCheck.endsWith("]")) {
    return true;
  }
  return false;
};

const isJSON = (stringToCheck) => {
  if (stringToCheck.startsWith("{") && stringToCheck.endsWith("}")) {
    return true;
  }
  return false;
};

const processJSONObj = (obj) => {
  for (let key in obj) {
    let value = obj[key];
    if (value !== null) {
      for (let i = 0; i < value.length; i++) {
        let val = obj[key][i];
        if (val === null || val === "") {
          obj[key][i] = "--";
        }
      }
    } else {
      obj[key] = ["--"];
    }
  }
};

const processArray = (arr) => {
  arr.map((val) => {
    if (val === null || val === "") {
      val = "--";
    }
  });
};

const processData = (result) => {
  for (let i = 0; i < result.length; i++) {
    for (let key in result[i]) {
      let value = result[i][key];
      if (value !== null) {
        if (typeof result[i][key] === "string") {
          let str = result[i][key];
          if (str != null) {
            // Check if string is an array
            if (isArray(str)) {
              result[i][key] = JSON.parse(str);
              processArray(result[i][key]);
            } else if (isJSON(str)) {
              //Checks if string is an JSON object
              result[i][key] = JSON.parse(str);
              processJSONObj(result[i][key]);
            }
          }
        }
      } else {
        result[i][key] = ["--"];
      }
    }
  }
  return result;
};

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "sample",
});

app.post("/create", (req, res) => {});

app.put("/updateFilterSettings", (req, res) => {
  const user_id = req.body.userID;
  const table_name = req.body.tableName;
  const filter_settings = JSON.stringify(req.body.filterSettings);
  const queryArr = [user_id, table_name, filter_settings, filter_settings];

  const updateStatement = `
  INSERT INTO settings.filter_settings (user_id, table_name, filter_settings)
  VALUES (?, ?, ?)
  ON DUPLICATE KEY
  UPDATE filter_settings = ?`;

  db.query(updateStatement, queryArr, (err, result) => {
    if (!err) {
      res.send(result);
      console.log("Upsert filter settings successfully!");
    } else {
      console.log(err);
    }
  });
});

app.put("/updateColumnSettings", (req, res) => {
  const user_id = req.body.userID;
  const table_name = req.body.tableName;
  const column_order = JSON.stringify(req.body.columnOrder);
  const column_settings = JSON.stringify(req.body.columnSettings);
  const num_rows_per_page = req.body.numRowsPerPage;
  const queryArr = [
    user_id,
    table_name,
    column_order,
    column_settings,
    num_rows_per_page,
    column_order,
    column_settings,
    num_rows_per_page,
  ];

  const updateStatement = `
  INSERT INTO settings.table_settings (user_id, table_name, column_order, column_settings, num_rows_per_page)
  VALUES (?, ?, ?, ?, ?)
  ON DUPLICATE KEY
  UPDATE column_order = ?, column_settings = ?, num_rows_per_page = ?;`;

  db.query(updateStatement, queryArr, (err, result) => {
    if (!err) {
      res.send(result);
      console.log("Upsert table settings successfully!");
    } else {
      console.log(err);
    }
  });
});

app.get("/getFilterSettings", (req, res) => {
  console.log("getFilterSettings");
  const user_id = req.query.userID;
  const table_name = req.query.tableName;

  const getTableSettingsStatement = `SELECT filter_settings
    FROM settings.filter_settings 
    WHERE user_id = ? AND table_name = ?`;
  db.query(getTableSettingsStatement, [user_id, table_name], (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

app.get("/getTableSettings", (req, res) => {
  console.log("getTableSettings");
  const user_id = req.query.userID;
  const table_name = req.query.tableName;

  const getTableSettingsStatement = `SELECT * 
    FROM settings.table_settings 
    WHERE user_id = ? AND table_name = ?`;
  db.query(getTableSettingsStatement, [user_id, table_name], (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

app.get("/getData", (req, res) => {
  console.log("getData");
  const getDataStatement = `
    SELECT 
    user_id,
    name,
    phone,
    email,
    start_date,
    end_date,
    deadline,
    postal_code,
    country,
    age,
    password,
    notes,
    cars, 
    JSON_OBJECT('company', previous_company, 'department', department, 'years', years_stayed) AS previous_company_info
    FROM (
      SELECT 
          user.*,
          car.cars,
          previous_coy.previous_company,
          previous_coy.department,
          previous_coy.years_stayed
        FROM sample.user_info user
        LEFT JOIN (
          SELECT 
            user_id,
            JSON_ARRAYAGG(car) as cars
            FROM sample.car_info
            GROUP BY user_id
        ) car USING (user_id)
        LEFT JOIN (
          SELECT 
            user_id,
            JSON_ARRAYAGG(company) as previous_company,
            JSON_ARRAYAGG(department) as department,
            JSON_ARRAYAGG(years) as years_stayed
            FROM sample.company_info
            GROUP BY user_id
        ) previous_coy USING (user_id)      
    ) AS company`;
  db.query(getDataStatement, (err, result) => {
    if (!err) {
      let dataSet = processData(result);
      res.send(dataSet);
    } else {
      console.log(err);
    }
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
