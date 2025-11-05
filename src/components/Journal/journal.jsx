import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addJournalEntry } from "../../db.js";
import "../../App.css";

function Journal() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  // Load existing entries
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
      date: new Date().toLocaleString(),
    };
    setEntries([entry, ...entries]);
    setNewEntry("");
  };

  return (
    <div className="journal-container">

      {/* nav header*/}
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
            <button className="orange-button">
              <h3>Connect</h3>
            </button>
          </Link>

          <Link to="/EventCalendar">
            <button className="orange-button">
              <h3>Calendar</h3>
            </button>
          </Link>

          <Link to="/Journal">
            <button className="orange-button">
              <h3>Journal</h3>
            </button>
          </Link>

          <Link to="/Profile">
            <h3>Profile</h3>
          </Link>

          <Link to="/resources">
            <button className="orange-button">
              <h3>Resources</h3>
            </button>
          </Link>
        </div>
      </nav>

      {/* main journal content */}
   
      <main>
        <div className="journal-page-grid">

          {/* left side bar */}
          <aside className="journal-left">
            <h2>Daily Journal</h2>

            <h3>Calendar</h3>
            <div className="calendar-placeholder"> 
              {/* placeholder for calendar -— replace later w functionality */}
            </div>

            <h3 className="recent-title">Recent Entries</h3>

            <div className="recent-entries">
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <div key={entry.id} className="recent-entry-card">
                    <p className="recent-date">{entry.date}</p>
                    <p className="recent-preview">
                      {entry.text.length > 30
                        ? entry.text.slice(0, 30) + "..."
                        : entry.text}
                    </p>
                  </div>
                ))
              ) : (
                <p>No entries yet.</p>
              )}
            </div>
          </aside>

          {/* main editor section */}
          <section className="journal-main">
            <div className="journal-top-row">
              <input
                className="entry-title-input"
                placeholder="[ Entry title ]"
              />
              {/* displays date to user */}
              <p className="journal-date-display">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
              
            {/* area for user to type in */}
            <textarea
              className="entry-editor"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Start writing your thoughts ...">
            </textarea>

          </section>

        </div>

        {/* {/* small section footer for journal to submit */}
        <div className="journal-bottom-bar">
          <p>
            {/* words count */}
            {newEntry.trim().split(/\s+/).filter(Boolean).length} words
          </p>
          
          {/* text placeholder -- later add functionality */}
          <p>Last saved: 2 hours ago</p> 

          <label className="share-calendar">
            <input type="checkbox"/>
            Share in calendar!
          </label>

          <button className="cancel-button">Cancel</button>

          <button
            type="button"
            className="save-entry-button"
            onClick={handleSubmit}
          >
            Save Entry
          </button>
        </div>
      </main>

      {/*  footer */}
      <footer>
        <p>
          <em>
            &copy; {new Date().getFullYear()} EquiCare
          </em>
        </p>
      </footer>
    </div>
  );
}

export default Journal;