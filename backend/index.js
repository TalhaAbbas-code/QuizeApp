const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

app.use(cors());
app.use(bodyParser.json());


const users = [];
let quizList = [
  {
    id: 1,
    title: "General Knowledge Basics",
    category: "General Knowledge",
    difficulty: "easy",
    questions: [
      {
        questionId: 101,
        question: "What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"],
        correctAnswer: "New Delhi",
      },
      {
        questionId: 102,
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7",
      },
      {
        questionId: 103,
        question: "Which is the largest ocean?",
        options: ["Indian", "Pacific", "Atlantic", "Arctic"],
        correctAnswer: "Pacific",
      },
      {
        questionId: 104,
        question: "Who wrote 'Hamlet'?",
        options: ["Shakespeare", "Wordsworth", "Keats", "Chaucer"],
        correctAnswer: "Shakespeare",
      },
      {
        questionId: 105,
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        correctAnswer: "Mercury",
      },
    ],
  },
  {
    id: 2,
    title: "Basic Math Quiz",
    category: "Mathematics",
    difficulty: "medium",
    questions: [
      {
        questionId: 201,
        question: "What is 15 * 3?",
        options: ["45", "35", "30", "50"],
        correctAnswer: "45",
      },
      {
        questionId: 202,
        question: "What is the square of 9?",
        options: ["18", "81", "72", "27"],
        correctAnswer: "81",
      },
      {
        questionId: 203,
        question: "What is 100 divided by 4?",
        options: ["20", "25", "30", "15"],
        correctAnswer: "25",
      },
      {
        questionId: 204,
        question: "Solve: 2 + (3 × 4)",
        options: ["14", "20", "10", "12"],
        correctAnswer: "14",
      },
      {
        questionId: 205,
        question: "What is the cube root of 64?",
        options: ["2", "4", "6", "8"],
        correctAnswer: "4",
      },
    ],
  },
  {
    id: 3,
    title: "Science Trivia",
    category: "Science",
    difficulty: "hard",
    questions: [
      {
        questionId: 301,
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: "Carbon Dioxide",
      },
      {
        questionId: 302,
        question: "What is H2O commonly known as?",
        options: ["Hydrogen Peroxide", "Water", "Oxygen", "Salt"],
        correctAnswer: "Water",
      },
      {
        questionId: 303,
        question: "What part of the cell contains DNA?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Cytoplasm"],
        correctAnswer: "Nucleus",
      },
      {
        questionId: 304,
        question: "How many bones are there in the adult human body?",
        options: ["206", "208", "210", "212"],
        correctAnswer: "206",
      },
      {
        questionId: 305,
        question: "What planet is known for its rings?",
        options: ["Earth", "Jupiter", "Saturn", "Mars"],
        correctAnswer: "Saturn",
      },
    ],
  },
  {
    id: 4,
    title: "Science ",
    category: "Science",
    difficulty: "hard",
    questions: [
      {
        questionId: 301,
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: "Carbon Dioxide",
      },
      {
        questionId: 302,
        question: "What is H2O commonly known as?",
        options: ["Hydrogen Peroxide", "Water", "Oxygen", "Salt"],
        correctAnswer: "Water",
      },
      {
        questionId: 303,
        question: "What part of the cell contains DNA?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Cytoplasm"],
        correctAnswer: "Nucleus",
      },
      {
        questionId: 304,
        question: "How many bones are there in the adult human body?",
        options: ["206", "208", "210", "212"],
        correctAnswer: "206",
      },
      {
        questionId: 305,
        question: "What planet is known for its rings?",
        options: ["Earth", "Jupiter", "Saturn", "Mars"],
        correctAnswer: "Saturn",
      },
    ],
  },
];




app.post("/api/signup", (req, res) => {
  const { name,email, password } = req.body;

  
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ name,email, password }); 
  const token = jwt.sign({ name, email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ message: "Signup successful", token });
});


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  
  const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token ,role:"user"});
});
app.post("/api/Adminlogin", (req, res) => {
  const { email, password } = req.body;
 

  if (email === ADMIN_EMAIL && password===ADMIN_PASSWORD) {
    const token = jwt.sign({ email: email, name: "Admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token,role:"admin" });
   
  }
  return res.status(401).json({ message: "Invalid credentials" });

 
});


app.get("/api/validate", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded,"backend decoded user")
    return res.json({ message: "Token valid", user: decoded });
  } catch (err) {
    return res.status(403).json({ message: "Token invalid" });
  }
});

app.get("/api/quizzes", (req, res) => {
  res.json({ quizzes: quizList });
});
//  create quiz
app.post("/api/quizzes", (req, res) => {
  const newQuiz = req.body;
  newQuiz.id = Date.now(); 
  quizList.push(newQuiz);
  res.status(201).json({ message: "Quiz created", quiz: newQuiz });
});

//  Update quiz 
app.put("/api/quizzes/:id", (req, res) => {
  const quizId = parseInt(req.params.id);
  const updatedQuiz = req.body;

  const index = quizList.findIndex((q) => q.id === quizId);
  if (index === -1) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  quizList[index] = updatedQuiz;
  res.json({ message: "Quiz updated", quiz: updatedQuiz });
});

//  Delete quiz 
app.delete("/api/quizzes/:id", (req, res) => {
  const quizId = parseInt(req.params.id);
  const quizToDelete = quizList.find((q) => q.id === quizId);
  if (!quizToDelete) {
    return res.status(404).json({ message: "Quiz not found" });
  }
  quizList = quizList.filter((q) => q.id !== quizId);

  res.json({ message: "Quiz deleted successfully", deletedQuiz: quizToDelete });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
