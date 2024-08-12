const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const startContainer = document.querySelector('#start-container');
const optionsContainer = document.querySelector('.options-container');
const remainingTime = document.querySelector("#remaining-time");
const timeUpBox = document.getElementById('time-up')
const question = document.querySelector('#question');
const options = document.querySelectorAll('.option');
const score = document.querySelector('#score-val');
const descriptionContainer = document.querySelector('.description-container');
const nextBtn = document.querySelector('#next-btn');
const showResultBtn = document.querySelector('#show-result-btn');
const currentQtn = document.querySelector('#current-qtn');
const totalQtn = document.querySelector('#total-qtn');
const resultContainer = document.querySelector('#result-container');
const attemptQtnBox = document.getElementById('attempt-qtn-box');
const correctQtnBox = document.getElementById('correct-qtn-box');
const wrongQtnBox = document.getElementById('wrong-qtn-box');
const percentageBox = document.getElementById('percentage-box');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');


const questions = [
    {
        question: 'Which of the following is not a valid DOM event?',
        options: ['click', 'hover', 'load', 'submit'],
        answer: 1,
        description: 'There is no hover event in DOM. The hover event is a CSS property.'
    },
    {
        question: 'Which of the following is not a valid DOM method?',
        options: ['getElementById', 'querySelector', 'getElementByClass', 'getElementByTagName'],
        answer: 2,
        description: 'There is no getElementByClass method in DOM. The correct method is getElementsByClassName.'
    },
    {
        question: 'Which of the following is not a valid DOM property?',
        options: ['innerText', 'innerHTML', 'textContent', 'innerTextContent'],
        answer: 3,
        description: 'There is no innerTextContent property in DOM. The correct property is innerText.'
    },
    {
        question: 'Which of the following is not a valid DOM object?',
        options: ['window', 'document', 'element', 'node'],
        answer: 2,
        description: 'There is no element object in DOM. The correct object is Element.'
    },
    {
        question: 'Which method is used to serialize an object into a JSON string?',
        options: ['JSON.parse()', 'JSON.stringify()', 'JSON.serialize()', 'JSON.convert()'],
        answer: 1,
        description: 'The JSON.stringify() method converts a JavaScript object or value to a JSON string.'
    },
    {
        question: 'What will the following code output?\nconsole.log(0.1 + 0.2 === 0.3);',
        options: ['true', 'false', 'undefined', 'NaN'],
        answer: 1,
        description: 'Due to floating-point precision issues, 0.1 + 0.2 does not exactly equal 0.3, so the output is false.'
    },
    {
        question: 'What is the purpose of the "use strict" directive in JavaScript?',
        options: ['Enables strict mode in JavaScript', 'Disables strict mode in JavaScript', 'Enables experimental features', 'Prevents script execution'],
        answer: 0,
        description: 'The "use strict" directive enables strict mode in JavaScript, which helps catch common coding errors and "unsafe" actions such as defining global variables.'
    },
    {
        question: 'Which of the following is a way to create an object in JavaScript?',
        options: ['Object literal', 'Constructor function', 'Object.create()', 'All of the above'],
        answer: 3,
        description: 'JavaScript provides multiple ways to create objects: using an object literal, a constructor function, or the Object.create() method.'
    },
    {
        question: 'What does the "this" keyword refer to in JavaScript?',
        options: ['The current function', 'The global object', 'The object from which the method was called', 'None of the above'],
        answer: 2,
        description: 'In JavaScript, the "this" keyword refers to the object from which the method was called. It can vary depending on the context in which it is used.'
    },
    {
        question: 'Which of the following is an IIFE (Immediately Invoked Function Expression)?',
        options: ['function(){}', '(function(){})()', 'function(){}()', '(function(){}());'],
        answer: 1,
        description: 'An IIFE is a JavaScript function that is executed immediately after it is defined. The correct syntax is (function(){})().'
    },
    {
        question: 'What is the difference between "==" and "===" in JavaScript?',
        options: ['"==" checks for value equality, "===" checks for value and type equality', '"==" checks for type equality, "===" checks for value equality', 'They are equivalent', '"==" checks for strict equality, "===" checks for loose equality'],
        answer: 0,
        description: '"==" compares values while ignoring types, whereas "===" compares both values and types.'
    },
    {
        question: 'Which of the following is a JavaScript closure?',
        options: ['A function within a function', 'A function that has access to its own scope, the outer function’s variables, and the global variables', 'A function that returns another function', 'All of the above'],
        answer: 3,
        description: 'A closure is a feature in JavaScript where an inner function has access to the outer (enclosing) function’s variables and scope, even after the outer function has returned.'
    },
    {
        question: 'How can you check if a variable is an array in JavaScript?',
        options: ['typeof array === "array"', 'array instanceof Array', 'Array.isArray(array)', 'Both B and C'],
        answer: 3,
        description: 'You can check if a variable is an array using both array instanceof Array and Array.isArray(array).'
    },
    {
        question: 'What will the following code output?\nconsole.log(typeof null);',
        options: ['"object"', '"null"', '"undefined"', '"number"'],
        answer: 0,
        description: 'In JavaScript, the typeof null is an object, which is considered a bug in the language but has been kept for compatibility reasons.'
    },
    {
        question: 'What will the following code output?\nlet x = [1, 2, 3];\nlet y = x;\ny.push(4);\nconsole.log(x);',
        options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[1, 2, 4]', '[4, 1, 2, 3]'],
        answer: 1,
        description: 'In JavaScript, arrays are reference types. Modifying the array "y" also affects "x" because they both refer to the same object in memory.'
    }
];


