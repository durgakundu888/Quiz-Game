const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
})
function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
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

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove('hide')
    }
    
}

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

const questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false },
            { text: '11', correct: false },
            { text: '2', correct: false }
        ]
    },
    {
        question: 'Who is the best YouTuber?',
        answers: [
            { text: 'Lilly Singh', correct: true },
            { text: 'Fit Tuber', correct: false },
            { text: 'Tia Bhatia', correct: false },
            { text: 'Deepica Mutyala', correct: false }
        ]
    },
    {
        question: 'Who is the best artist?',
        answers: [
            { text: 'Beyoncé', correct: false },
            { text: 'Taylor Swift', correct: false },
            { text: 'Nicki Minaj', correct: true },
            { text: 'Rihanna', correct: false }
        ]
    },
    {
        question: 'What is the best food?',
        answers: [
            { text: 'Samosa', correct: false },
            { text: 'Ladoo', correct: false },
            { text: 'Butter chicken', correct: true },
            { text: 'Gulab Jamun', correct: false }
        ]
    },
    {
        question: 'Who is the best actress?',
        answers: [
            { text: 'Priyanka Chopra', correct: false },
            { text: 'Deepika Padukone', correct: false },
            { text: 'Maitreyi Ramakrishnan', correct: true },
            { text: 'Mindy Kaling', correct: false }
        ]
    }
]