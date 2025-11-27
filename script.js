// ======== 1. INITIALISE GAME ========

// GLOBAL STATE
const gameState = {
  flippedCards: [],
  lockGame: false,
  matchPair: 0,
};

// Load Javascript after DOM tree built
document.addEventListener("DOMContentLoaded", () => {
  // A. Find game container in HTML
  const gameContainer = document.querySelector(".game-container");

  // B. Start the actual game
  startGame(gameContainer);

  // C. Option to Play Again / Close Game
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", hideAlert);

  const playAgainBtn = document.querySelector(".play-again-btn");
  playAgainBtn.addEventListener("click", function () {
    hideAlert();
    startGame(gameContainer);
  });
});

// ======== 2. GAME SETUP ========

function startGame(container) {
  // A. Reset game state
  gameState.flippedCards = [];
  gameState.lockGame = false;
  gameState.matchPair = 0;

  // B. Define 8 colors
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

  // C. Create pairs by duplicating
  const colorPairs = colors.concat(colors);

  // D. Shuffle position of colors
  const shuffledColors = shuffle(colorPairs);

  // E. Populate .game-container with cards
  createCards(container, shuffledColors);
}

// ======== FUNCTION: SHUFFLE ========

function shuffle(array) {
  const newArray = [...array];
  return newArray.sort((a, b) => Math.random() - 0.5);
}

// ======== FUNCTION: CREATECARDS() - build the game board ========

function createCards(container, shuffledColors) {
  // Reset game board - clear any existing cards
  container.innerHTML = "";

  shuffledColors.forEach((color) => {
    // A. Create card element
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-color", color);

    // B. Set face-down appearance of card
    card.style.backgroundColor = "#cccccc";
    card.textContent = "?";

    // C. Make card clickable - addEventListener
    card.addEventListener("click", () => {
      if (gameState.lockGame || card.classList.contains("flipped")) {
        return; // ignore if busy or already flipped
      }
      // show card's color
      flipCard(card);
      // add card into gameState flippedCards array
      gameState.flippedCards.push(card);

      // gameState.flippedCards = [card1, card2], compare colors
      if (gameState.flippedCards.length === 2) {
        checkForMatch();
      }
    });
    // D. Add to game board
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

// ======== FUNCTION: checkForMatch() ========
function checkForMatch() {
  gameState.lockGame = true; // stop clicks

  const [card1, card2] = gameState.flippedCards;
  const color1 = card1.getAttribute("data-color");
  const color2 = card2.getAttribute("data-color");

  // if match found
  if (color1 === color2) {
    // increase score by 1
    gameState.matchPair++;
    // permenant match
    card1.classList.add("matched");
    card2.classList.add("matched");

    if (gameState.matchPair === 8) {
      // schedule win alert
      // wait 0.5s
      setTimeout(showAlert, 500);
    }

    // clear flipped cards, unlock game
    resetTurn();
  } else {
    // no match - flip back 1s delay
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
  // make alert visible
  alert.classList.remove("hidden");
}

// hide win display
function hideAlert() {
  const alert = document.getElementById("alert-win");
  alert.classList.add("hidden");
}
