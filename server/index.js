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
              result[i][key].map((val) => {
                if (val === null || val === "") {
                  val = "--";
                }
              });
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

app.get("/get", (req, res) => {
  console.log("get");
  db.query(
    `SELECT 
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
      ) AS company`,
    (err, result) => {
      if (!err) {
        dataSet = processData(result);
        res.send(dataSet);
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
