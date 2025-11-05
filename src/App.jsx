// import { useState } from 'react'
import { Link } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";


function App() {
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
        <div id="home-text">
          <h1>Navigating pregnancy and partnership, made simple.</h1>
          <p>
            Parenthood is a journey meant to be shared.
            From personalized date nights, shared calendars, to journal check-ins,
            EquiCare is here to help you and your partner communicate, grow,
            and care for each other through every stage of pregnancy and beyond.
          </p>
        </div>
        <Link class="quiz-button-div" to="/DateQuiz">
          <button class="quiz-button"><h3>Take the Quiz</h3></button>
        </Link>
        
      </main>

      <footer id="home-footer">
        <p>
          <em>
            &copy; {new Date().getFullYear()} EquiCare
          </em>
        </p>
      </footer>
    </body>
  );
}

export default App;
