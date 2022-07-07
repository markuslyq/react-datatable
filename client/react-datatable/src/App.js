import "./App.css";
import Home from "./Pages/Home";
import DataTable2 from "./Pages/DataTable2";
import PostValidationCheck from "./Pages/PostValidationCheck";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/DataTable2" element={<DataTable2 />} />
        <Route path="/PostValidationCheck" element={<PostValidationCheck />} />
      </Routes>
    </Router>
  );
}

export default App;
