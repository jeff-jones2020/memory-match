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
    //firstCardClicked.classList.add("hidden");
    flipCard(firstCardClicked);
    firstCardClasses = firstCardClicked.previousElementSibling.className; //classes of front of card
  }else {
    secondCardClicked = event.target;
    gameCardsEl.removeEventListener("click", handleClick);
    //secondCardClicked.classList.add("hidden");
    flipCard(secondCardClicked);
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    if(firstCardClasses === secondCardClasses) { //successful match
      console.log("The images match");
      matchCount++;
      resetCardsClicked();
      gameCardsEl.addEventListener("click", handleClick);
      checkWinCondition();
      updateStatistics();
    }else { //failed match
      updateStatistics();
      setTimeout(function () {
                  flipCard(firstCardClicked, secondCardClicked);
                  /* firstCardClicked.classList.remove("hidden");
                  secondCardClicked.classList.remove("hidden"); */
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
    cardOne.classList.remove("flip-animation"); // reset transform

    /* cardOne.style.transform = "rotateY(90)"; */
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

function resetGame(event) {
  gameCardsArray.forEach(element => {
                          element.classList.remove('spinning-animation');
                          element.lastElementChild.classList.remove('hidden');
                        });
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
    classNameToChange = classNameToChange.split(" ")[0] +" "+ cloneCardsArray.splice(randomIndex, 1)[0] + " hidden";
    //sets className equal to the first substring of its current value "card-front", and adds the new class from cloneCardsArray
    gameCardsArray[i].firstElementChild.className = classNameToChange;
  }
}
