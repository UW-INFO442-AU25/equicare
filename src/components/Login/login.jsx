// import React from 'react';
import { Link } from "react-router-dom";
import { createUser, createCalendar } from "../../db.js";
import "../../App.css";

function Login() {
  return (
    <body>
      <div>
        <nav>
          <div class="brand active">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="baby in heart with hands" />
            <Link to="/">
              <h1>EquiCare</h1>
            </Link>
          </div>

          <div class="right-nav">
            <Link to="/DateQuiz">
              <button class="orange-button"><h3>Connect</h3></button>
            </Link>
            <Link to="/EventCalendar">
              <button class="orange-button"><h3>Calendar</h3></button>
            </Link>
            <Link to="/Journal">
              <button class="orange-button"><h3>Journal</h3></button>
            </Link>
            <Link to="/Profile">
              <h3>Profile</h3>
            </Link>
            <Link to="/resources">
              <button class="orange-button"><h3>Resources</h3></button>
            </Link>
          </div>
        </nav>
      </div>

      <main>
        <div id="signup-login">
          <div id="signup-box">
            <h1>Create an account</h1>

            <div class="signup-form">
              <label for="uname">Email</label>
              <input type="text" name="uname" required />

              <label for="psw">Password</label>
              <input type="password" name="psw" required />

              <button type="submit" class="green-button"><h3>Create Account</h3></button>
            </div>
          </div>
          <div id="login-box">
            <h2>Have an account?</h2>
            <button type="submit" class="blue-button"><h3>Log In</h3></button>
          </div>
        </div>
      </main>
    </body>
  );
};

export default Login;