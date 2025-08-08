const quizData =[

    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "Home Tool Markup Language",
        c: "Hyperlinks Text Markup Lauguage",
        d: "High Text Markup Language",
        correct: "a"
    },


    {
        question: "Which programming language is known as the language of the web?",
        a: "Python",
        b: "Javascript",
        c: "C++",
        d: "Java",
        correct: "b"
    },

    {
        question: "What is the output of 2 +2 in JavaScript?",
        a: "4",
        b: "22",
        c: "Undefined",
        d: "error",
        correct: "b"
    },

    {
        question: "Which symbol is used for comments in Python?",
        a: "/ /",
        b: "#",
        c: "/*   */",
        d: "<!-- --!>",
        correct: "b"
    },

    
    {
        question: "What is the file extension for the Javascript file?",
        a: "Java",
        b: ".js",
        c: ".jsx",
        d: ".jvs",
        correct: "b"
    },

    {
        question: "Which HTML elment is used for to include Javascript code?",
        a: "<javascript",
        b: "<scripts>",
        c: "<JS>",
        d: "<code>",
        correct: "b"
    },
    
    {
        question: "Which of the following is a backend programming language",
        a: "HTML",
        b: "CSS",
        c: "Node.js",
        d: "SQL",
        correct: "c"
    },

    {
        question: "Which keyword is used to declare a varible in JavaScript?",
        a: "var",
        b: "let",
        c: "const",
        d: "all of above",
        correct: "d"
    },
    
    {
        question: "What does CSS stand for?",
        a: "Casacading Style Sheets",
        b: "Computer Style Sheets",
        c: "Creative Style Sheets",
        d: "Colorful Style Sheets",
        correct: "a"
    },

    {
        question: "Which of the following is a version control system?",
        a: "Git",
        b: "Node.js",
        c: "NPM",
        d: "Docker",
        correct: "a"
    },
];

const questionE1 = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const answerEls = document.querySelectorAll('.answer');
const quizbody = document.querySelector('.quiz-body');
const resultContainer = document.querySelector('.reult-container');
const finalScoreEl = document.getElementById('final-score');
const restarBtn = document.getElementById('restart');
const currentQuestionEl = document.getElementById('current');
const totalQuestionsEl = document.getElementById('total');
const scoreE1 = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start-button');
const quizHeader = document.querySelector('.quiz-header');
const startScreen = document.getElementById('start-screen');
const completionTimeEl = document.getElementById('completion-time');


let currentQuiz = 0;
let score = 0;
let timeLeft = 60;
let timer;
let shuffledQuizData =[];
let isQuizStarted = false;
let startTime;

function shuffledQuestions() {
    shuffledQuizData = [...quizData].sort(() => Math.random() - 0.5);
}
 

function loadQuiz () {
    if (!isQuizStarted) return;
    deselectedAnswers();
    const currentQuizData = shuffledQuizData[currentQuiz];
    questionE1.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    currentQuestionEl.innerText = currentQuiz + 1;
    totalQuestionsEl.innerText = shuffledQuizData.length;
}

function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
        timeLeft--;
        timeEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}


function deselectedAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}


function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function endQuiz() {
    clearInterval(timer);
    quizbody.classList.add('hide');
    quizHeader.classList.add('hide');
    resultContainer.classList.remove('hide');
    finalScoreEl.innerText = score;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    completionTimeEl.innerText = timeTaken;
}


submitBtn.addEventListener('click', () => {
    const answer = getSelected();
if (answer) {
    if (answer === shuffledQuizData[currentQuiz].correct) {
        score += 10;
        scoreE1.innerText = score;
    }
    currentQuiz++;
    if (currentQuiz < shuffledQuizData.length) {
        loadQuiz();
    } else {
        endQuiz();
    }
}

});

restarBtn.addEventListener('click', () => {
    currentQuiz = 0;
    score = 0;
    timeLeft = 60; 
    scoreE1.innerText = score;
    timeEl.innerText = timeLeft;
    startScreen.classList.remove('hide');
    quizbody.classList.add('hide');
    quizHeader.classList.add('hide');
    resultContainer.classList.add('hide');
    isQuizStarted = false;
});

startBtn.addEventListener('click', () => {
    isQuizStarted = true;
    startScreen.classList.add('hide');
    quizbody.classList.remove('hide');
    quizHeader.classList.remove('hide');
    shuffledQuestions();
    loadQuiz();
    startTimer();
});
