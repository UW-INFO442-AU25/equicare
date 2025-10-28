// import { useState } from 'react'
import { Link } from "react-router-dom";
import "./App.css";

function App() {
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
          <Link to="/Calendar">
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
