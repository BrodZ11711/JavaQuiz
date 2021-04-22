const startButton = document.getElementById('start-btn')
const ruleTextElement = document.getElementById('ruleText')
const questionContainerElement = document.getElementById('questionContainer')

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answerButtons')

/* Time Counter */
const timeLeftDisplay = document.querySelector('#time-left')
let timeLeft = 30

/* Creating the variables in order to shuffle the questions */
let shuffledQuestions, currentQuestionIndex
/* When the start button is 'clicked', it will run the function startGame */
startButton.addEventListener('click', startGame)
startButton.addEventListener('click', countDown)

function  startGame () {
    console.log('The Game... is now afoot!')
    /* When the start button is pressed, it will set the rules and button to hide class, as well as show the next question */
    startButton.classList.add('hide')
    
    
    /* This will shuffle the questions, by making it shuffle one way by either going to a positive number, making it go right, or negative number, making it go left. Math.Random with .5, will make it a 50/50 chance of going positive or negative */
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    ruleTextElement.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function countDown() {
    setInterval(function() {
        if(timeLeft <= 0) {
            clearInterval(timeLeft =0)
        }
        timeLeftDisplay.innerHTML = timeLeft
        timeLeft -= 1
    }, 1000) 
}


function setNextQuestion () {
    /* This will reset the answer cards, as to not show the same answers as the previous question */
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    /* Displays the question, and will loop through the answers */
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
function resetState(){
    clearStatusClass(document.body)
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}
function selectAnswer (e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex +1) {
        /* Allows a one second Delay before moving on */
    setTimeout(() => { 
        currentQuestionIndex++
    setNextQuestion()
     }, 1000);
    } else startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
}

/* Will assign the buttons with a correct or wrong class, based on the right answer */
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

/* This will create the question array */
const questions = [
    {
        question: 'How do you create a function?',
        answers: [
            { text : 'function myFunction()', correct: true },
            { text: 'function = myFunction()', correct: false },
            {text: 'function;myFunction()', correct: false},
            {text: 'create myFunction()', correct: false}
        ]
    },
    {
        question: 'How do you call a functioned Named "myFunction"?',
        answers: [
            { text : 'call function myFunction', correct: false },
            { text: 'call myFunction()', correct: false },
            {text: 'myFunction()', correct: true},
            {text: 'myFunction', correct: false}
        ]
    },
    {
        question: 'What is the correct JavaScript syntax to write "Hello World"?',
        answers: [
            { text : 'console.log("Hello World")', correct: false },
            { text: 'document.write("Hello World");', correct: true },
            {text: 'response.write("Hello World)', correct: false},
            {text: 'echo "Hello World"', correct: false}
        ]
    },
    {
        question: 'The external JavaScript file MUST contain the <script> tag.',
        answers: [
            { text : 'False', correct: true },
            { text: 'True', correct: false },
        ]
    }
]

/* List of Questions
Q.1 How do you create a function? A. function myFunction() 
Q.2 How do you call a functioned Named "myFunction"? A. myFunction()
Q.3 What is the correct JavaScript syntax to write "Hello World"? A. document.write("Hello World");
Q.4 How to write an IF statement in JavaScript? A. if(i==5)*/