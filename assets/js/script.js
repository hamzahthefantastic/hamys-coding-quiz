const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const timerr = document.getElementById("timerr");
const scoreContainer = document.getElementById("score-container");
const submitContainer = document.getElementById("submit-container");
const questions = [
    {
        question: "What is a closure?",
        choices: ["A function that returns another function", "A type of object", "A way to save state"],
        answer: "A function that returns another function"
    },
    {
        question: "What is hoisting?",
        choices: ["The process of moving a variable to the top of its scope", "The process of moving a function to the top of its scope", "The process of moving a function and its variables to the top of its scope"],
        answer: "The process of moving a variable to the top of its scope"
    },
    {
        question: "What is the difference between var and let?",
        choices: ["var is function scoped, let is block scoped", "var is block scoped, let is function scoped", "var and let are interchangeable"],
        answer: "var is function scoped, let is block scoped"
    },
    {
        question: "What is the difference between == and ===?",
        choices: ["== compares values without considering data types, while === compares both values and data types",
            "== compares values, while === compares data types only",
            "== compares data types, while === compares values only",
            "There is no difference, they do the same thing"],
        answer: "== compares values without considering data types, while === compares both values and data types"
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        choices: ["to refer to the global object",
            "to refer to the object that the function is a method of",
            "to refer to the object that the function is a property of",
            "all of the above"],
        answer: "all of the above"
    },
    {
        question: "What is the difference between let and const?",
        choices: ["let is block scoped and const is function scoped",
            "let is function scoped and const is block scoped",
            "let can be reassigned and const can't",
            "const can be reassigned and let can't"],
        answer: "let can be reassigned and const can't"
    },
    {
        question: "What is an event loop in JavaScript?",
        choices: ["A mechanism that allows multiple scripts to run at the same time",
            "A mechanism that allows scripts to run one at a time in a specific order",
            "Amechanism that allows non-blocking code to execute by continuously checking the message queue",
            "A mechanism that allows scripts to be executed only after the page has fully loaded"],
        answer: "A mechanism that allows non-blocking code to execute by continuously checking the message queue"
    },
    {
        question: "What is the difference between a callback function and a promise?",
        choices: ["A callback function is a function that is passed as an argument to another function, while a promise is an object that represents the eventual completion of an asynchronous operation",
            "A callback function is an object that represents the eventual completion of an asynchronous operation, while a promise is a function that is passed as an argument to another function",
            "Both callback function and promise are same and can be used interchangeably",
            "Callback function and promise are not related and can't be used together"],
        answer: "A callback function is a function that is passed as an argument to another function, while a promise is an object that represents the eventual completion of an asynchronous operation"
    }
];

let currentQuestionIndex = 0;
let timeLeft = questions.length * 15;
let score = 0;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startBtn.style.display = "none";
    quizContainer.style.display = "block";
    renderQuestion();
    startTimer();
}

function renderQuestion() {
    quizContainer.innerHTML = "";
    const currentQuestion = questions[currentQuestionIndex];
    const questionEl = document.createElement("p");
    questionEl.textContent = currentQuestion.question;
    questionEl.classList.add("question");
    quizContainer.appendChild(questionEl);

    currentQuestion.choices.forEach(function (choice, i) {
        const choiceBtn = document.createElement("button");
        choiceBtn.textContent = choice;
        choiceBtn.classList.add("choice");
        choiceBtn.addEventListener("click", function () {
            if (choice === currentQuestion.answer) {
                score++;
                choiceBtn.classList.add("correct");
            } else {
                timeLeft -= 15;
                choiceBtn.classList.add("incorrect");
            }
            currentQuestionIndex++;
            if (currentQuestionIndex === questions.length) {
                endQuiz();
            } else {
                renderQuestion();
            }
        });
        quizContainer.appendChild(choiceBtn);
    });
}
function startTimer() {
    setInterval(function() {
      timer.textContent = timeLeft + " seconds remaining";
      timeLeft--;
      if (timeLeft < 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  function endQuiz() {
    clearInterval();
    quizContainer.style.display = "none";
    submitContainer.style.display = "block";
    scoreContainer.textContent = "Your final score is: " + score;
  
    const submitForm = document.getElementById("submit-container");
    submitForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const initials = document.getElementById("initials").value;
      localStorage.setItem("initials", initials);
      localStorage.setItem("score", score);
      alert("Score saved!");
    });
  }