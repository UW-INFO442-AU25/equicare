import React, { useState } from 'react';
import { Link } from "react-router-dom";
/* uses react-calendar template */
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addCalendarEvent } from "../../db.js";
import "../../App.css";

function EventCalendar() {
  const [date, setDate] = useState(new Date());
  return (
    <body>
      <nav>
        <div class="brand active">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="baby in heart with hands" />
          <Link to="/">
            <h1>EquiCare</h1>
          </Link>
        </div>

        <div class="right-nav">
          <Link to="/DateQuiz">
            <button class="orange-button"><h3>Date Idea Generator</h3></button>
          </Link>
          <Link to="/EventCalendar">
            <button class="orange-button"><h3>Calendar</h3></button>
          </Link>
          <Link to="/Journal">
            <button class="orange-button"><h3>Journal</h3></button>
          </Link>
          <Link to="/Profile">
            <button class="orange-button"><h3>Profile</h3></button>
          </Link>
          <Link to="/resources">
            <button class="orange-button"><h3>Resources</h3></button>
          </Link>
        </div>
      </nav>

      <main>
        <div class="calendar">
          {/* TODO: add functionality, styling */}
          <div class="calendar-container">
            <Calendar onChange={setDate} value={date} />
            <p class="text-center">
              <strong>Selected Date:</strong> {date.toDateString()}
            </p>
          </div>
          <div class="event-container">
            <form class="event-form">
              <h1>Add Event</h1>

              <label for="title">Event Name</label>
              <input type="text" name="title" placeholder="e.g. Doctor's appointment" required />

              <label for="event-date">Event Date</label>
              <input type="date" name="event-date" placeholder='Select event date' required />

              <label for="image-upload">Add Image</label>
              <input type="file" name="image-upload" accept="image/*"/>

              <button type="submit">
                Add Event to Calendar
              </button>
            </form>
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

export default EventCalendar;