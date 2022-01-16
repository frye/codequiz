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
var restartButtonVisible = false;

//Get elements
var scoresButton = document.querySelector('#scores');
var backButton = document.querySelector('#backButton');
var startButton = document.querySelector('#startButton');
var initialsButton = document.querySelector('#buttonInitials');
var resetScoresButton = document.querySelector('#resetScores');
var restartButton = document.querySelector('#restartButton');

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
// Timeout variable to be used with the Correct/wrong temporary display.
var answerTimeout;

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
    if (restartButtonVisible) {
        restartButton.hidden = false;
    }
    scoresDiv.innerHTML = '';
    scoresButton.disabled = true;
    preGameSection.hidden = true;
    gameSection.hidden = true;
    endGameSection.hidden = true;
    scoresSection.hidden = false;
    var scoresHeader = document.createElement('h4');
    var scoresUL = document.createElement('ol');
    scoresUL.setAttribute('style', 'display: flex; flex-direction: column; justify-content: center; align-items: center;');

    //Sort the high scores to display the player with highest score at the top of the list
    highScores.sort((a, b) => {
        return b.score - a.score;
    });
    for (var i = 0; i < highScores.length; i++) {
        var item = document.createElement('li');
        item.textContent = 'Player: ' + highScores[i].player + ', Score: ' + highScores[i].score;
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
    restartButtonVisible = false;
    restartButton.hidden = true;
}

var startButtonClick = function () {
    gameTime = GAMETIME;
    timeField.textContent = timeFieldPrefix + gameTime;
    scoresButton.disabled = true;
    preGameSection.hidden = true;
    gameSection.hidden = false;
    scoresSection.hidden = true;
    restartButtonVisible = true;
    answerResult.textContent = '';
    startGame();
}

var saveScoreClick = function () {
    var highScore = {
        player: document.querySelector('#initials').value || 'JD',
        score: score
    };
    highScores.push(highScore);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    // Use the scores button click handler to display high scores.
    scoresClick();
}

var resetScoresClicked = function () {
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

    //Clear the timeout if previous exists before setting another.
    //If answers come faster than the timeout we could hit this condition.
    clearTimeout(answerTimeout);
    answerTimeout = setTimeout(function () {
        answerResult.textContent = '';
    }, 2000);
    if (event.target.tagName === 'BUTTON') {
        //check if answer was correct
        if (event.target.textContent === questions[questionIndex].answer) {
            answerResult.textContent = "Correct!";
            score++;
        } else {
            answerResult.textContent = "Wrong!";
            if ((gameTime - penaltyTime) <= 0) {
                gameTime = 0;
                timeField.textContent = timeFieldPrefix + gameTime;
                endGame();
            } else {
                gameTime -= penaltyTime;
            }
        }
        console.log('Score: ' + score)
        if (questionIndex >= (questions.length - 1)) {
            clearInterval(timer);
            endGame();
        } else { // If we have questions left
            questionIndex++;
            askQuestion(questions[questionIndex]);
        }
    }
}

// shuffle function from w3docs used to shuffle the questions, and the order of choices.
var shuffle = function (array) {
    array.sort(() => Math.random() - 0.5);
}

// Function that is executed every second
var timerAction = function () {
    gameTime--;
    timeField.textContent = timeFieldPrefix + gameTime;
    if (gameTime <= 0) {
        clearInterval(timer);
        endGame();
    }
}

var askQuestion = function (question) {
    choiceOL.innerHTML = '';
    questionField.textContent = question.title;
    console.log(question.choices);
    shuffle(question.choices);
    for (var i = 0; i < question.choices.length; i++) {
        var choice = document.createElement('li');
        var button = document.createElement('button')
        button.textContent = question.choices[i];
        choice.append(button);
        choiceOL.append(choice);
    }
    multipleChoice.append(choiceOL);
    multipleChoice.addEventListener('click', handleChoiceClick);
}

var startGame = function () {
    score = 0;
    questionIndex = 0;
    timer = setInterval(timerAction, 1000);
    shuffle(questions);
    askQuestion(questions[0]);
}

var endGame = function () {
    // In case the gameTime ended negative lets reset it here. 
    // Otherwise display how much time was left when all questions were answered.
    if (gameTime < 0) {
        gameTime = 0;
        timeField.textContent = timeFieldPrefix + gameTime;
    } 
    // Give bonus points if all answers were correct (Based on the time left in the clock.)
    if (score === questions.length) {
        if (gameTime) {
            alert('You rock!\nYou got ' + score + '/' + questions.length + ' correct.\nRemaining gametime has been added to your score.');
            score += gameTime;
        }
    }
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
restartButton.addEventListener('click', startButtonClick);

init();
