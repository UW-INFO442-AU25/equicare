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
          <Link to="/resources">
            <button class="orange-button"><h3>Resources</h3></button>
          </Link>
        </div>
      </nav>

      <main>
        {/* --- PROFILE CONTAINER --- */}
        <div id="profile-layout">
          {/* profile avatar + personal info */}
          <div class="profile-left">
            <img
              class="profile-avatar"
              src={`${import.meta.env.BASE_URL}female-profile.png`}
              alt="female profile avatar"
            />

            {/* Personal Info */}
            <div class="personal-info-text">
              <h2>Jane Doe</h2>
              <p>Seattle, WA</p>
            </div>

            <div class="edit-profile-under-info">
              <Link to="/EditProfile">
                <button class="orange-button connect-button">
                  <h3>Edit Profile</h3>
                </button>
              </Link>
            </div>
          </div>
          

          

          {/* Right side: pregnancy + partner info */}
          <div class="profile-right">
            <section class="profile-section">
              <h2>Pregnancy Info</h2>
              <div class="info-item">
                <h3>Pregnancy Term</h3>
                <p>Second Trimester (Week 18)</p>
              </div>
              <div class="info-item">
                <h3>Next Calendar Event</h3>
                <p>Doctor's Appointment - Nov 8, 10:30 AM</p>
              </div>
            </section>

            <section class="profile-section">
              <h2>Partner Info</h2>
              <div class="info-item">
                <h3>Partner</h3>
                <p>Not connected</p>
                <button class="orange-button connect-button"><h4>Connect Partner's Account</h4></button>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom buttons */}
        <Link class="quiz-button-div" to="/DateQuiz">
          <button class="quiz-button"><h3>Take the Quiz</h3></button>
        </Link>

        <div class="small-long-button-div">
          <button class="small-long-button" onClick={scrollToSection}><h3>Resources</h3></button>
        </div>

        <section ref={sectionRef}>
          <h2>Resources</h2>
        </section>
      </main>

      <footer>
        <p>
          <em>&copy; {new Date().getFullYear()} EquiCare</em>
        </p>
      </footer>
    </body>
  );
}

export default Profile;
