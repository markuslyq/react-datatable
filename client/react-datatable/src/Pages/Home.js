import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "../App.css";
import { Button, FormControl, InputLabel, Select, OutlinedInput } from "@mui/material/";
import { styled } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

import { setIsLoadingFromDB } from "../Components/DataTableAssets/DataTable/tableSlice";

import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  const [userID, setUserID] = useState(1);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[800],
    "&:hover": {
      backgroundColor: amber[600],
    },
  }));

  const handleUserChange = (event) => {
    setUserID(event.target.value);
  };

  const handleLogin = () => {
    dispatch(setIsLoadingFromDB(true));
  };

  useEffect(() => {
    console.log("Current Page: Home");
  });

  return (
    <div className="App">
      <div className="App-header">
        <Link className="Link" to="/Home">
          <img src={require("../Images/CSIT.png")} width="100%" />
        </Link>
        <div
          style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "20px" }}
        >
          <FormControl sx={{ m: 1, mr: 3, minWidth: 200 }}>
            <InputLabel>Select User</InputLabel>
            <Select
              native
              value={userID}
              onChange={handleUserChange}
              input={<OutlinedInput label="Select User" id="User Select" />}
            >
              <option value={1}>User 1</option>
              <option value={2}>User 2</option>
              <option value={3}>User 3</option>
            </Select>
          </FormControl>
          <Link className="Link" to="/DataTable2" state={{ userID: userID }} onClick={handleLogin}>
            <ColorButton variant="contained" size="medium">
              Login
            </ColorButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
