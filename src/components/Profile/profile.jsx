import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

function Profile() {
  const sectionRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(profileData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) setProfileData(JSON.parse(savedData));
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      {/* NAVBAR */}
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

      {/* MAIN CONTENT */}
      <main>
        <div id="profile-layout">
          {/* LEFT */}
          <div className="profile-left">
            <img
              className="profile-avatar"
              src={`${import.meta.env.BASE_URL}female-profile.png`}
              alt="female profile avatar"
            />
            {isEditing ? (
              <div className="personal-info-text">
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="edit-input"
                />
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  className="edit-input"
                />
                <div className="edit-buttons">
                  <button className="orange-button" onClick={handleSave}>
                    Save
                  </button>
                  <button className="orange-button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="personal-info-text">
                <h2>{profileData.name}</h2>
                <p>{profileData.location}</p>
                <button
                  className="orange-button connect-button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="profile-right">
            <section className="profile-section">
              <h2>Pregnancy Info</h2>
              {isEditing ? (
                <>
                  <div className="info-item">
                    <h3>Pregnancy Term</h3>
                    <input
                      type="text"
                      name="term"
                      value={profileData.term}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-item">
                    <h3>Next Calendar Event</h3>
                    <input
                      type="text"
                      name="nextEvent"
                      value={profileData.nextEvent}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="info-item">
                    <h3>Pregnancy Term</h3>
                    <p>{profileData.term}</p>
                  </div>
                  <div className="info-item">
                    <h3>Next Calendar Event</h3>
                    <p>{profileData.nextEvent}</p>
                  </div>
                </>
              )}
            </section>

            <section className="profile-section">
              <h2>Partner Info</h2>
              {isEditing ? (
                <div className="info-item">
                  <h3>Partner</h3>
                  <input
                    type="text"
                    name="partner"
                    value={profileData.partner}
                    onChange={handleChange}
                    className="edit-input"
                  />
                </div>
              ) : (
                <div className="info-item">
                  <h3>Partner</h3>
                  <p>{profileData.partner || "Not connected"}</p>
                  <button className="orange-button connect-button">
                    Connect Partner's Account
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer>
        <p><em>&copy; {new Date().getFullYear()} EquiCare</em></p>
      </footer>
    </div>
  );
}

export default Profile;
