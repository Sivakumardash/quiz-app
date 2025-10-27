const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Result = require("../models/Result");

// (OPTIONAL) Endpoint to seed initial 15 questions into the DB
// Only run this ONCE by visiting: http://localhost:5000/api/quiz/seed
router.get("/seed", async (req, res) => {
  try {
    const questions = [
     /* {
        question: "What is the capital of France?",
        options: ["Paris", "Rome", "Madrid", "Berlin"],
        correctAnswer: "Paris"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars"
      },
      {
        question: "What is 5 + 7?",
        options: ["10", "12", "11", "13"],
        correctAnswer: "12"
      },
      {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
        correctAnswer: "Carbon Dioxide"
      },
      {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "William Shakespeare"
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: "Pacific"
      },
      {
        question: "What is the boiling point of water?",
        options: ["90°C", "95°C", "100°C", "110°C"],
        correctAnswer: "100°C"
      },
      {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Osmium", "Oxygen", "Oxide", "Obsidian"],
        correctAnswer: "Oxygen"
      },
      {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "Thailand", "India"],
        correctAnswer: "Japan"
      },
      {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        correctAnswer: "8"
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Michelangelo", "Leonardo da Vinci", "Van Gogh", "Pablo Picasso"],
        correctAnswer: "Leonardo da Vinci"
      },
      {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7"
      },
      {
        question: "Which language is primarily spoken in Brazil?",
        options: ["Spanish", "Portuguese", "French", "English"],
        correctAnswer: "Portuguese"
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Gd", "Go"],
        correctAnswer: "Au"
      },
      {
        question: "Which planet is the hottest in our solar system?",
        options: ["Mercury", "Venus", "Mars", "Jupiter"],
        correctAnswer: "Venus"
      }  */

        {
        question: "What does aneha like the most?",
        options: ["body", "love", "sex", "food"],
        correctAnswer: "love"
      },
      {
        question: "to Whom sneha like the most ?",
        options: ["siva", "subhas", "mother", "father"],
        correctAnswer: "mother"
      },
      {
        question: "sneha favourite food ?",
        options: ["siva", "subhas", "chicken", "panir"],
        correctAnswer: "chicken"
      },
      {
        question: "to Whom sneha hate while angry and like while in sweet mood the most ?",
        options: ["siva", "subhas", "mother", "father"],
        correctAnswer: "siva"
      },
      {
        question: "sneha like to do romance when ?",
        options: ["siva makes her feel very nice and spwnd more time", "subhas talks a lot", "after birth", "before birth"],
        correctAnswer: "siva makes her feel very nice and spwnd more time"
      },
       {
        question: "sneha looks very?",
        options: ["sexy", "cute", " both", "none of these"],
        correctAnswer: "both"
      }
      
      
    ];

    await Question.deleteMany(); // deletes old questions
    await Question.insertMany(questions);

    res.status(201).json({ message: "Inserted many questions successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST user result
router.post("/result", async (req, res) => {
  const { username, score } = req.body;
  try {
    const result = new Result({ username, score });
    await result.save();
    res.json({ message: "Result saved!", result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
  
