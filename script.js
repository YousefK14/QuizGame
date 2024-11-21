const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timeElement = document.getElementById('time');
const restartButton = document.getElementById('restart');
const resultElement = document.getElementById('result'); // Reference to result div

let timer;
let timeLeft = 10;
let currentQuestionIndex = 0; // To keep track of the current question
let score = 0; // To keep track of points

// Array of questions (more questions added)
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Ernest Hemingway"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "5"],
        answer: "2"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Silver", "Iron"],
        answer: "Oxygen"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        answer: "Mitochondria"
    }
];

// Start the quiz
function startQuiz() {
    score = 0; // Reset score
    currentQuestionIndex = 0; // Reset question index
    restartButton.classList.add('hidden');
    resetTimer();
    displayQuestion();
    resultElement.textContent = ''; // Clear previous results
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const { question, options } = questions[currentQuestionIndex];
        questionElement.classList.add('fade-out'); // Start fade-out transition
        setTimeout(() => {
            questionElement.textContent = question;
            optionsElement.innerHTML = options.map(option => 
                `<button onclick="selectAnswer('${option}')">${option}</button>`).join('');
            questionElement.classList.remove('fade-out'); // Remove fade-out after change
            startTimer();
        }, 500); // Duration of the fade-out
    } else {
        endQuiz(); // End quiz if no more questions
    }
}

// Handle answer selection
function selectAnswer(selected) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
    
    // Check answer
    if (selected === currentQuestion.answer) {
        score++;
        resultElement.textContent = "Correct! 🎉";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = "Wrong answer! You lost. ❌";
        resultElement.style.color = "red";
        currentQuestionIndex = questions.length; // Skip to end of questions
    }
    currentQuestionIndex++; // Move to the next question
    setTimeout(displayQuestion, 1500); // Delay before showing the next question
}

// Start the timer for the question
function startTimer() {
    timeLeft = 10;
    timeElement.textContent = timeLeft;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            resultElement.textContent = "Time's up! You lost. ❌";
            resultElement.style.color = "red";
            restartButton.classList.remove('hidden');
            currentQuestionIndex = questions.length; // Skip to end of questions
        } else {
            timeElement.textContent = --timeLeft; // Decrement time left
        }
    }, 1000);
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    timeElement.textContent = timeLeft;
}

// End the quiz and show score
function endQuiz() {
    questionElement.textContent = "Quiz Over!";
    optionsElement.innerHTML = '';
    resultElement.textContent = `Your score: ${score} out of ${questions.length}`;
    restartButton.classList.remove('hidden');
}

// Restart the quiz on button click
restartButton.onclick = startQuiz;

startQuiz();  // Start the quiz on page load
