
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Quiz.css";

// quiz is a functional component --A functional component is just a 
// function that builds part of the UI and can manage its own state using hooks.  or 
//“A functional component is a simple JavaScript function that returns JSX and 
// uses hooks to handle state and lifecycle features.”
const Quiz = () => {
  const [username, setUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60); // Start with 1 minute
  const [finished, setFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch questions
  useEffect(() => {
    axios.get("http://localhost:5000/api/quiz")
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  // Timer countdown
 useEffect(() => {
  if (!username) return; // 👈 Don't start timer until quiz begins

  if (time <= 0) {
    handleSubmit();
    return;
  }

  const timer = setInterval(() => setTime(prev => prev - 1), 1000);
  return () => clearInterval(timer);
}, [time, username]);


  // Next question: Add 30 sec only if answer is correct
  const handleNext = () => {
    if (selected) {
      if (selected === questions[current].correctAnswer) {
        setScore(prev => prev + 1);
        setTime(prev => prev + 30); // Add 30 sec only for correct answer
      }
    }

    setSelected(null); // Clear selection

    if (current + 1 < questions.length) {
      setCurrent(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setFinished(true);
    if (!submitted && username) {
      axios.post("http://localhost:5000/api/quiz/result", { username, score })
        .then(() => setSubmitted(true))
        .catch(err => console.error(err));
    }
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const progressPercent = questions.length ? ((current + 1) / questions.length) * 100 : 0;

  // Start Quiz with password check
  const handleStartQuiz = () => {
    if (passwordInput === "1234") {
      setError("");
      setUsername(usernameInput || "Guest");
    } else {
      setError("Wrong password, please try again");
    }
  };

  if (!username) {
    return (
      <div className="quiz-page">
        <div className="quiz-card">
          <h2>Enter your details to start:</h2>
          <input
            className="quiz-input"
            placeholder="username..."
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <input
            type="password"
            className="quiz-input"
            placeholder="Enter password..."
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button className="quiz-button" onClick={handleStartQuiz}>
            Start Quiz
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    );
  }

  if (!questions.length)
    return <div className="quiz-page"><h2>Loading...</h2></div>;

  if (finished) {
    return (
      <div className="quiz-page">
        <div className="quiz-card">
          <h2>Quiz Finished!</h2>
          <p>Score: {score}/{questions.length}</p>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <h2>Time Left: {formatTime(time)}</h2>

        {/* Progress Bar */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p>{current + 1} / {questions.length}</p>

        <h2>{q.question}</h2>
        <ul>
          {q.options.map((opt, i) => (
            <li key={i}>
              <label>
                <input
                  type="radio"
                  name="option"
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                />
                {opt}
              </label>
            </li>
          ))}
        </ul>

        <button className="quiz-button" onClick={() => setSelected(null)}>
          Clear
        </button>
        <button className="quiz-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;


/*
how data retrive from datasbase
🧠 MongoDB (Database)
     |
     |  (Stores documents in BSON)
     v
🔧 Mongoose (in Node.js)
     |
     |  Question.find()
     |  ↓ Converts BSON → JS objects
     v
🚀 Express.js (Backend Server)
     |
     |  router.get("/api/quiz", async (req, res) => {
     |    const questions = await Question.find();
     |    res.json(questions);
     |  });
     |
     |  ↓ Sends JSON response over HTTP
     v
🌐 Axios (in React Frontend)
     |
     |  useEffect(() => {
     |    axios.get("http://localhost:5000/api/quiz")
     |      .then(res => setQuestions(res.data))
     |  }, []);
     |
     |  ↓ Receives JSON → converts to JS array
     v
⚛️ React (Frontend)
     |
     |  setQuestions(res.data)
     |  ↓ updates React state
     v
🖥️ Browser UI
     |
     |  Displays:
     |   - Question text
     |   - Options (radio buttons)
     |   - User answers
     v
🎯 User interacts → answers → React can POST results back to server

*/