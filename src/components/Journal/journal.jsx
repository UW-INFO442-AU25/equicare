import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

function Journal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  // Load entries on mount
  useEffect(() => {
    const saved = localStorage.getItem("journalEntries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // Save entries to localStorage when change
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEntry.trim()) return;
    const entry = {
      id: Date.now(),
      text: newEntry,
      date: new Date().toLocaleString()
    };
    setEntries([entry, ...entries]);
    setNewEntry("");
  };

  return (
    <body>
      <nav>
        <div class="brand active">
          <img src="../logo.svg" alt="baby in heart with hands"></img>
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
        <div class="journal-page">
          <div class="journal-text">
            <h1>My Journal</h1>
            <p>
              This is a space to write your personal thoughts and feelings!
              Your journal will not be shared with your partner.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              class="journal-box"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Write your thoughts here..."
              rows={5}
            />
            <button type="submit" class="orange-button"><h3>Save Entry</h3></button>
          </form>

          <div class="entry-list">
            {entries.map((entry) => (
              <div key={entry.id} className="journal-entry">
                <p><em>{entry.date}</em></p>
                <p>{entry.text}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
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

export default Journal;