let currentQuestion = 0;
let scoreVal = 0;
let attemptQtn = 0;
let remainingTimeInterval;
let doneQuestions = [];


startBtn.addEventListener('click', () => {
    // console.log('start button clicked')
    startContainer.style.display = 'none'
    quizContainer.style.display = 'block';
    loadQuestion();
});

//function to start remaining time
function startRemainingTime() {
    let timeLimit = 60;
    remainingTime.innerHTML = timeLimit;
    remainingTimeInterval = setInterval(() => {
        timeLimit--;

        if (timeLimit < 10) {
            remainingTime.innerHTML = `0${timeLimit}`;
        } else {
            remainingTime.innerHTML = timeLimit;
        }

        if (timeLimit == 0) {
            clearInterval(remainingTimeInterval);
            timeIsUp();
        }
    }, 1000)
}

//function to show time up box
function timeIsUp() {
    timeUpBox.style.display = 'block';
    for (let i = 0; i < optionsContainer.children.length; i++) {
        optionsContainer.children[i].removeAttribute("onclick");
    }
    for (let i = 0; i < optionsContainer.children.length; i++) {
        if (optionsContainer.children[i].id == questions[currentQuestion].answer) {
            optionsContainer.children[i].classList.add("correctAnswer");
        }
    }
    descriptionContainer.style.display = 'block';
    if (currentQuestion === questions.length - 2) {
        showResultBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
    }
}

function stopRemainingTime() {
    clearInterval(remainingTimeInterval);
}

function updateScore() {
    score.textContent = scoreVal;
}

//function to load question
function loadQuestion() {
    stopRemainingTime();
    startRemainingTime();
    currentQtn.textContent = currentQuestion + 1;
    totalQtn.textContent = questions.length;
    question.textContent = questions[currentQuestion].question;
    createOptions();
    descriptionContainer.textContent = questions[currentQuestion].description;
    descriptionContainer.style.display = 'none';
    nextBtn.style.display = 'none';
}

//shuffle questions array to randomize questions
function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [array[i], array[random]] = [array[random], array[i]];
    }
}
shuffleQuestions(questions);

//next button event listener to load next question
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
    timeUpBox.style.display = 'none';
});

//function to create options for each question
function createOptions() {
    optionsContainer.innerHTML = "";
    for (let i = 0; i < questions[currentQuestion].options.length; i++) {
        const option = document.createElement("div");
        option.innerHTML = questions[currentQuestion].options[i];
        option.classList.add("option");
        option.id = i;
        option.setAttribute("onclick", "checkAnswer(this)");
        optionsContainer.appendChild(option);
    }
}

