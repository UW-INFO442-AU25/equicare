import React, { useState } from "react";
import "../../App.css";

function ConnectPartnerModal({ onClose, onPartnerConnect }) {
  const [partnerEmail, setPartnerEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!partnerEmail) return;

    // Add partner email
    onPartnerConnect(partnerEmail);

    // Clear input for next invite
    setPartnerEmail("");

    // Close modal
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Connect Partner Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="info-item">
            <label htmlFor="partnerEmail" className="modal-label">
              Partner’s Email Address
            </label>
            <input
              id="partnerEmail"
              type="email"
              className="edit-input"
              placeholder="Enter partner’s email..."
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              required
            />
          </div>

          <div className="edit-buttons">
            <button type="submit" className="orange-button">Send Invite</button>
            <button type="button" className="orange-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConnectPartnerModal;
