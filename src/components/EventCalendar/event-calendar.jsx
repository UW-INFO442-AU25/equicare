/* Resources:
how to upload and image (perplexity search) - https://www.geeksforgeeks.org/reactjs/how-to-upload-image-and-preview-it-using-reactjs/
how to preview files in react (perplexity search) - https://blog.logrocket.com/using-filereader-api-preview-images-react/
*/

import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../App.css";

function EventCalendar() {
  const [user, setUser] = useState(null);

  // Listen for login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [eventImageURL, setEventImageURL] = useState("");

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

  function handleAddEvent(e) {
    e.preventDefault();
    if (!eventTitle || !eventDate) return;
    setEvents([
      ...events,
      {
        title: eventTitle,
        date: eventDate,
        imageURL: eventImageURL,
      }
    ]);
    setEventTitle("");
    setEventDate("");
    setEventImage(null);
    setEventImageURL("");
  }

  const selectedDateString = selectedDate.toISOString().split("T")[0];
  const todaysEvents = events.filter(ev => ev.date === selectedDateString);

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