//function to check the selected option is correct or not
function checkAnswer(ele) {

    //increment attempt question
    attemptQtn++;

    //stop RemainingTime when an option is selected
    stopRemainingTime();

    //disable all options after selecting an option
    for (let i = 0; i < optionsContainer.children.length; i++) {
        optionsContainer.children[i].removeAttribute("onclick");
    }

    //check if the selected option is correct or not
    const id = ele.id;
    if (id == questions[currentQuestion].answer) {
        ele.classList.add("correctAnswer");
        scoreVal++;
        updateScore();
    } else {
        ele.classList.add("wrongAnswer");

        //show correct option when clicked answer is wrong
        for (let i = 0; i < optionsContainer.children.length; i++) {
            if (optionsContainer.children[i].id == questions[currentQuestion].answer) {
                optionsContainer.children[i].classList.add("correctAnswer");
            }
        }
    }

    //show description after selecting an option
    descriptionContainer.style.display = 'block';

    //show next button after selecting an option
    if (currentQuestion === questions.length - 1) {
        showResultBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
    }
}

//function to show result after completing all questions
let showResult = () => {
    stopRemainingTime();
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    attemptQtnBox.textContent = attemptQtn;
    correctQtnBox.textContent = scoreVal;
    wrongQtnBox.textContent = questions.length - scoreVal;
    percentageBox.textContent = Math.round((scoreVal / questions.length) * 100) + "%";
}

//function to restart quiz
let restartQuiz = () => {
    shuffleQuestions(questions);
    currentQuestion = 0;
    scoreVal = 0;
    updateScore();
    loadQuestion();
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    nextBtn.style.display = 'block';
    showResultBtn.style.display = 'none';
}

//function to go home
let goHome = () => {
    currentQuestion = 0;
    scoreVal = 0;
    startContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    showResultBtn.style.display = 'none';
    nextBtn.style.display = 'block';
}

//open feedback form
document.getElementById('open-form').addEventListener('click', function () {
    const form = document.querySelector('.feedback-form');
    if (form.style.display === 'block') {
        form.style.display = 'none';
    } else {
        form.style.display = 'block';
    }
});

// Handle satisfaction selection
document.querySelectorAll('#satisfaction input[type="radio"]').forEach((input) => {
    input.addEventListener('change', function () {
        document.querySelectorAll('#satisfaction label').forEach((label) => {
            label.style.opacity = '0.5'; // Fade out all emojis
        });
        this.nextElementSibling.style.opacity = '1'; // Present the chosen emoji clearly
    });
});

// Handle more quizzes selection
document.querySelectorAll('#more-quizzes input[type="radio"]').forEach((input) => {
    input.addEventListener('change', function () {
        document.querySelectorAll('#more-quizzes label').forEach((label) => {
            label.style.opacity = '0.5'; // Fade out all options
        });
        this.nextElementSibling.style.opacity = '1'; // Present the chosen option clearly
    });
});

// submit feedback form in google sheet and show thank you message after submission
// submit feedback form in google sheet and show thank you message after submission
const submitForm = (e) => {
    e.preventDefault();

    // Show loading spinner
    document.querySelector('#form-title').style.display = 'none';
    document.querySelector('#feedback-form').style.display = 'none';
    document.querySelector('#feedback-loading').style.display = 'block';

    // Select the form element
    const form = document.querySelector('#feedback-form');

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxJ7Ghs0M7VysXYN8F-zBn9Snsj5gH_UT2p-UsI2nJE1FG9FAeelgLLN6fl09oUdcpT/exec';

    // Create FormData from the form element
    const formData = new FormData(form);
    const keyValuePairs = [];
    for (const [key, value] of formData.entries()) {
        keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    const formDataString = keyValuePairs.join("&");
    const data = new URLSearchParams(formDataString);

    fetch(scriptURL, { method: 'POST', body: data })
        .then(response => {
            // Hide form and show success message
            document.querySelector('#feedback-loading').style.display = 'none';
            document.querySelector('#feedback-success').style.display = 'block';
            form.reset();
        })
        .catch((error) => {
            // Handle errors
            console.error('Error!', error.message);
            document.querySelector('#feedback-loading').style.display = 'none';
            document.querySelector('#feedback-error').style.display = 'block';
        });
};

// Attach the submitForm function to the form's submit event
document.querySelector('.feedback-form').addEventListener('submit', submitForm);
