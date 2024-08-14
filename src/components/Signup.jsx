import React, { useState } from "react";
import logo from "../logo.svg";
import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://spotify-backend-pq7x.onrender.com/api/v1/signup",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(typeof response.data.success); // Check type of success field
      if (response.data.success === true) { // Remove quotes around true
        navigate("/");
        console.log("navigation happened");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="header1">
        <Link className="" to={"/"}>
          <img className="img-width" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="container1">
        <div className="headline1">
          <h2>Signup to Start Listening </h2>
          <div className="login">
            <form onSubmit={handleSubmit}>
              <label>Email Or UserName</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                placeholder="Email or Usernmae"
              />

              <label>Password</label>
              <input
                type="Password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Next</button>
            </form>
          </div>
          <hr />
        </div>
        <div className="container2">
          <div className="with">
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              style={{ color: "#0667b2" }}
            />
            <h3>SignUp with facebook</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
