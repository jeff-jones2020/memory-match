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
  "cute-blue-dino",
  "cute-green-dino",
  "cute-para",
  "good-dino",
  "marine-dino",
  "mario-dino",
  "raptor",
  "t-rex"
]
allCardsList = allCardsList.concat(allCardsList); //adding the second of each card to the cards list
console.log(allCardsList);
shuffleCards(); //randomly generated first round

//Game Stats
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
    firstCardClicked.classList.add("hidden");
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  }else {
    secondCardClicked = event.target;
    gameCardsEl.removeEventListener("click", handleClick);
    secondCardClicked.classList.add("hidden");
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
                  firstCardClicked.classList.remove("hidden");
                  secondCardClicked.classList.remove("hidden");
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
    gameCount++;
    return true;
  }
  return false;
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

function resetGame(event) {
  for(var i=0; i<gameCardsArray.length; i++){
    gameCardsArray[i].lastElementChild.classList.remove("hidden");
  }
  updateStatistics(true);
  shuffleCards();
  winModalEl.classList.add("hidden");
}

function shuffleCards() {
  let cloneCardsArray = Array.from(allCardsList); //a temp array from which to remove items and distribute them randomly
  let randomIndex;
  let classNameToChange;
  for (var i = 0; i < gameCardsArray.length; i++) {
    randomIndex = Math.floor(Math.random() * cloneCardsArray.length);
    classNameToChange = gameCardsArray[i].firstElementChild.className;
    classNameToChange = classNameToChange.split(" ")[0] +" "+ cloneCardsArray.splice(randomIndex, 1)[0];
    //sets className equal to the first substring of its current value "card-front", and adds the new class from cloneCardsArray
    gameCardsArray[i].firstElementChild.className = classNameToChange;
  }
}
