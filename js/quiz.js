/*
 * questions.js is loaded in the HTML before quiz.js
 * It creates a global variable called questions that contains starter questions.
 * Take a look at the structure and familiarize yourself with each part
 * then, add some of your own questions!
 * Use this data to populate your quiz questions, choices, and answers.
 */
console.log(questions);

//global variables and constants
const GAMETIME = 60;
var timer;
var gameTime = GAMETIME;
var penaltyTime = 5;
var questionIndex = 0;
var score = 0;
var choiceOL = document.createElement('ol'); // Ordered list for choices
var highScores = [];

//Get elements
var scoresButton = document.querySelector('#scores');
var backButton = document.querySelector('#backButton');
var startButton = document.querySelector('#startButton');
var initialsButton = document.querySelector('#buttonInitials');
var resetScoresButton = document.querySelector('#resetScores');

var preGameSection = document.querySelector('#preGameSection');
var gameSection = document.querySelector('#gameSection');
var scoresSection = document.querySelector('#scoresSection');
var endGameSection = document.querySelector('#endGame');
var scoresDiv = document.querySelector('#scoresDiv');

var timeField = document.querySelector('#time')
var timeFieldPrefix = 'Time remaining: '

var questionField = document.querySelector('#question');
var multipleChoice = document.querySelector('#choices');
var answerResult = document.querySelector('#answerResult');

// init functions purpose is to make sure the page looks good after
// load.
var init = function () {
    scoresSection.hidden = true;
    gameSection.hidden = true;
    timeField.textContent = timeFieldPrefix + gameTime;
    highScores = JSON.parse(localStorage.getItem('highScores')) || [];
}

// Button click handler functions
var scoresClick = function () {
    scoresDiv.innerHTML = '';
    scoresButton.disabled = true;
    preGameSection.hidden = true;
    gameSection.hidden = true;
    endGameSection.hidden = true;
    scoresSection.hidden = false;
    var scoresHeader = document.createElement('h4');
    var scoresUL = document.createElement('ul');
    for (var i = 0; i < highScores.length; i++) {
        var item = document.createElement('li');
        item.textContent = highScores[i];
        scoresUL.append(item);
    }
    scoresHeader.textContent = 'High scores:';
    scoresDiv.append(scoresHeader);
    scoresDiv.append(scoresUL);
}

var backButtonClick = function () {
    preGameSection.hidden = false;
    scoresSection.hidden = true;
    scoresButton.disabled = false;
}

var startButtonClick = function () {
    gameTime = GAMETIME;
    scoresButton.disabled = true;
    preGameSection.hidden = true;
    gameSection.hidden = false;
    startGame();
}

var saveScoreClick = function() {
    highScores.push(document.querySelector('#initials').value + ': ' + score);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    // Use the scores button click handler to display high scores.
    scoresClick();
}

var resetScoresClicked = function() {
    if (confirm('Are you sure you want to clear all scores?')) {
        highScores = [];
        localStorage.setItem('highScores', JSON.stringify(highScores));
        scoresClick();
    }
}

var handleChoiceClick = function (event) {
    // This event handler is set on the parent div to catch all potential
    // button clicks. Because of this we need to make sure that the click
    // happened on a button. And not on the div.
    if ( event.target.tagName === 'BUTTON') {
        //check if answer was correct
        if ( event.target.textContent === questions[questionIndex].answer) {
            answerResult.textContent = "Correct!";
            score++;
        } else {
            answerResult.textContent = "Wrong!";
            if ((gameTime - penaltyTime) <= 0 ) {
                gameTime = 0;
                timeField.textContent = timeFieldPrefix + gameTime;
                endGame();
            }
        }
        console.log(questionIndex + ' ' + questions.length)
        if ( questionIndex >= ( questions.length - 1) ) {
            clearInterval(timer);
            endGame();
        } else { // If we have questions left
            questionIndex++;
            askQuestion(questions[questionIndex]);
        }
    }
}

// Function that is executed every second
var timerAction = function () {
    gameTime--;
    timeField.textContent = timeFieldPrefix + gameTime;
    if (gameTime <= 0 ) {
        clearInterval(timer);
        endGame();
    }
}

var askQuestion = function(question) {
    choiceOL.innerHTML = '';
    questionField.textContent = question.title;
    console.log(question.choices);
    for (var i = 0; i < question.choices.length; i++ ) {
        var choice = document.createElement('li');
        var button = document.createElement('button')
        button.textContent = question.choices[i];
        choice.append(button);
        choiceOL.append(choice);
    }
    multipleChoice.append(choiceOL);
    multipleChoice.addEventListener('click',handleChoiceClick);
}

var startGame = function () {
    score = 0;
    questionIndex = 0;
    timer = setInterval(timerAction, 1000);
    askQuestion(questions[0]);
}

var endGame = function() {
    var scoreDisplay = document.querySelector('#scoreDisplay');
    gameSection.hidden = true;
    endGameSection.hidden = false;
    scoreDisplay.textContent = 'Your score: ' + score;
    scoresButton.disabled = false;
    //preGameSection.hidden = false;
}

// Event handlers
scoresButton.addEventListener('click', scoresClick);
backButton.addEventListener('click', backButtonClick);
startButton.addEventListener('click', startButtonClick);
initialsButton.addEventListener('click', saveScoreClick);
resetScoresButton.addEventListener('click', resetScoresClicked);

init();
