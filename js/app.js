"use strict";

var keys = document.querySelectorAll("input");
var paragraphDOM = document.querySelector(".paragraph");
var wrapper = document.querySelector(".wrapper");
var score = document.querySelector("#score");
var progressBar = document.querySelector("#progressBar");
var timer = document.querySelector(".timer");
var messageHere = document.querySelector(".messageHere");
var timerStarted = false;
var timerFunction = void 0;

var allStatement = ["Pack my box with five dozen liquor jugs.", "Amazingly few discotheques provide jukeboxes.", "JFK got my VHS, PC, and XLR web quiz.", "No kidding Lorenzo called off his trip to Mexico City just because they told him the conquistadors were extinct.", "Quick fox jumps nightly above wizard.", "Jim quickly realized that the beautiful towns are expensive.", "Two driven jocks help fax my big quiz.", "My girl wove six dozen plaid jackets before she quit.", "Grumpy wizards make a toxic brew for the jovial queen.", "The five boxing wizards jump quickly.", "Woven silk pyjamas exchanged for blue quartz.", "A quivering Texas zombie fought republic linked jewelry.", "Fickle jinx bog dwarves spy math quiz.", "The quick brown fox jumps over the lazy dog.", "We promptly judged antique ivory buckles for the next prize.", "Back in June we delivered oxygen equipment of the same size.", "The wizard quickly jinxed the gnomes before they vapourized.", "Public junk dwarves hug my quartz fox.", "When zombies arrive, quickly fax judge Pat.", "The quick onyx goblins jumps over the lazy dwarf.", "All questions asked by watched experts amaze the judge.", "Pack my box with five dozen liquor jugs.", "Five quacking zephyrs jolts my wax bed.", "Foxy diva Jennifer Lopez was not baking my quiche."];
var preparedStatement = [];
getStatements();
function getStatements() {
  var statamentLimit = 5;
  while (preparedStatement.length < statamentLimit) {
    var randomStatement = allStatement[randNum(allStatement.length)];
    if (preparedStatement.indexOf(randomStatement)) {
      preparedStatement.push(randomStatement);
    }
  }
}

var completedStatement = [];
var userStringInput = "";
keys.forEach(function (key) {
  key.id = key.value.toUpperCase();
});

function randNum() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : preparedStatement.length;

  return Math.floor(Math.random() * max);
}

function renderText() {
  var paragraph = randNum();
  while (completedStatement.indexOf(paragraph) != -1) {
    paragraph = randNum();
  }
  completedStatement.push(paragraph);
  var statement = preparedStatement[paragraph];
  paragraphDOM.textContent = "";
  statement.split("").forEach(function (char) {
    var charSpan = document.createElement("span");
    charSpan.innerHTML = char;
    paragraphDOM.appendChild(charSpan);
  });
  updateResult();
}
// renderText(userLevel);
renderText(3);

function checkUserString() {
  var paragraphStatement = paragraphDOM.textContent.toUpperCase().split("");
  var userInputValue = userStringInput.split("");
  var paragraphSpan = paragraphDOM.querySelectorAll("span");
  userInputValue.forEach(function (charSpan, index) {
    if (charSpan === paragraphStatement[index]) {
      paragraphSpan[index].classList.add("correct");
      paragraphSpan[index].classList.remove("incorrect");
    } else {
      paragraphSpan[index].classList.remove("correct");
      paragraphSpan[index].classList.add("incorrect");
    }
  });
}

function knowUserPosition() {
  var paragraphSpan = paragraphDOM.querySelectorAll("span");
  paragraphSpan.forEach(function (span) {
    span.className = "";
  });
  var userPosition = userStringInput.length;
  try {
    paragraphSpan[userPosition].classList.add("userPositionIndicate");
  } catch (e) {
    console.log(e);
    if (userStringInput == paragraphDOM.textContent.toUpperCase()) {
      if (completedStatement.length < preparedStatement.length) {
        userStringInput = "";
        renderText();
      } else {
        updateResult(0);
        clearInterval(timerFunction);
        messageHere.classList.remove("hide");
        messageHere.innerHTML = "<h3>\n        Congratulation\n      </h3>\n      Completed in " + timer.textContent;
      }
    } else {
      showError();
    }
  }
}
function updateResult() {
  var arrController = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  total = preparedStatement.length;
  completed = completedStatement.length - arrController;
  percentageCompleted = completed * 100 / total - 100;
  score.textContent = completed + "/" + total;
  progressBar.style.transform = "translateX(" + percentageCompleted + "%)";
}

function showError() {
  wrapper.classList.add("showError");
  setTimeout(function () {
    wrapper.classList.remove("showError");
  }, 500);

  // document.body.style.animation = " shake 0.5s 1";
}
document.body.addEventListener("keydown", function (event) {
  var keyPressValue = event.which || event.keyCode;
  var keyPress = String.fromCharCode(keyPressValue);
  if (keyPressValue == 8) {
    userStringInput = userStringInput.slice(0, -1);
  }
  if (userStringInput.length < paragraphDOM.textContent.length) {
    if (keyPressValue == 27) {
      //Developer Tool Check userString with Esc
      console.log(userStringInput);
    }
    if (keyPressValue > 64 && keyPressValue < 91) {
      document.getElementById(CSS.escape(keyPress)).focus();
      userStringInput += keyPress;
    }

    if (keyPressValue == 190) {
      userStringInput += ".";
    }
    if (keyPressValue == 188) {
      userStringInput += ",";
    }
    if (keyPressValue == 32) {
      document.getElementById("SPACE").focus();
      userStringInput += " ";
    }
    knowUserPosition();
    checkUserString();
    if (!timerStarted) {
      renderTimer();
      timerStarted = true;
    }
  }
});

function renderTimer() {
  var startTimer = new Date();
  timerFunction = setInterval(function () {
    timer.textContent = getTimerTime();
  }, 1000);

  function getTimerTime() {
    var time = Math.floor((new Date() - startTimer) / 1000);

    if (time > 59) {
      timeSecond = time % 60;
      timeSecond = makeTwoDigit(timeSecond);
      timeMinute = (time - timeSecond) / 60;
      timeMinute = makeTwoDigit(timeMinute);

      time = timeMinute + ":" + timeSecond;
    } else {
      time = makeTwoDigit(time);
      time = "00:" + time;
    }
    return time;
  }
  function makeTwoDigit(num) {
    if (num < 10) {
      num = "0" + num;
    }
    return num;
  }
}