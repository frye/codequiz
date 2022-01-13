/*
 * questions.js is loaded in the HTML before quiz.js
 * It creates a global variable called questions that contains starter questions.
 * Take a look at the structure and familiarize yourself with each part
 * then, add some of your own questions!
 * Use this data to populate your quiz questions, choices, and answers.
 */
console.log(questions);

var question = questions[0];
console.log(question.title);

//Get elements
var scoresButton = document.querySelector('#scores');
var backButton = document.querySelector('#backButton');

var preSection = document.querySelector('#preGameSection');
var gameSection = document.querySelector('#gameSection');
var scoresSection = document.querySelector('#scoresSection');

var init = function() {
    scoresSection.hidden = true;
    gameSection.hidden = true;
}

var scoresClick = function() {
    preSection.hidden = true;
    gameSection.hidden = true;
    scoresSection.hidden = false;
}

var backButtonClick = function() {
    preSection.hidden = false;
    scoresSection.hidden = true;
}


// Event handlers
scoresButton.addEventListener('click', scoresClick);
backButton.addEventListener('click', backButtonClick);

init();
