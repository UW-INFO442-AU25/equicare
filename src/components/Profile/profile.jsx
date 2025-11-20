import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../../firebase.js";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import ConnectPartnerModal from "./ConnectPartnerModal"; // modal under profile folder

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "Jane Doe",
    location: "Seattle, WA",
    term: "Second Trimester (Week 18)",
    nextEvent: "Doctor's Appointment - Nov 8, 10:30 AM",
    partner: "Not connected",
  });

  const [relationshipData, setRelationshipData] = useState({
    relationshipStatus: "",
    anniversaryDate: "",
    notes: "",
  });

  const [partnerData, setPartnerData] = useState({ partnerName: "" });
  const [partnerInvites, setPartnerInvites] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPartner, setIsEditingPartner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Listen for login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Load user data from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfileData(data.profileData || profileData);
          setRelationshipData(data.relationshipData || relationshipData);
          setPartnerInvites(data.partnerInvites || []);
        }
      }
    });

    return () => unsubscribe();
  }, []);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Profile input handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateDoc(doc(db, "users", user.uid), { profileData });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile data:", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Relationship handlers
  const handleRelationshipChange = (e) => {
    const { name, value } = e.target;
    setRelationshipData((prev) => ({ ...prev, [name]: value }));
  };

  const saveRelationship = async () => {
    if (!user) return;

    try {
      await updateDoc(doc(db, "users", user.uid), { relationshipData });
      setIsEditingPartner(false);
    } catch (err) {
      console.error("Error saving relationship data:", err);
    }
  };

  const cancelRelationshipEdit = () => {
    setIsEditingPartner(false);
  };

  // Partner invites
  const handlePartnerConnect = async (email) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, "users", user.uid), {
        partnerInvites: arrayUnion(email),
      });
      setPartnerInvites((prev) => [...prev, email]);
    } catch (err) {
      console.error("Error sending partner invite:", err);
    }
  };

  const handleCancelInvite = (index) => {
    const updated = partnerInvites.filter((_, i) => i !== index);
    setPartnerInvites(updated);
  };

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
        <div id="profile-layout">
          <div className="profile-left">
            <img
              className="profile-avatar"
              src={`${import.meta.env.BASE_URL}female-profile.png`}
              alt="female profile avatar"
            />
            {isEditing ? (
              <div className="personal-info-text">
                <input type="text" name="name" value={profileData.name} onChange={handleChange} className="edit-input" />
                <input type="text" name="location" value={profileData.location} onChange={handleChange} className="edit-input" />
                <div className="edit-buttons">
                  <button className="orange-button" onClick={handleSave}>Save</button>
                  <button className="orange-button" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="personal-info-text">
                <h2>{profileData.name}</h2>
                <p>{profileData.location}</p>
                <button className="orange-button connect-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
              </div>
            )}

            <section className="profile-section" style={{ marginTop: "1.5rem", minHeight: "120px", padding: "2rem", width: "100%", boxSizing: "border-box" }}>
              <h2>Notifications</h2>
              <div className="info-item">
                <p>No notifications yet.</p>
              </div>
            </section>

            <button className="orange-button" onClick={handleLogout}>Log Out</button>
          </div>

          <div className="profile-right">
            <section className="profile-section">
              <h2>Pregnancy Info</h2>
              {isEditing ? (
                <>
                  <div className="info-item">
                    <p><strong>Pregnancy Term</strong></p>
                    <input type="text" name="term" value={profileData.term} onChange={handleChange} className="edit-input" />
                  </div>
                  <div className="info-item">
                    <p><strong>Next Calendar Event</strong></p>
                    <input type="text" name="nextEvent" value={profileData.nextEvent} onChange={handleChange} className="edit-input" />
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
                <p><strong>Partner</strong></p>
                <p>{partnerData.partnerName || "Not connected"}</p>
                <button className="orange-button connect-button" onClick={() => setShowModal(true)}>Connect Partner’s Account</button>
              </div>

              {partnerInvites.length > 0 && (
                <div className="info-item">
                  <p><strong>Pending Invites</strong></p>
                  <ul>
                    {partnerInvites.map((email, index) => (
                      <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem", gap: "0.5rem" }}>
                        <span><p>{email}</p></span>
                        <button className="orange-button" onClick={() => handleCancelInvite(index)}>Cancel</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isEditingPartner ? (
                <div className="info-item">
                  <label>
                    Relationship Status:
                    <select name="relationshipStatus" value={relationshipData.relationshipStatus} onChange={handleRelationshipChange} className="edit-input">
                      <option value="">Select...</option>
                      <option value="Dating">Dating</option>
                      <option value="Engaged">Engaged</option>
                      <option value="Married">Married</option>
                      <option value="It's complicated">It's complicated</option>
                    </select>
                  </label>

                  <label>
                    Anniversary Date:
                    <input type="date" name="anniversaryDate" value={relationshipData.anniversaryDate} onChange={handleRelationshipChange} className="edit-input" />
                  </label>

                  <label>
                    Shared Notes:
                    <textarea name="notes" value={relationshipData.notes} onChange={handleRelationshipChange} className="edit-input" placeholder="Add a message, memory, or shared goal..." />
                  </label>

                  <div className="edit-buttons">
                    <button className="orange-button" onClick={saveRelationship}>Save</button>
                    <button className="orange-button" onClick={cancelRelationshipEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="info-item">
                  <p><strong>Relationship:</strong> {relationshipData.relationshipStatus || "Not set"}</p>
                  <p><strong>Anniversary:</strong> {relationshipData.anniversaryDate || "Not added"}</p>
                  <p><strong>Notes:</strong> {relationshipData.notes || "No notes yet"}</p>
                  <button className="orange-button connect-button" onClick={() => setIsEditingPartner(true)}>Edit Relationship Info</button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {showModal && <ConnectPartnerModal onClose={() => setShowModal(false)} onPartnerConnect={handlePartnerConnect} />}

      <footer>
        <p><em>&copy; {new Date().getFullYear()} EquiCare</em></p>
      </footer>
    </div>
  );
}

export default Profile;
