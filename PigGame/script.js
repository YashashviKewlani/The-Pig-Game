"use strict";
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore1 = document.querySelector("#current--0");
const currentScore2 = document.querySelector("#current--1");
const playerEl0 = document.querySelector(".player--0");
const playerEl1 = document.querySelector(".player--1");

let score, currentScore, activePlayer, playing;
//Initiating/starting condition
const init = function() {
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
    diceEl.classList.add("hidden");
    playerEl0.classList.remove("player--winner");
    playerEl1.classList.remove("player--winner");
    playerEl0.classList.add("player--active");
    playerEl1.classList.remove("player--active");
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    playerEl0.classList.toggle("player--active");
    playerEl1.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function() {
    if (playing) {
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2. Display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;
        //3. Check for rolled 1:
        if (dice != 1) {
            //add dice to current player
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            //if true, Switch to another player
            switchPlayer();
        }
    }
});
btnHold.addEventListener("click", function() {
    if (playing) {
        //add current score to active players score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            score[activePlayer];

        //check if player's score is >=100
        if (score[activePlayer] >= 100) {
            //Finish the game
            playing = false;
            diceEl.classList.toggle("hidden");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("splayer--active");
        } else {
            //Switch to next player
            switchPlayer();
        }
    }
});
btnNew.addEventListener("click", init);