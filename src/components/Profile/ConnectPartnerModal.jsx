import React, { useState } from "react";
import "../../App.css";

function ConnectPartnerModal({ onClose }) {
  const [partnerEmail, setPartnerEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Partner invite sent to ${partnerEmail}`);
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
            <button type="submit" className="orange-button">
              Send Invite
            </button>
            <button
              type="button"
              className="orange-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConnectPartnerModal;
