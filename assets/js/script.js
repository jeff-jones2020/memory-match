const gameCardsEl = document.getElementById("game-cards");
gameCardsEl.addEventListener("click", handleClick);
const gameCardsArray = document.querySelectorAll(".card-sleeve");
const winModalEl = document.getElementById("win-modal");
let firstCardClicked;
let secondCardClicked;
let firstCardClasses;
let secondCardClasses;
let maxMatches = gameCardsArray.length / 2;
let matchCount = 0;

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
      checkWinCondition();
      resetCardsClicked();
      gameCardsEl.addEventListener("click", handleClick);
    }else {
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
  }

}
