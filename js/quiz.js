/*
 * questions.js is loaded in the HTML before quiz.js
 * It creates a global variable called questions that contains starter questions.
 * Take a look at the structure and familiarize yourself with each part
 * then, add some of your own questions!
 * Use this data to populate your quiz questions, choices, and answers.
 */
console.log(questions);

//global variables
var timer;
var gameTime = 60;

//Get elements
var scoresButton = document.querySelector('#scores');
var backButton = document.querySelector('#backButton');
var startButton = document.querySelector('#startButton');

var preGameSection = document.querySelector('#preGameSection');
var gameSection = document.querySelector('#gameSection');
var scoresSection = document.querySelector('#scoresSection');

var timeField = document.querySelector('#time')
var timeFieldPrefix = 'Time remaining: '

// init functions purpose is to make sure the page looks good after
// load.
var init = function () {
    scoresSection.hidden = true;
    gameSection.hidden = true;
    timeField.textContent = timeFieldPrefix + gameTime;
}

// Button click handler functions
var scoresClick = function () {
    preGameSection.hidden = true;
    gameSection.hidden = true;
    scoresSection.hidden = false;
}

var backButtonClick = function () {
    preGameSection.hidden = false;
    scoresSection.hidden = true;
}

var startButtonClick = function () {
    preGameSection.hidden = true;
    gameSection.hidden = false;
    startGame();
}

// Function that is executed every second
var timerAction = function () {
    gameTime--;
    timeField.textContent = timeFieldPrefix + gameTime;
}

var startGame = function () {
    timer = setInterval(timerAction, 1000);
}

// Event handlers
scoresButton.addEventListener('click', scoresClick);
backButton.addEventListener('click', backButtonClick);
startButton.addEventListener('click', startButtonClick)

init();
