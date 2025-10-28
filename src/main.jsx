import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import App from './App.jsx'
import Login from './components/Login/login.jsx'
import DateQuiz from './components/DateQuiz/date-quiz.jsx'
import Calendar from './components/Calendar/calendar.jsx'
import Journal from './components/Journal/journal.jsx'
import Profile from './components/Profile/profile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/datequiz" element={<DateQuiz />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </StrictMode>,
)
