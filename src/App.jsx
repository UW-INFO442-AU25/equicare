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
        <div id="home-details">
          <div id="home-text">
            <h1>Navigating pregnancy and partnership, made simple.</h1>
            <p>
              Parenthood is a journey meant to be shared.
              From personalized date nights, shared calendars, to journal check-ins,
              EquiCare is here to help you and your partner communicate, grow,
              and care for each other through every stage of pregnancy and beyond.
            </p>
          </div>
          <img src="./bubbles.png" alt="bubbles" />
        </div>
        <Link class="quiz-button-div" to="/DateQuiz">
          <button class="quiz-button"><h3>Take the Quiz</h3></button>
        </Link>

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
