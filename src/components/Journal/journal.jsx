import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import { Link } from "react-router-dom";
import { addJournalEntry } from "../../db.js";
import "../../App.css";

function Journal() {
  const [user, setUser] = useState(null);

  // Listen for login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const tagOptions = ["concern", "baby", "relationship"]; // preset tag choices
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeFilterTag, setActiveFilterTag] = useState(null);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  

  const [lastSaved, setLastSaved] = useState(null);

  const handleCancel = () => {
    setNewEntry("");
    setNewTitle("");
  };

  // view opened entry
  const [activeIndex, setActiveIndex] = useState(null);




  // Load existing entries
  useEffect(() => {
    const saved = localStorage.getItem("journalEntries");
    const savedTime = localStorage.getItem("journalLastSaved");
    if (saved) setEntries(JSON.parse(saved));
    if (savedTime) setLastSaved(new Date(savedTime));
  }, []);



  // Save entries and timestamp to localStorage when entries change BUT NOT AFTER REFRESH
  // uncomment this useEffect out if want to restart recent entries, and comment again to save existing entries

  // useEffect(() => {
  //   localStorage.setItem("journalEntries", JSON.stringify(entries));
  //   if (lastSaved) {
  //     localStorage.setItem("journalLastSaved", lastSaved.toISOString());
  //   }
  // }, [entries, lastSaved]);



  useEffect(() => {
    const interval = setInterval(() => setLastSaved((prev) => prev), 60000);
    return () => clearInterval(interval);
  }, []);


  // handlesubmit version #2 that saves after refreshes
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEntry.trim() && !newTitle.trim()) return;

    const entry = {
      id: Date.now(),
      title: newTitle || "[ Untitled ]",
      text: newEntry,
      date: new Date().toLocaleString(),
      tags: selectedTags,
    };


    const updatedEntries = [entry, ...entries];

    setEntries(updatedEntries);
    setNewEntry("");
    setNewTitle("");

    // Save to localStorage here
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    const now = new Date();
    setLastSaved(now);
    localStorage.setItem("journalLastSaved", now.toISOString());
    setSelectedTags([]);
  };


  // different scenarios for updating save status through minutes
  const timeAgo = (date) => {
    if (!date) return "Never";
    const diffMs = new Date() - date;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };


  const openEntry = (index) => {
    setActiveIndex(index);
  };

  const closeEntry = () => {
    setActiveIndex(null);
  };

  const showNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev + 1) % entries.length);
  };

  const showPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => (prev - 1 + entries.length) % entries.length);
  };
  const filteredEntries =
    activeFilterTag ? entries.filter((e) => e.tags.includes(activeFilterTag)) : entries;


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

      {/* main journal content */}

      <main>
        <div className="journal-page-grid">

          {/* left side bar */}
          <aside className="journal-left">
            <h2> Personal Journal</h2>



            <h3 className="recent-title">Recent Entries</h3>
              <div className="filter-tags">
                {tagOptions.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilterTag(activeFilterTag === tag ? null : tag)}
                    className={`tag-button ${activeFilterTag === tag ? "selected" : ""}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>

            <div className="recent-entries">
              {filteredEntries.length > 0 ? (
                  filteredEntries.map((entry, i) => (
                  <div
                    key={entry.id}
                    className="recent-entry-card"
                    onClick={() => openEntry(i)}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="recent-date">{entry.date}</p>
                    <p className="recent-title-text">
                      <strong>
                        {/* takes first 50 characters in title, finds the last space within that part and cleanly cuts with "..." */}
                        {entry.title.length > 50
                          ? entry.title.slice(0, entry.title.slice(0, 50).lastIndexOf(" ")) + " ..."
                          : entry.title}
                      </strong>

                    </p>
                    <p className="recent-preview">
                      {/* takes first 70 characters in textbox, finds the last space within that part and cleanly cuts with "..." */}
                      {entry.text.length > 70
                        ? entry.text.slice(0, entry.text.slice(0, 70).lastIndexOf(" ") + 1 || 70) + "..."
                        : entry.text}
                    </p>

                    <div className="recent-tags">
                      {entry.tags && entry.tags.map((tag) => (
                        <span key={tag} className="tag-display">#{tag} </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No entries yet.</p>
              )}
            </div>
          </aside>

          {/* main editor section */}
          <section className="journal-main">
            <div className="journal-center-card">
              <div className="journal-top-row">
                <input
                  className="entry-title-input"
                  placeholder="[ Entry title ]"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                {/* displays date to user */}
                <p className="journal-date-display">
                  

                <div className="tag-options">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`tag-button ${selectedTags.includes(tag) ? "selected" : ""}`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>

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
            </div>
          </section>

        </div>

        {/* {/* small section footer for journal to submit */}
        <div className="journal-bottom-bar">
          <p>
            {/* words count */}
            {newEntry.trim().split(/\s+/).filter(Boolean).length} words
          </p>

          {/* shows status of last changes */}
          <p>
            {newEntry.trim() || newTitle.trim()
              ? "Unsaved changes..."
              : `Last saved: ${lastSaved ? timeAgo(lastSaved) : "Never"}`}
          </p>

          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>

          <button
            type="button"
            className="save-entry-button"
            onClick={handleSubmit}
          >
            Save Entry
          </button>

        </div>


        {activeIndex !== null && (
          <div className="journal-modal-overlay">
            <div className="journal-modal" role="dialog" aria-modal="true" aria-labelledby="journalModalTitle">
              <h2 id="journalModalTitle">Journal Entry</h2>

              <p className="journal-modal-title">
                <strong>{entries[activeIndex].title}</strong>
              </p>

              <p><em>{entries[activeIndex].date}</em></p>
              <div className="modal-tags">
                {entries[activeIndex].tags &&
                  entries[activeIndex].tags.map((tag) => (
                    <span key={tag} className="tag-display">#{tag}</span>
                  ))}
              </div>
              <p>{entries[activeIndex].text}</p>

              <div className="journal-modal-controls">
                <button onClick={showPrev}>Previous</button>
                <button onClick={closeEntry}>Close</button>
                <button onClick={showNext}>Next</button>
              </div>
            </div>
          </div>
        )}
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
