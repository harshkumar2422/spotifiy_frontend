import React, { useState } from "react";
import "./styles/App.css";
import Main from "./components/Main";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Signup from "./components/Signup";

import CreateSong from "./components/createSong/createSong";
import Login from "./components/login/login";
const App = () => {
  const [posterId, setPosterId] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/createSong"
          element={<CreateSong/>}
        />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
