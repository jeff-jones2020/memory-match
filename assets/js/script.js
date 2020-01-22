const gameCardsEl = document.getElementById("game-cards");
gameCardsEl.addEventListener("click", handleClick);
let firstCardClicked;
let secondCardClicked;
let firstCardClasses;
let secondCardClasses;

function handleClick(event) {
  console.log(event);
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  if(!firstCardClicked){
    firstCardClicked = event.target;
    firstCardClicked.classList.add("hidden");
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  }else {
    secondCardClicked = event.target;
    secondCardClicked.classList.add("hidden");
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    if(firstCardClasses === secondCardClasses) {
      console.log("The images match");
    }else {
      setTimeout(function () {
                  firstCardClicked.classList.remove("hidden");
                  secondCardClicked.classList.remove("hidden");} ,2000);

    }
  }

}
