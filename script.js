// ======== GLOBAL VARIABLES ========
const gameState = {
  flippedCards: [],
  lockGame: false,
  matchPair: 0,
};

// ======== INITIALISE GAME ========

document.addEventListener("DOMContentLoaded", () => {
  // start the game
  const gameContainer = document.querySelector(".game-container");
  startGame(gameContainer);

  // hide win game alert
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", hideAlert);

  // hide play again button
  const playAgainBtn = document.querySelector(".play-again-btn");
  playAgainBtn.addEventListener("click", function () {
    hideAlert();
    gameState.matchPair = 0;
    startGame(gameContainer);
  });
});

function startGame(container) {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "purple",
    "pink",
  ];
  // ======== 1. create 8 pairs of colors ========
  const colorPairs = colors.concat(colors);
  // ======== 2. shuffle colors ========
  const shuffledColors = shuffle(colorPairs);
  createCards(container, shuffledColors);
}

// ======== FUNCTION: SHUFFLE COLORS ========

function shuffle(array) {
  const newArray = [...array];
  return newArray.sort((a, b) => Math.random() - 0.5);
}

// ======== FUNCTION: CREATE CARDS WITH EVENT LISTENER ========

function createCards(container, shuffledColors) {
  // clear existing content
  container.innerHTML = "";

  shuffledColors.forEach((color) => {
    // create card element
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-color", color);

    // set default card background and content
    card.style.backgroundColor = "#cccccc";
    card.textContent = "?";

    // ======== EVENT LISTENER ========
    card.addEventListener("click", () => {
      if (gameState.lockGame || card.classList.contains("flipped")) {
        return;
      }
      flipCard(card);
      gameState.flippedCards.push(card);

      if (gameState.flippedCards.length === 2) {
        checkForMatch();
      }
    });
    container.appendChild(card);
  });
}

// ======== FUNCTION: FLIP CARD ========
function flipCard(card) {
  // get color of card
  const color = card.getAttribute("data-color");
  // apply color to card background
  card.style.backgroundColor = color;
  card.textContent = "";
  card.classList.add("flipped");
}

// ======== FUNCTION: UNFLIP CARDS ========
function unflipCards(card1, card2) {
  card1.style.backgroundColor = "#cccccc";
  card1.textContent = "?";
  card1.classList.remove("flipped");

  card2.style.backgroundColor = "#cccccc";
  card2.textContent = "?";
  card2.classList.remove("flipped");
}

// ======== FUNCTION: CHECK FOR MATCH ========
function checkForMatch() {
  gameState.lockGame = true;

  const [card1, card2] = gameState.flippedCards;
  const color1 = card1.getAttribute("data-color");
  const color2 = card2.getAttribute("data-color");

  if (color1 === color2) {
    gameState.matchPair++;
    card1.classList.add("matched");
    card2.classList.add("matched");

    if (gameState.matchPair === 8) {
      // schedule (delay) execution of alert function
      console.log("win");
      setTimeout(showAlert, 500);
    }

    resetTurn();
  } else {
    // schedule (delay) execution of unflip function and reset turn
    setTimeout(() => {
      unflipCards(card1, card2);
      resetTurn();
    }, 1000);
  }
}

// ======== FUNCTION: RESET TURN ========
function resetTurn() {
  gameState.flippedCards = [];
  gameState.lockGame = false;
}

// ======== FUNCTION: ALERT ========
// show win display
function showAlert() {
  const alert = document.getElementById("alert-win");
  alert.classList.remove("hidden");
}

// hide win display
function hideAlert() {
  const alert = document.getElementById("alert-win");
  alert.classList.add("hidden");
}

