'use strict';

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1'); // getElementById is typically faster than querySelector

const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const dice1El = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

var currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];

score0Element.textContent = 0;
score1Element.textContent = 0;

let playing = true;

dice1El.classList.add('hidden');

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0; // if player 0, make it 1, else make it 0
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};

// Event Handler for when the Roll Dice button is clicked
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    dice1El.classList.remove('hidden');
    dice1El.src = `dice-${diceRoll}.png`;

    if (diceRoll != 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Event Handler for when the Hold button is clicked
btnHold.addEventListener('click', function () {
  if (playing) {
    // Save the current score to the global score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if score >= 100, if so end game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    }

    // Switch the active player
    switchPlayer();
  }
});

// Event Handler for when the New Game button is clicked
btnNew.addEventListener('click', function () {
  scores[0] = 0;
  scores[1] = 0;

  currentScore = 0;

  playing = true;
  activePlayer = 0;

  document.querySelector(`.player--0`).classList.remove(`player--winner`);
  document.querySelector(`.player--1`).classList.remove(`player--winner`);

  document.querySelector(`.player--0`).classList.add(`player--active`);
  document.querySelector(`.player--1`).classList.remove(`player--active`);

  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
});
