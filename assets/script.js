var startButton = document.querySelector(".startbtn")
var timerElement = document.querySelector(".timer")
var win = document.querySelector(".wins");
var lose = document.querySelector(".losses");
var reset = document.querySelector(".reset");
var hide = document.getElementById("hideall");



var timer;
var timerCount;
var winCount = 0
var loseCount = 0
var isWin=false;


function init() {
  getWins();
  getlosses();
}

function startGame() {
  isWin = false;
  timerCount = 5;
  startButton.disabled = true;
  startTimer();
}

// timerCount -=10 link this to correct or incorrect 


// if (hide.style.display === "none") {
//   hide.style.display = "block";
// } else {
//   hide.style.display = "none";
// }


function winGame() {
  winCount++
  startButton.disabled = false;
  setWins()
}

function endGame() {
  loseCount++
  startButton.disabled = false;
  setLosses()
}

function startTimer() {
  timer = setInterval(function() {
    timerElement.textContent = timerCount;
    timerCount--;
    if (timerCount >= 0) {
      if (isWin && timerCount > 0) {
        clearInterval(timer);
        winGame();
      }
    }
    if (timerCount === 0) {
      clearInterval(timer);
      endGame();
      timerElement.textContent = 'Game Over!'
    }
  }, 1000);
}



function setWins() {
  win.textContent = winCount;
  localStorage.setItem("winCount", winCount);
}

function setLosses() {
  lose.textContent = loseCount;
  localStorage.setItem("loseCount", loseCount);
}

startButton.addEventListener("click", startGame);

function getWins() {
  var storedWins = localStorage.getItem("winCount");
  if (storedWins === null) {
    winCount = 0;
  } else {
    winCount = storedWins;
  }
  win.textContent = winCount;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCount = 0;
  } else {
    loseCount = storedLosses;
  }
  lose.textContent = loseCount;
}


init();

function resetGame() {
  winCount = 0;
  loseCount = 0;
  setWins()
  setLosses()
}

reset.addEventListener("click", resetGame);



// to look up:
// html data attributes

/*
When user clicks start button,
    Quiz starts, Question appears with choices, timer starts, appearance of timer on page
Click an answer
    Right or Wrong
    Right: It displays next question and answers for the question
          and display CORRECT on bottom of screen, score needs to update
    Wrong: Wrong on bottom of screen, displays the next question and answers, time subtracts from clock
Either Finish quiz or Run out of time
    Finish Quiz: Display score and box to log initials then display on screen once submitted

    setInterval to display timer on top right
    setTimeout for when timer runs out
*/

