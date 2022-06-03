import React, { useEffect } from "react";
import "../App.css";
import DataTable from "./DataTable";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

import { Link } from "react-router-dom";

function Home() {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[800],
    "&:hover": {
      backgroundColor: amber[600],
    },
  }));

  useEffect(() => {
    console.log("Current Page: Home");
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <Link className="Link" to="/DataTable">
          <img src={require("../Images/CSIT.png")} width="60%" />
        </Link>
        <Link className="Link" to="/DataTable">
          <ColorButton variant="contained" size="small">
            Datatable
          </ColorButton>
        </Link>
        <Link className="Link" to="/DataTable2">
          <ColorButton variant="contained" size="small">
            Datatable 2
          </ColorButton>
        </Link>
      </div>
    </div>
  );
}

export default Home;
