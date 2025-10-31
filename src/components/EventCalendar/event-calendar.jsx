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
          <Link to="/resources">
            <button class="orange-button"><h3>Resources</h3></button>
          </Link>
        </div>
      </nav>

      <main>
        {/* TODO: add functionality, styling */}
        <div class="calendar-container">
          <Calendar onChange={setDate} value={date} />
          <p class="text-center">
            <strong>Selected Date:</strong> {date.toDateString()}
          </p>
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