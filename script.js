/*'use strict';
const diceImg = document.querySelector(".dice");
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const holdScore = document.querySelector(".btn--hold");

const player1 = {
    section: document.querySelector(".player-1"),
    name: document.querySelector("#name-1"),
    total: document.querySelector("#score-1"),
    current: document.querySelector("#current-1"),
    active: true
}

const player2 = {
    section: document.querySelector(".player-2"),
    name: document.querySelector("#name-2"),
    total: document.querySelector("#score-2"),
    current: document.querySelector("#current-2"),
    active: false
}

const addPoints = (randomNum) => {
    if (player1.active) {
        player1.current.innerHTML = Number(player1.current.innerHTML) + randomNum
    } else {
        player2.current.innerHTML = Number(player2.current.innerHTML) + randomNum
    }
}

const rollZero = () => {
    if (player1.active) {
        player1.current.innerHTML = 0;
    } else {
        player2.current.innerHTML = 0;
    }
    switchActivePlayer();
}

const checkWinner = () => {
    if(Number(player1.total.innerHTML >= 20)){
        rollDice.classList.add("hidden");
        holdScore.classList.add("hidden");
        player1.name.innerHTML += " - Wins!"
        player1.section.classList.add("player--winner")
    } else if (Number(player2.total.innerHTML >= 20)){
        rollDice.classList.add("hidden");
        holdScore.classList.add("hidden");
        player2.name.innerHTML += " - Wins!"
        player2.section.classList.add("player--winner")
    }
}

const setTotalScore = () => {
    if (player1.active) {
        player1.total.innerHTML = Number(player1.total.innerHTML) + Number(player1.current.innerHTML)
        player1.current.innerHTML = 0;
        checkWinner();
    } else {
        player2.total.innerHTML = Number(player2.total.innerHTML) + Number(player2.current.innerHTML)
        player2.current.innerHTML = 0;
        checkWinner();
    }
}

const switchActivePlayer = () => {
    if(player1.active){
        player1.active = false;
        player2.active = true;
        player2.section.classList.add("player--active")
        player1.section.classList.remove("player--active")

    } else {
        player1.active = true;
        player2.active = false;
        player1.section.classList.add("player--active")
        player2.section.classList.remove("player--active")
    }
}

rollDice.addEventListener("click", function(){
    diceImg.classList.remove("hidden");
    let randomNum = randomNumOneToSix();
    switch (randomNum) {
        case 1:
        rollZero();
        diceImg.setAttribute("src", "./dice/dice-1.png")   
            break;
        case 2:
            addPoints(randomNum);
        diceImg.setAttribute("src", "./dice/dice-2.png")  
            break;
        case 3:
            addPoints(randomNum);
        diceImg.setAttribute("src", "./dice/dice-3.png")    
            break;
        case 4:
            addPoints(randomNum);
        diceImg.setAttribute("src", "./dice/dice-4.png")    
            break;
        case 5:
            addPoints(randomNum);
        diceImg.setAttribute("src", "./dice/dice-5.png")    
            break;
        case 6:
            addPoints(randomNum);
        diceImg.setAttribute("src", "./dice/dice-6.png")    
            break;
        default:
            break;
}
})

holdScore.addEventListener("click", function(){
    setTotalScore();
    switchActivePlayer();
})

newGame.addEventListener("click", function(){
    rollDice.classList.remove("hidden");
    holdScore.classList.remove("hidden");
    player2.name.innerHTML = "Player 2";
    player1.name.innerHTML = "Player 1";
    player1.total.innerHTML = 0;
    player2.total.innerHTML = 0;
    player1.current.innerHTML = 0;
    player2.current.innerHTML = 0;
    player1.active = true;
    player2.active = false;
    player1.section.classList.remove("player--winner");
    player2.section.classList.remove("player--winner");
    player1.section.classList.add("player--active");
    player2.section.classList.remove("player--active");
})
*/

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);


