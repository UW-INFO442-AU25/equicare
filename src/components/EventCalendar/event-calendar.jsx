/* Resources:
how to upload and image (perplexity search) - https://www.geeksforgeeks.org/reactjs/how-to-upload-image-and-preview-it-using-reactjs/
how to preview files in react (perplexity search) - https://blog.logrocket.com/using-filereader-api-preview-images-react/
*/

import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase.js";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../App.css";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { addCalendarEvent } from "../../db.js";

function EventCalendar() {
  const [user, setUser] = useState(null);
  const [linkedCalendar, setLinkedCalendar] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [eventImageURL, setEventImageURL] = useState("");
  const selectedDateString = selectedDate.toISOString().split("T")[0];
  const todaysEvents = events.filter(ev => ev.date === selectedDateString);

  // Listen for login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setLinkedCalendar(userSnap.data().linkedCalendar);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!linkedCalendar) return;

    const calendarRef = doc(db, "calendars", linkedCalendar);

    // Live listener — updates instantly for BOTH users
    const unsub = onSnapshot(calendarRef, (snapshot) => {
      if (snapshot.exists()) {
        setEvents(snapshot.data().events || []);
      }
    });

    return () => unsub();
  }, [linkedCalendar]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setEventImage(file);
      setEventImageURL(URL.createObjectURL(file));
    } else {
      setEventImage(null);
      setEventImageURL("");
    }
  }

  async function handleAddEvent(e) {
    e.preventDefault();
    if (!eventTitle || !eventDate || !linkedCalendar) return;

    const event = {
      title: eventTitle,
      date: eventDate,
      imageURL: eventImageURL,
      createdBy: user.email,
      timestamp: Date.now()
    };

    await addCalendarEvent(linkedCalendar, event);

    setEventTitle("");
    setEventDate("");
    setEventImage(null);
    setEventImageURL("");
  }

  return (
    <div>
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
        <div className="calendar">
          <div className="calendar-container">
            <Calendar onChange={setSelectedDate} value={selectedDate} />
            <p className="text-center">
              <strong>Selected Date:</strong> {selectedDate.toDateString()}
            </p>
            <div className="event-list">
              <h3>Events For This Date:</h3>
              {todaysEvents.length === 0 && <p>No events yet for this date.</p>}
              {todaysEvents.map((ev, idx) => (
                <div key={idx} className="event-list-item">
                  {ev.imageURL && <img src={ev.imageURL} alt={ev.title} />}
                  <div><strong>{ev.title}</strong></div>
                </div>
              ))}
            </div>
          </div>
          <div className="event-container">
            <form className="event-form" onSubmit={handleAddEvent}>
              <h1>Add Event</h1>
              <label>Event Name</label>
              <input
                type="text"
                value={eventTitle}
                onChange={e => setEventTitle(e.target.value)}
                placeholder="e.g. Doctor's appointment"
                required
              />
              <label>Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
                required
              />
              <label>Add Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {eventImageURL && <img src={eventImageURL} alt="Preview" />}
              <button type="submit">
                Add Event to Calendar
              </button>
            </form>

            <div className="calendar-description">
              <strong>How to use the Calendar:</strong><br />
              Use this calendar to keep track of important dates, milestones, and appointments. Select a date, enter a name, choose your event date, and (optionally) upload an image. Click "Add Event to Calendar" to save it. Your events for the selected day will appear in the calendar for quick reference!
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p>
          <em>&copy; {new Date().getFullYear()} EquiCare</em>
        </p>
      </footer>
    </div>
  );
}

export default EventCalendar;
