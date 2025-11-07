import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

function EditProfileForm() {
  const navigate = useNavigate();

  // Load existing profile data from localStorage or set defaults
  const [profileData, setProfileData] = useState({
    fullName: "",
    location: "",
    pregnancyTerm: "",
    nextEvent: "",
    partner: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save changes
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("profileData", JSON.stringify(profileData));
    navigate("/Profile"); // return to profile page
  };

  return (
    <body>
      <nav>
        <div className="brand active">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="baby in heart with hands" />
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
        <div className="edit-form-container">
          <h1>Edit Your Profile</h1>

          <form onSubmit={handleSave} className="edit-form">
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </label>

            <label>
              Location:
              <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            </label>

            <label>
              Pregnancy Term:
              <input
                type="text"
                name="pregnancyTerm"
                value={profileData.pregnancyTerm}
                onChange={handleChange}
                placeholder="e.g., Second Trimester (Week 18)"
              />
            </label>

            <label>
              Next Calendar Event:
              <input
                type="text"
                name="nextEvent"
                value={profileData.nextEvent}
                onChange={handleChange}
                placeholder="e.g., Doctor’s Appointment - Nov 8, 10:30 AM"
              />
            </label>

            <label>
              Partner Name:
              <input
                type="text"
                name="partner"
                value={profileData.partner}
                onChange={handleChange}
                placeholder="Enter partner name (optional)"
              />
            </label>

            <div className="form-buttons">
              <button type="submit" className="orange-button">
                <h3>Save Changes</h3>
              </button>
              <Link to="/Profile">
                <button type="button" className="small-long-button">
                  <h3>Cancel</h3>
                </button>
              </Link>
            </div>
          </form>
        </div>
      </main>

      <footer>
        <p><em>&copy; {new Date().getFullYear()} EquiCare</em></p>
      </footer>
    </body>
  );
}

export default EditProfileForm;
