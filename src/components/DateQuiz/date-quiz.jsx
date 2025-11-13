import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";
import { Link } from "react-router-dom";
import QuestionBank from "./question-bank.js";
import "../../App.css";

function DateQuiz() {
  const [user, setUser] = useState(null);

  // Listen for login/logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

  };

  const handleNext = () => {
    if (currentQuestion < QuestionBank.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    const joined = answers.join(" ").toLowerCase();

    if (
      joined.includes("tired") ||
      joined.includes("no/low energy") ||
      joined.includes("stay in") ||
      joined.includes("deep conversation")
    ) {
      return "The Cozy Companions";
    }

    if (
      joined.includes("romantic") ||
      joined.includes("quiet") ||
      joined.includes("affirmations") ||
      joined.includes("quality time")

    ) {
      return "The Dreamy Romantics";
    }

    if (
      joined.includes("fun") ||
      joined.includes("playful") ||
      joined.includes("laughter") ||
      joined.includes("touch")
    ) {
      return "The Playful Partners";
    }

    if (
      joined.includes("creative") ||
      joined.includes("arts") ||
      joined.includes("learning") ||
      joined.includes("diy")
    ) {
      return "The Creative Duo";
    }

    if (
      joined.includes("new and refreshing") ||
      joined.includes("movement") ||
      joined.includes("outdoors") ||
      joined.includes("walk")
    ) {
      return "The Gentle Explorers";
    }

    if (
      joined.includes("mix") ||
      joined.includes("somewhere in between") ||
      joined.includes("moderate energy")
    ) {
      return "The Balanced Blenders";
    }

    if (
      joined.includes("acts of service") ||
      joined.includes("physical closeness") ||
      joined.includes("morning") ||
      joined.includes("something else")
    ) {
      return "The Comfort Seekers";
    }

    if (joined.includes("special occasion") || joined.includes("$75+")) {
      return "The Celebration Mood";
    }

    return "The Balanced Blenders";
  };

  const result = calculateResult();

  const resultDescriptions = {
    "The Cozy Companions":
      "You’re craving warmth, comfort, and closeness. Tonight’s about slowing down, feeling safe, and reconnecting. Try a movie marathon, pajama night, or a guided mediation session.",
    "The Dreamy Romantics":
      "You’re in the mood for quiet connection and affection. Try a candlelight dinner or a cozy evening sharing dreams.",
    "The Playful Partners":
      "You’re ready for fun and laughter! Think games, mocktails, or anything that makes you both smile.",
    "The Creative Duo":
      "You thrive on imagination and shared projects — try painting, cooking, or creating something meaningful together.",
    "The Gentle Explorers":
      "You’re feeling refreshed and want to explore gently. Try a park picnic, sunset stroll, or farmers market trip.",
    "The Balanced Blenders":
      "You enjoy both cozy and outgoing moments. Mix it up with dinner in followed by a sweet treat out.",
    "The Comfort Seekers":
      "You’re in need of comfort and care. Keep it simple: a movie night, hand massages, or a calm tea ritual.",
    "The Celebration Mood":
      "It’s time to celebrate! Treat yourselves to a fancy dinner, staycation, or special night to honor your journey together.",
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / QuestionBank.length) * 100;
  
  const getDateIdeas = (resultType) => {
    const ideas = {
      "The Cozy Companions": [
        { title: "Movie Marathon", image: "./cosy1.png" },
        { title: "Meditation Session", image: "./cosy2.png" },
        { title: "Breakfast for Dinner", image: "./cosy3.png" },
      ],
      "The Dreamy Romantics": [
        { title: "Stargazing", image: "./romantic1.png" },
        { title: "Candlelight Dinner", image: "./romantic2.png" },
        { title: "Love Letter Exchange", image: "./romantic3.png" },
      ],
      "The Playful Partners": [
        { title: "Board Game Night", image: "./playful1.png" },
        { title: "Mocktail Mix-Off", image: "./playful2.png" },
        { title: "Karaoke Battle", image: "./playful3.png" },
      ],
      "The Creative Duo": [
        { title: "Paint Night", image: "./creative1.png" },
        { title: "DIY Photo Album", image: "./creative2.png" },
        { title: "Baking/Cooking Challenge", image: "./creative3.png" },
      ],
      "The Gentle Explorers": [
        { title: "Picnic in the Park", image: "./gentle1.png" },
        { title: "Drive-In Movie", image: "./gentle2.png" },
        { title: "Going for a Walk", image: "./gentle3.jpg" },
      ],
      "The Balanced Blenders": [
        { title: "Game Night with late night treats", image: "./balanced1.jpg" },
        { title: "Homemade dinner and short scenic drives ", image: "./balanced2.png" },
        { title: "Cook together, then take evening walk", image: "./balanced3.png" },
      ],
      "The Comfort Seekers": [
        { title: "Spa Night", image: "./comfort1.jpg" },
        { title: "Order-in dinner and favorite show ", image: "./comfort2.png" },
        { title: "Cosy tea and talk night", image: "./comfort3.png" },
      ],
      "The Celebration Mood": [
        { title: "Fancy dinner out", image: "./celebrate1.png" },
        { title: "Staycation hotel night", image: "./celebrate2.png" },
        { title: "Dress up for a date-in restaurant experience", image: "./celebrate3.png" },
      ],
    };
    return ideas[resultType] || [];
  };
  
  return (
    <div className="date-quiz-page">
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

      <main className="quiz-main">
        {!showResult ? (
          <div className="quiz-container">
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>

            <h2>{QuestionBank[currentQuestion].question}</h2>

            <div className="options">
              {QuestionBank[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${answers[currentQuestion] === option ? "selected" : ""}`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="arrow-container">
              <button
                className="next-arrow"
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
              >
                →
              </button>
            </div>

            <p className="question-count">
              Question {currentQuestion + 1} of {QuestionBank.length}
            </p>
          </div>
        ) : (
          <div className="quiz-result">
            <h2>{result}</h2>
            <p>{resultDescriptions[result]}</p>

            <div className="carousel">
              {getDateIdeas(result).map((idea, index) => (
                <div className="carousel-card" key={index}>
                  <img src={idea.image} alt={idea.title} />
                  <h4>{idea.title}</h4>
                </div>
              ))}
            </div>

            <div className="quiz-buttons">
              <Link to="/dateideas">
                <button className="orange-button">Explore More Date Ideas</button>
              </Link>

              <button
                className="orange-button"
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setShowResult(false);
                }}
              >
                Restart Quiz
              </button>
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>
          <em>
            &copy; {new Date().getFullYear()} EquiCare
          </em>
        </p>
      </footer>
    </div>
  );
}

export default DateQuiz;