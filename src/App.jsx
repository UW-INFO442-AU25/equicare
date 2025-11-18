import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Listen for login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
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
        <div className="mainpage">
          <div className="main-content">
            <div className="brand-title">
              <h1 className="brand-name">EquiCare</h1>
            </div>
            <h2 className="main-headline">
              Navigating pregnancy and partnership, made simple.
            </h2>
            <div className="mission-card">
              <h3>Our Mission</h3>
              <p>
                Parenthood is a journey meant to be shared. From personalized date nights, shared calendars, to journal check-ins, EquiCare is here to help you and your partner communicate, grow, and care for each other through every stage of pregnancy and beyond.
                </p>
              </div>
              <Link to="/datequiz" className="quiz-button-div">
                <button className="quiz-button">Date Idea Generator</button>
              </Link>
            </div>
            <div className="bubble-bg bubble-left">
              <img src="./bubbles.png" alt="bubbles" className="bubbles-image" />
            </div>
            <div className="bubble-bg bubble-right">
              <img src="./bubbles.png" alt="bubbles" className="bubbles-image mirror" />
              </div>
          </div>
        </main>
      

      <footer id="home-footer">
        <p>
          <em>
            &copy; {new Date().getFullYear()} EquiCare
          </em>
        </p>
      </footer>
    </div>
  );
}

export default App;
