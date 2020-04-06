const gameCardsEl = document.getElementById("game-cards");
gameCardsEl.addEventListener("click", handleClick);
const gameCardsArray = document.querySelectorAll(".card-sleeve");
const winModalEl = document.getElementById("win-modal");
let firstCardClicked;
let secondCardClicked;
let firstCardClasses;
let secondCardClasses;
let maxMatches = gameCardsArray.length / 2;
let allCardsList = [
  "bronto",
  "ankyl",
  "dactyl",
  "para",
  "raptor",
  "stego",
  "t-rex",
  "toy",
  "trike"
]
allCardsList = allCardsList.concat(allCardsList);
console.log(allCardsList);
shuffleCards();

let gameCount = 0;
const gameCountEl = document.getElementById("games-played-ct");
let matchCount = 0;
let attemptCount = 0;
const attemptCountEl = document.getElementById("attempts-ct");
let accuracy = 0;
const accuracyPercentEl = document.getElementById("accuracy-percent");

const resetGameBtnEl = document.getElementById("reset-game-btn");
resetGameBtnEl.addEventListener("click", resetGame);

function handleClick(event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  if(!firstCardClicked){
    firstCardClicked = event.target;
    flipCard(firstCardClicked);
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  }else {
    secondCardClicked = event.target;
    gameCardsEl.removeEventListener("click", handleClick);
    flipCard(secondCardClicked);
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    if(firstCardClasses === secondCardClasses) {
      console.log("The images match");
      matchCount++;
      resetCardsClicked();
      gameCardsEl.addEventListener("click", handleClick);
      checkWinCondition();
      updateStatistics();
    }else {
      updateStatistics();
      setTimeout(function () {
                  flipCard(firstCardClicked, secondCardClicked);
                  resetCardsClicked();
                  gameCardsEl.addEventListener("click", handleClick);} ,1000);
    }
  }
}

function resetCardsClicked() {
  firstCardClicked = null;
  secondCardClicked = null;
}

function checkWinCondition() {
  if(matchCount === maxMatches) {
    winModalEl.classList.remove("hidden");
    gameCardsArray.forEach(element => element.classList.add('spinning-animation'));
    gameCount++;
    return true;
  }
  return false;
}

function flipCard(cardOne, cardTwo) {
  cardOne.classList.add("flip-animation");

  setTimeout(function () {
    cardOne.classList.remove("flip-animation");
    cardOne.classList.toggle("hidden");
    cardOne.previousElementSibling.classList.toggle("hidden");
    if(cardTwo){
      cardTwo.classList.toggle("hidden");
      cardTwo.previousElementSibling.classList.toggle("hidden");
    }
    }, 200);
}

function updateStatistics(newGame) {
  if(newGame){
    attemptCount = 0;
    accuracy = 0;
    matchCount = 0;
  }else{
    attemptCount++;
    accuracy = Math.floor(matchCount/attemptCount * 100);
  }
  gameCountEl.innerText = gameCount;
  attemptCountEl.innerText = attemptCount;
  accuracyPercentEl.innerText = accuracy + "%";
}

function resetGame() {
  gameCardsArray.forEach(element => {
                          element.classList.remove('spinning-animation');
                          element.lastElementChild.classList.remove('hidden');
                        });
  updateStatistics(true);
  shuffleCards();
  winModalEl.classList.add("hidden");
}

function shuffleCards() {
  let cloneCardsArray = Array.from(allCardsList);
  let randomIndex;
  let classNameToChange;
  for (var i = 0; i < gameCardsArray.length; i++) {
    randomIndex = Math.floor(Math.random() * cloneCardsArray.length);
    classNameToChange = gameCardsArray[i].firstElementChild.className;
    classNameToChange = classNameToChange.split(" ")[0] +" "+ cloneCardsArray.splice(randomIndex, 1)[0] + " hidden";
    gameCardsArray[i].firstElementChild.className = classNameToChange;
  }
}
