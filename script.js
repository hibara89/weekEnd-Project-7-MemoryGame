const cards = document.querySelectorAll(".game-board .card");
const images = document.querySelectorAll("img");
const wrongGuesses = document.querySelector("span");

let wrongGuessesCounter = 0;
let lockGame = false;
let isCardFlipped = false;
let firstCard, secondCard;

cards.forEach((card) => card.addEventListener("click", flipCard));

function flipCard() {
  if (lockGame) return;
  if (this === firstCard) return;

  this.classList.toggle("flip");

  if (!isCardFlipped) {
    //the first card-first click
    isCardFlipped = true;
    firstCard = this;

    return;
  }
  //second click
  isCardFlipped = false;
  secondCard = this;
  checkIfCardsMatch();
}

function checkIfCardsMatch() {
  //do cards match?
  if (firstCard.dataset.fruit === secondCard.dataset.fruit) {
    //it is a match
    disableCards();
  } else {
    //not a match
    unflipCards();
    wrongGuessesCounter++;
    wrongGuesses.innerText = wrongGuessesCounter;
  }
}

//disable cards if they match
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

//unflip if cards don't match

function unflipCards() {
  lockGame = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    lockGame = false;
    resetBoard();
  }, 1000);
}

function resetBoard() {
  isCardFlipped = false;
  lockGame = false;

  [firstCard, secondCard] = ["", ""];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
