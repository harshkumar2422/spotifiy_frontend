import React from "react";
import Sidebar from "./Sidebar";
import "../styles/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Songs from "./Songs";
import { Link } from "react-router-dom";
const Main = () => {
  return (
    <>
      <div className="container">
        <div className="left">
          <Sidebar />
        </div>
        <div className="right"> 
          <div className="nav">
            <div className="icons">
              <FontAwesomeIcon className="bgcolor" icon={faAngleLeft} />
              <FontAwesomeIcon className="bgcolor" icon={faAngleRight} />
            </div>
            <div className="buttons bgcolor">
              <Link className="bgcolor" to={"/signup"}>
                <button className="bg1">SignUp</button>
              </Link>
              <Link className="bgcolor" to={"/login"}>
                <button className="bg">Login</button>
              </Link>
            </div>
          </div>
          <div className="all-songs">
            <Songs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
