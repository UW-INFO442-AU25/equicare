import React from 'react';
import { Link } from "react-router-dom";
import { useRef } from "react";
import "../../App.css";

function Profile() {
  const sectionRef = useRef(null);

  function scrollToSection() {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  }

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
        </div>
      </nav>

      <main>
        <div id="profile-content">
          <img src={`${import.meta.env.BASE_URL}female-profile.png`} alt="female profile avatar" />
          <div class="progress-content">
            {/* TODO: trimester progress */}
            {/* TODO: next calendar event */}
          </div>
        </div>
        <Link class="quiz-button-div" to="/DateQuiz">
          <button class="quiz-button"><h3>Take the Quiz</h3></button>
        </Link>

        {/* scroll down to resources on button click*/}
        <div class="small-long-button-div">
          <button class="small-long-button" onClick={scrollToSection}><h3>Resources</h3></button>
        </div>

      <section ref={sectionRef}>
        <h2>Resources</h2>
      </section>

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

export default Profile;