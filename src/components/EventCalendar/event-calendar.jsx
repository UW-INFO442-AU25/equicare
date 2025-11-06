import React, { useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../App.css";

function EventCalendar() {
  // Selected date (from calendar)
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Events list
  const [events, setEvents] = useState([]);
  // Form fields
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [eventImageURL, setEventImageURL] = useState("");

  // Handle image preview
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
    // Event date comes from input, not calendar (for flexibility)
    if (!eventTitle || !eventDate) return;
    setEvents([
      ...events,
      {
        title: eventTitle,
        date: eventDate,
        imageURL: eventImageURL,
      }
    ]);
    // Reset form
    setEventTitle("");
    setEventDate("");
    setEventImage(null);
    setEventImageURL("");
  }

  // Show events for current calendar selection
  const selectedDateString = selectedDate.toISOString().split("T")[0];
  const todaysEvents = events.filter(ev => ev.date === selectedDateString);

  return (
    <div>
      <nav>
        <div className="brand active">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="baby in heart with hands" />
          <Link to="/"><h1>EquiCare</h1></Link>
        </div>
        <div className="right-nav">
          <Link to="/DateQuiz"><button className="orange-button"><h3>Date Idea Generator</h3></button></Link>
          <Link to="/EventCalendar"><button className="orange-button"><h3>Calendar</h3></button></Link>
          <Link to="/Journal"><button className="orange-button"><h3>Journal</h3></button></Link>
          <Link to="/Profile"><button className="orange-button"><h3>Profile</h3></button></Link>
          <Link to="/resources"><button className="orange-button"><h3>Resources</h3></button></Link>
        </div>
      </nav>
      <main>
        <div className="calendar" style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
          {/* Calendar left side */}
          <div className="calendar-container">
            <Calendar onChange={setSelectedDate} value={selectedDate} />
            <p className="text-center">
              <strong>Selected Date:</strong> {selectedDate.toDateString()}
            </p>
            {/* Events for selected date */}
            <div className="event-list">
              <h3>Events For This Date:</h3>
              {todaysEvents.length === 0 && <p>No events yet for this date.</p>}
              {todaysEvents.map((ev, idx) => (
                <div key={idx} className="event-list-item" style={{ marginBottom: "12px" }}>
                  {ev.imageURL && <img src={ev.imageURL} alt={ev.title} style={{ width: "50px", borderRadius: "6px", marginBottom: "6px" }} />}
                  <div><strong>{ev.title}</strong></div>
                </div>
              ))}
            </div>
          </div>
          {/* Event Form right side */}
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
              {eventImageURL && <img src={eventImageURL} alt="Preview" style={{ width: "60px", marginTop: "6px", borderRadius: "6px" }} />}
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
