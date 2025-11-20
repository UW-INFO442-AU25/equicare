import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { saveUserProfile } from "../../db.js";
import "../../App.css";

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  // Listen for login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // for signup form
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  async function handleSignup() {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      await saveUserProfile(userCred.user);
      console.log("Account created successfully!");
      navigate("/");
    } catch (err) {
      setError("Could not sign up: " + err.message);
    }
  }

  async function handleLogin() {
    try {
      const userCred = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      await saveUserProfile(userCred.user);
      console.log("Logged in successfully:", loginEmail);
      navigate("/");
    } catch (err) {
      setError("Could not log in: " + err.message);
    }
  }

  return (
    <>
      <nav>
        <div className="brand active">
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="baby in heart with hands"
          />
          <Link to="/">
            <h1>EquiCare</h1>
          </Link>
        </div>

        <div className="right-nav">
          <Link to="/datequiz">
            <button className="orange-button"><h3>Date Idea Generator</h3></button>
          </Link>
          <Link to="/eventcalendar">
            <button className="orange-button"><h3>Calendar</h3></button>
          </Link>
          <Link to="/journal">
            <button className="orange-button"><h3>Journal</h3></button>
          </Link>
          <Link to="/resources">
            <button className="orange-button"><h3>Resources</h3></button>
          </Link>

          {/* Conditionally render Profile or Log In */}
          {user ? (
            <Link to="/profile">
              <button className="orange-button"><h3>Profile</h3></button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="orange-button"><h3>Log In</h3></button>
            </Link>
          )}
        </div>
      </nav>

      <main>
        <div id="signup-login">
          <div id="signup-box">
            <h1>Create an account</h1>

            <div className="signup-form">
              <label>Email</label>
              <input
                type="text"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="green-button"
                onClick={handleSignup}
              >
                <h3>Create Account</h3>
              </button>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>

          <div id="login-box">
            <h2>Have an account?</h2>
            <div className="login-form">
              <label>Email</label>
              <input
                type="text"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="blue-button"
                onClick={handleLogin}
              >
                <h3>Log In</h3>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
