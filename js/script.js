//I've tried to explain each JavaScript line with comments....Hope you'll understand

//selecting all required elements
const selectBox = document.querySelector(".select-box"),
selectBtnX = selectBox.querySelector(".options .playerX"),
selectBtnO = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

window.onload = ()=>{ //once window loaded
    for (let i = 0; i < allBox.length; i++) { //add onclick attribute in all available span
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

selectBtnX.onclick = ()=>{
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show the playboard section
}

selectBtnO.onclick = ()=>{ 
    selectBox.classList.add("hide"); //hide select box
    playBoard.classList.add("show"); //show the playboard section
    players.setAttribute("class", "players active player"); //set class attribute in players with players active player values
}

let playerXIcon = "fas fa-times"; //class name of fontawesome cross icon
let playerOIcon = "far fa-circle"; //class name of fontawesome circle icon
let playerSign = "X"; //this is a global variable beacuse we've used this variable inside multiple functions

let activePlayer = "X"; // Add this variable to keep track of the active player

function clickedBox(element) {
  if (element.childElementCount === 0) {
    element.innerHTML = `<i class="${activePlayer === "X" ? playerXIcon : playerOIcon}"></i>`;
    element.setAttribute("id", activePlayer);
    players.classList.toggle("active");
    selectWinner();
    element.style.pointerEvents = "none";

    // Toggle between players (X and O)
    activePlayer = activePlayer === "X" ? "O" : "X";
  }
}

function getIdVal(classname){
    return document.querySelector(".box" + classname).id; //return id value
}
function checkIdSign(val1, val2, val3, sign){ //checking all id value is equal to sign (X or O) or not if yes then return true
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}
function selectWinner() {
    // Check for winning combinations based on the active player
    if (
      checkIdSign(1, 2, 3, activePlayer) ||
      checkIdSign(4, 5, 6, activePlayer) ||
      checkIdSign(7, 8, 9, activePlayer) ||
      checkIdSign(1, 4, 7, activePlayer) ||
      checkIdSign(2, 5, 8, activePlayer) ||
      checkIdSign(3, 6, 9, activePlayer) ||
      checkIdSign(1, 5, 9, activePlayer) ||
      checkIdSign(3, 5, 7, activePlayer)
    ) {
      // The active player has won
      runBot = false;
      setTimeout(() => {
        resultBox.classList.add("show");
        playBoard.classList.remove("show");
      }, 700);
      wonText.innerHTML = `Player <p>${activePlayer}</p> won the game!`;
    } else if (
      // If all boxes are filled and no one wins, it's a draw
      getIdVal(1) !== "" &&
      getIdVal(2) !== "" &&
      getIdVal(3) !== "" &&
      getIdVal(4) !== "" &&
      getIdVal(5) !== "" &&
      getIdVal(6) !== "" &&
      getIdVal(7) !== "" &&
      getIdVal(8) !== "" &&
      getIdVal(9) !== ""
    ) {
      runBot = false;
      setTimeout(() => {
        resultBox.classList.add("show");
        playBoard.classList.remove("show");
      }, 700);
      wonText.textContent = "Match has been drawn!";
    }
  }  

replayBtn.onclick = ()=>{
    window.location.reload(); //reload the current page on replay button click
}