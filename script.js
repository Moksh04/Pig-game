'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
let currentScore, activePlayer, scores, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
};

// calling the init function
init();

// Function Declarations
const updateScore = function (currentPl) {
  document.getElementById(`current--${currentPl}`).textContent = currentScore;
};

const switchPlayers = function () {
  currentScore = 0;
  updateScore(activePlayer);
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Dice Roll functionality
btnRoll.addEventListener('click', function (e) {
  if (playing) {
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // Show the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // If dice doesn't turn up 1
    if (dice !== 1) {
      currentScore += dice;
      updateScore(activePlayer);
    } else {
      switchPlayers();
    }
  }
});

// Holding the Score
btnHold.addEventListener('click', function () {
  if (playing) {
    // Update Active Player's global score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if the score >= 100, finish the game if so
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      // Remove the dice
      diceEl.classList.add('hidden');
    }
    // Switch Players
    else switchPlayers();
  }
});

// Resetting the game
btnNew.addEventListener('click', init);
