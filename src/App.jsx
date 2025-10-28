import { useState } from 'react'
import "./App.css";

function App() {
  return (
    <body>
      <nav>
        <div class="brand active"><a href="./App.jsx">
          <img src="../public/logo.svg" alt="baby in heart with hands"></img>
          <h1>Equicare</h1>
        </a></div>
        <div class="right-nav">
          <div class="orange-button"><a href="./components/DateQuiz/date-quiz.jsx">
            <h3>Connect</h3>
          </a></div>
          <div class="orange-button"><a href="./components/Calendar/calendar.jsx" target="_blank" rel="noopener">
            <h3>Calendar</h3>
          </a></div>
          <div class="orange-button"><a href="./components/Journal/journal.jsx" target="_blank" rel="noopener">
            <h3>Journal</h3>
          </a></div>
          <div><a href="./components/Profile/profile.jsx" target="_blank" rel="noopener">
            <h3>Profile</h3>
          </a></div>
        </div>
      </nav>

      <main>
        <div class="home-text">
          <h1>Navigating pregnancy and partnership, made simple.</h1>
          <p>
            Parenthood is a journey meant to be shared.
            From personalized date nights, shared calendars, to journal check-ins,
            EquiCare is here to help you and your partner communicate, grow,
            and care for each other through every stage of pregnancy and beyond.
          </p>
        </div>
        <button type="button" className="quiz-button">
          <span>Take the Quiz</span>
        </button>
      </main>

      <footer>
        <p>
          <em>&copy;
            <script type="text/javascript">document.write(new Date().getFullYear());</script> Equicare
          </em>
        </p>
      </footer>
    </body>
  );
}

export default App;
