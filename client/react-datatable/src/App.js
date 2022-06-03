import "./App.css";
import DataTable from "./Pages/DataTable";
import DataTable2 from "./Pages/DataTable2"
import Home from "./Pages/Home";
import NavbarComp from "./Components/NavbarComp";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/DataTable" element={<DataTable />} />
        <Route path="/DataTable2" element={<DataTable2 />} />
      </Routes>
    </Router>
  );
}

export default App;
