import React from "react";
import logo from "../logo.svg";
import search from "../search.svg";
import home from "../home.svg";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div className="wrapper">
        <div className="home">
          <img className="img-width" src={logo} alt="logo" />
          <ul>
            <li>
              <img src={search} alt="Home" />
              Home
            </li>
            <li>
              <img src={home} alt="search" />
              Search
            </li>
          </ul>
        </div>
        <div className="library">
          <span>
            <h2>Your library</h2>
          </span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
