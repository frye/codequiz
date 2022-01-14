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
var gameTime = 20;
var questionIndex = 0;
var choiceOL = document.createElement('ol'); // Ordered list for choices

//Get elements
var scoresButton = document.querySelector('#scores');
var backButton = document.querySelector('#backButton');
var startButton = document.querySelector('#startButton');

var preGameSection = document.querySelector('#preGameSection');
var gameSection = document.querySelector('#gameSection');
var scoresSection = document.querySelector('#scoresSection');

var timeField = document.querySelector('#time')
var timeFieldPrefix = 'Time remaining: '

var questionField = document.querySelector('#question');
var multipleChoice = document.querySelector('#choices');

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

var handleChoiceClick = function (event) {
    // This event handler is set on the parent div to catch all potential
    // button clicks. Because of this we need to make sure that the click
    // happened on a button. And not on the div.
    if ( event.target.tagName === 'BUTTON') {
        questionIndex++;
        askQuestion(questions[questionIndex]);
    }
}

// Function that is executed every second
var timerAction = function () {
    gameTime--;
    timeField.textContent = timeFieldPrefix + gameTime;
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
    timer = setInterval(timerAction, 1000);
    askQuestion(questions[questionIndex]);
}

var loseGame = function() {
    //alert('You lost!');
}

// Event handlers
scoresButton.addEventListener('click', scoresClick);
backButton.addEventListener('click', backButtonClick);
startButton.addEventListener('click', startButtonClick)

init();
