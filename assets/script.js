var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {

  var startScreenEl = document.getElementById("start-container");
  startScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timerId = setInterval(clockDecrease, 1000);
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {

  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach(function (choice, i) {

    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick;
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {

  if (this.value !== questions[currentQuestionIndex].answer) {

    time -= 15;

    if (time < 0) {
      time = 0;
    }


    timerEl.textContent = time;


    feedbackEl.textContent = "Wrong!";
  } else {


    feedbackEl.textContent = "Correct!";
  }


  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  currentQuestionIndex++;


  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {

  clearInterval(timerId);


  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");


  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;


  questionsEl.setAttribute("class", "hide");
}

function clockDecrease() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {

  var initials = initialsEl.value.trim();


  if (initials !== "") {

    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];


    var newScore = {
      score: time,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscorespage.html";
  }
}



submitBtn.onclick = saveHighscore;


startBtn.onclick = startQuiz;
