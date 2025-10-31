import React from 'react';
import { Link } from "react-router-dom";
import "../../App.css";

function AboutQuiz() {
  return (
    <body>
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

      <main>
        <h1>About Quiz page is under construction!</h1>
      </main>

      <footer>
        <p>
          <em>
            &copy; {new Date().getFullYear()} EquiCare
          </em>
        </p>
      </footer>
    </body>
  );
};

export default AboutQuiz;