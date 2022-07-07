import React, { useState, useEffect } from "react";
import "../App.css";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PostValidationCheck() {
  const location = useLocation();

  const userID = location.state.userID;
  const columns = location.state.columns;
  const selectedData = location.state.selectedData;

  useEffect(() => {
    console.log("Current Page: Post Validation Check Page");
    console.log(location);
  });

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 30,
        }}
      >
        <Link className="Link" to="/DataTable2" state={{ userID: userID }}>
          <Button>Back</Button>
        </Link>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: amber[800], height: 35, width: 35 }}>{userID}</Avatar>
          <label style={{ marginLeft: 5, fontFamily: "Roboto-Regular" }}>User {userID}</label>
        </div>
      </div>
      <MUIDataTable
        title={"Selected Rows"}
        data={selectedData}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
}
