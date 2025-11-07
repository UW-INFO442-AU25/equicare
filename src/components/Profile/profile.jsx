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

  const [partnerData, setPartnerData] = useState({
    partnerName: "", // later this will come from the connected partner’s account
  });

    const [isEditingPartner, setIsEditingPartner] = useState(false);
    const [relationshipData, setRelationshipData] = useState({
    relationshipStatus: "",
    anniversaryDate: "",
    notes: "",
  });

  // Load from localStorage (temporary for static setup)
  useEffect(() => {
    const savedRelationship = localStorage.getItem("relationshipData");
    if (savedRelationship) setRelationshipData(JSON.parse(savedRelationship));
  }, []);

  const handleRelationshipChange = (e) => {
    const { name, value } = e.target;
    setRelationshipData((prev) => ({ ...prev, [name]: value }));
  };

  const saveRelationship = () => {
    localStorage.setItem("relationshipData", JSON.stringify(relationshipData));
    setIsEditingPartner(false);
  };

  const cancelRelationshipEdit = () => {
    const saved = localStorage.getItem("relationshipData");
    if (saved) setRelationshipData(JSON.parse(saved));
    setIsEditingPartner(false);
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
                <div className="info-item">
                  <h3>Partner</h3>
                  <p>{partnerData.partnerName || "Not connected"}</p>
                  <button className="orange-button connect-button">
                    <h4>Connect Partner's Account</h4>
                  </button>
                </div>

              {isEditingPartner ? (
                <div className="info-item">
                  <label>
                    Relationship Status:
                    <select
                      name="relationshipStatus"
                      value={relationshipData.relationshipStatus}
                      onChange={handleRelationshipChange}
                      className="edit-input"
                    >
                      <option value="">Select...</option>
                      <option value="Dating">Dating</option>
                      <option value="Engaged">Engaged</option>
                      <option value="Married">Married</option>
                      <option value="It's complicated">It's complicated</option>
                    </select>
                  </label>

                  <label>
                    Anniversary Date:
                    <input
                      type="date"
                      name="anniversaryDate"
                      value={relationshipData.anniversaryDate}
                      onChange={handleRelationshipChange}
                      className="edit-input"
                    />
                  </label>

                  <label>
                    Shared Notes:
                    <textarea
                      name="notes"
                      value={relationshipData.notes}
                      onChange={handleRelationshipChange}
                      className="edit-input"
                      placeholder="Add a message, memory, or shared goal..."
                    />
                  </label>

                  <div className="edit-buttons">
                    <button className="orange-button" onClick={saveRelationship}>
                      Save
                    </button>
                    <button className="orange-button" onClick={cancelRelationshipEdit}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="info-item">
                  <p><strong>Relationship:</strong> {relationshipData.relationshipStatus || "Not set"}</p>
                  <p><strong>Anniversary:</strong> {relationshipData.anniversaryDate || "Not added"}</p>
                  <p><strong>Notes:</strong> {relationshipData.notes || "No notes yet"}</p>

                  <button
                    className="orange-button connect-button"
                    onClick={() => setIsEditingPartner(true)}
                  >
                    Edit Relationship Info
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
