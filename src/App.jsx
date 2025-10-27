import { useState } from 'react'
import reactLogo from './assets/react.svg'
import "./App.css";

function App() {
  return (
    <body>
      <nav>
        <div class="active"><a href="./App.jsx">
          <h1>Equicare</h1>
        </a></div>
        <div><a href="./public/profile.jsx">
          <h3>Connect</h3>
        </a></div>
        <div><a href="./public/profile.jsx" target="_blank" rel="noopener">
          <h3>Calendar</h3>
        </a></div>
        <div><a href="./public/profile.jsx" target="_blank" rel="noopener">
          <h3>Journal</h3>
        </a></div>
        <div><a href="./public/profile.jsx" target="_blank" rel="noopener">
          <h3>Profile</h3>
        </a></div>
      </nav>
      <main>
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
