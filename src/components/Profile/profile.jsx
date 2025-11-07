import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

function Profile() {
  const sectionRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: "Jane Doe",
    location: "Seattle, WA",
    term: "Second Trimester (Week 18)",
    nextEvent: "Doctor's Appointment - Nov 8, 10:30 AM",
    partner: "Not connected",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) setProfileData(JSON.parse(savedData));
  }, []);

  function scrollToSection() {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="profile-page">
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
          <Link to="/DateQuiz">
            <button className="orange-button"><h3>Date Idea Generator</h3></button>
          </Link>
          <Link to="/EventCalendar">
            <button className="orange-button"><h3>Calendar</h3></button>
          </Link>
          <Link to="/Journal">
            <button className="orange-button"><h3>Journal</h3></button>
          </Link>
          <Link to="/Profile">
            <button className="orange-button"><h3>Profile</h3></button>
          </Link>
          <Link to="/resources">
            <button className="orange-button"><h3>Resources</h3></button>
          </Link>
        </div>
      </nav>

      <main>
        <div id="profile-layout">
          {/* Left: avatar + personal info */}
          <div className="profile-left">
            <img
              className="profile-avatar"
              src={`${import.meta.env.BASE_URL}female-profile.png`}
              alt="female profile avatar"
            />
            <div className="personal-info-text">
              <h1>{profileData.name}</h1>
              <h2>{profileData.location}</h2>
            </div>

            <div className="edit-profile-under-info">
              <Link to="/EditProfileForm">
                <button className="orange-button connect-button">
                  <h3>Edit Profile</h3>
                </button>
              </Link>
            </div>
          </div>

          {/* Right: pregnancy + partner info */}
          <div className="profile-right">
            <section className="profile-section">
              <h2>Pregnancy Info</h2>
              <div className="info-item">
                <h3>Pregnancy Term</h3>
                <p>{profileData.term}</p>
              </div>
              <div className="info-item">
                <h3>Next Calendar Event</h3>
                <p>{profileData.nextEvent}</p>
              </div>
            </section>

            <section className="profile-section">
              <h2>Partner Info</h2>
              <div className="info-item">
                <h3>Partner</h3>
                <p>{profileData.partner || "Not connected"}</p>
                <button className="orange-button connect-button">
                  <h4>Connect Partner's Account</h4>
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="quiz-button-div">
          <Link to="/DateQuiz">
            <button className="quiz-button"><h3>Take the Quiz</h3></button>
          </Link>
        </div>

        <div className="small-long-button-div">
          <button className="small-long-button" onClick={scrollToSection}><h3>Resources</h3></button>
        </div>

        <section ref={sectionRef}>
          <h2>Resources</h2>
        </section>
      </main>

      <footer>
        <p><em>&copy; {new Date().getFullYear()} EquiCare</em></p>
      </footer>
    </div>
  );
}

export default Profile;
