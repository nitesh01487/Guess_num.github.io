'use strict';

// initialize the secret number
let secretNumber;
let score;
let highscore;

function initialData() {
  secretNumber = Math.ceil(20 * Math.random());

  // set the value of score
  score = 20;
  document.querySelector('.score-span').textContent = `${score}`;

  // set the value of highscore
  highscore = Number(localStorage.getItem('highscore'));
  document.querySelector('.highscore-span').textContent = `${highscore}`;
}

function resetQues(){
  document.querySelector('.ques').textContent = `?`;
}

initialData();

// function to update highscore

function highScore(score) {
  let highscore = Number(localStorage.getItem('highscore'));
  if (highscore <= score) {
    localStorage.setItem('highscore', JSON.stringify(score));
    document.querySelector('.highscore-span').textContent = `${score}`;
  }
}

// set the css style of the website
function StyleSet(color, width) {
  // change style of game
  // bg color
  document.querySelector('body').style.backgroundColor = color;
  // width
  document.querySelector('.ques').style.width = width;
}

// function for displaying guess

function displayPannel(msg, iterator) {
  document.querySelector('.aside-elem1').textContent = `${msg}`;
  score = score - iterator;
  document.querySelector('.score-span').textContent = `${score}`;
}

// for again functionality
function again() {
  initialData();
  StyleSet('#000000', '70px');
  document.querySelector('.aside-elem1').textContent = 'Start guessing...!';
  document.querySelector('input').value = '';
  resetQues();
}

// for check event

document.querySelector('.check-button').addEventListener('click', function () {
  let number = Number(document.querySelector('.input').value);

  //   for invalid numbers
  if (number <= 0 || number > 20) {
    document.querySelector('.aside-elem1').textContent =
      'Invalid number...! (Enter between 1 and 20)';
  }

  //   for right guess
  else if (number === secretNumber) {
    displayPannel('Correct Number...!', 0);
    highScore(score);
    document.querySelector('.ques').textContent = `${number}`;
    StyleSet('#60b347', '140px');
  }

  //   for high guess
  else if (number > secretNumber) {
    displayPannel('Too high...!', 1);
  }

  //   for low guess
  else if (number < secretNumber) {
    displayPannel('Too low...!', 1);
  }

  // for loose
  if (score <= 0) {
    document.querySelector('.aside-elem1').textContent = `You loose...!`;
    document.querySelector('.score-span').textContent = `${score}`;
    // setTimeout(again, 500);
    // use when we not use the modal window view in the javascript
  }
});

document.querySelector('.again').addEventListener('click', again);
